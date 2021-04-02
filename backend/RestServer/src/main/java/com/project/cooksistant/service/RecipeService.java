package com.project.cooksistant.service;

import com.project.cooksistant.Exception.RestException;
import com.project.cooksistant.model.dto.*;
import com.project.cooksistant.model.entity.*;
import com.project.cooksistant.repository.*;
import com.project.cooksistant.s3.S3Uploader;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @PersistenceContext
    EntityManager entityManager;
    private final UserRepository userRepository;
    private final WebClient webClient;
    private final StepRepository stepRepository;
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final ModelMapper modelMapper;
    private final EvaluationRepository evaluationRepository;
    private final EvaluationKeywordRepository evaluationKeywordRepository;
    private final KeywordRepository keywordRepository;
    private final S3Uploader s3Uploader;

    public RecipeService(UserRepository userRepository, WebClient.Builder webClientBuilder, StepRepository stepRepository, RecipeRepository recipeRepository, IngredientRepository ingredientRepository, RecipeIngredientRepository recipeIngredientRepository, ModelMapper modelMapper, EvaluationRepository evaluationRepository, EvaluationKeywordRepository evaluationKeywordRepository, KeywordRepository keywordRepository, S3Uploader s3Uploader) {
        this.userRepository = userRepository;
        this.webClient = webClientBuilder.baseUrl("http://j4c101.p.ssafy.io:8083").build(); // 추후에 flask에 알맞게 변경 // 8083포트로 설정
        this.stepRepository = stepRepository;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.modelMapper = modelMapper;
        this.evaluationRepository = evaluationRepository;
        this.evaluationKeywordRepository = evaluationKeywordRepository;
        this.keywordRepository = keywordRepository;
        this.s3Uploader = s3Uploader;
    }


    public EvaluationDTO findEvaluation(Long evalId) {
        Optional<Evaluation> evaluation = Optional.ofNullable(evaluationRepository.findById(evalId).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "평가 데이터가 존재 하지 않습니다.")));
        List<EvaluationKeyword> evaluationKeywordList = evaluationKeywordRepository.findAllByEvaluation(evaluation);
        EvaluationDTO evaluationDTO = new EvaluationDTO();
//        evaluationDTO.setComplete(true);
        evaluationDTO.setSampled(evaluation.get().getIsSampled());
        evaluationDTO.setRecipeId(evaluation.get().getRecipe().getRecipeId());
        evaluationDTO.setUserId(evaluation.get().getUser().getUserId());
        for (int i = 0; i < evaluationKeywordList.size(); i++) {
            evaluationDTO.getKeywords().add(evaluationKeywordList.get(i).getKeyword().getKeyword());
        }

        return evaluationDTO;
    }

    public boolean evaluateRecipe(EvaluationDTOpost evaluationDTOpost) {
        Optional<Recipe> recipe = Optional.ofNullable(recipeRepository.findById(evaluationDTOpost.getRecipeId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 레시피는 존재하지 않습니다.")));
        Optional<User> user = Optional.ofNullable(userRepository.findById(evaluationDTOpost.getUserId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저는 존재하지 않는 유저입니다.")));
        Evaluation evaluation = new Evaluation();
        evaluation.setUser(user.get());
//        evaluation.setIsSampled(true);
        evaluation.setRecipe(recipe.get());
        evaluation.setIsComplete(evaluationDTOpost.getIsComplete());//isComplete를 true로 둔다.
        if (evaluationDTOpost.getIsComplete()) {
            evaluation.setFavor(evaluationDTOpost.getFavor());
            evaluationRepository.save(evaluation);


            for (int i = 0; i < evaluationDTOpost.getKeywordList().size(); i++) {
                EvaluationKeyword evaluationKeyword = new EvaluationKeyword();
                Keyword keyword = keywordRepository.findByKeyword(evaluationDTOpost.getKeywordList().get(i));//keyword 테이블에서 해당 키워드 정도 찾기
                evaluationKeyword.setEvaluation(evaluation); //평가 id는 위에서 저장한 평가데이터의 id로 설정
                evaluationKeyword.setKeyword(keyword);//각각 키워드는 위에서구한 keyword 객체로 설정
                evaluationKeywordRepository.save(evaluationKeyword);
            }
        } else {
            evaluation.setIsComplete(evaluationDTOpost.getIsComplete());//isComplete를 false로 둔다.
            evaluationRepository.save(evaluation);
        }
        return true;

    }

    //isComplete이 0이든 1이든 전부 리턴
    public List<AllEvaluationDTO> findAllEvaluation(String uid) {
        Optional<User> user = Optional.ofNullable(userRepository.findByUid(uid).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저 존재하지않습니다.")));
        List<Evaluation> evaluationList = evaluationRepository.findAllByUserOrderByIsComplete(user.get()); // 유저가 사용한 모든 레시피 평가했든 안했든

        List<AllEvaluationDTO> allEvaluationDTOList = new ArrayList<>();
        for (int i = 0; i < evaluationList.size(); i++) {
            AllEvaluationDTO allEvaluationDTO = new AllEvaluationDTO();
            allEvaluationDTO.setCuisine(evaluationList.get(i).getRecipe().getCuisine());
            allEvaluationDTO.setFavor(evaluationList.get(i).getFavor());
            allEvaluationDTO.setIsComplete(evaluationList.get(i).getIsComplete());
            allEvaluationDTO.setIsSampled(evaluationList.get(i).getIsSampled());
            allEvaluationDTO.setRecipe_id(evaluationList.get(i).getRecipe().getRecipeId());
            allEvaluationDTO.setImage(evaluationList.get(i).getRecipe().getImage());
            allEvaluationDTO.setEvaluationId(evaluationList.get(i).getEvalId());
            allEvaluationDTOList.add(allEvaluationDTO);
        }
        return allEvaluationDTOList;
    }


    public RecipeDTO getRecommendation(Long recipeId) {
//        AmazonS3Client s3Client = (AmazonS3Client) AmazonS3ClientBuilder.defaultClient();
        //recipe_id가 유효한지 확인
        Optional<Recipe> recipe = Optional.ofNullable(recipeRepository.findById(recipeId).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 레시피는 존재하지 않습니다.")));
        RecipeDTO recipeDTO = new RecipeDTO();
        recipeDTO.setRecipeId(recipe.get().getRecipeId());
        recipeDTO.setNickname(recipe.get().getUser().getNickname());
        recipeDTO.setCuisine(recipe.get().getCuisine());
        recipeDTO.setDescription(recipe.get().getDescription());
        recipeDTO.setCookingTime(recipe.get().getCookingTime());
        recipeDTO.setImage(recipe.get().getImage());
        recipeDTO.setLevel(recipe.get().getLevel());
        recipeDTO.setServing(recipe.get().getServing());

        //해당 레시피의 id로 ingredientId를 알아낸다.
        List<IngredientDTO> ingredientDTOList = new ArrayList<>();
        List<RecipeIngredient> recipeIngredient = recipeIngredientRepository.findAllByRecipe(recipe); //recipe_has_ingredient table
        for (int j = 0; j < recipeIngredient.size(); j++) {
            Ingredient ingredient = ingredientRepository.findByIngredientId(recipeIngredient.get(j).getIngredient().getIngredientId());// recipe_has_ingredient테이블에서 해당 ingredient_id에 맞는 재료들을 불러온다.
            IngredientDTO ingredientDTO = new IngredientDTO();
            ingredientDTO.setIngredientId(ingredient.getIngredientId());
            ingredientDTO.setIngredientName(ingredient.getIngredientName());
            ingredientDTO.setAmount(recipeIngredient.get(j).getAmount());
            ingredientDTO.setIsType(recipeIngredient.get(j).getType());
            ingredientDTOList.add(ingredientDTO);
        }
        recipeDTO.setIngredientDTOList(ingredientDTOList); // 재료 정보를 넣는다.

        //과정을 넣는다.
        List<Step> stepList = stepRepository.findAllByRecipe(recipe);
        List<StepDTO> stepDTOList = new ArrayList<>();

        for (int j = 0; j < stepList.size(); j++) {
            StepDTO stepDTO = new StepDTO();
            stepDTO.setStepId(stepList.get(j).getStepId());
            stepDTO.setDescription(stepList.get(j).getDescription());
            stepDTO.setImage(stepList.get(j).getImage());
            stepDTO.setLevel(stepList.get(j).getLevel());
            stepDTOList.add(stepDTO);
        }
        recipeDTO.setStepList(stepDTOList);
        return recipeDTO;
    }

    public List<RecipeListupDTO> recommendList(List<Long> recommendList) {
        List<RecipeListupDTO> recipeListupDTOList = new ArrayList<>();
        for (int i = 0; i < recommendList.size(); i++) {
            RecipeListupDTO recipeListupDTO = new RecipeListupDTO();
            Optional<Recipe> recipe = recipeRepository.findById(recommendList.get(i));
            recipeListupDTO.setRecipeId(recipe.get().getRecipeId());
            recipeListupDTO.setRecipename(recipe.get().getCuisine());
            recipeListupDTO.setUrl(recipe.get().getImage());
            recipeListupDTO.setDescription(recipe.get().getDescription());
            Long recipeId = recipe.get().getRecipeId();
            //평균평점
            String query = "select avg(e.favor) from Evaluation e where e.recipe.recipeId= :recipeId";
            Double avg_favor = entityManager.createQuery(query, Double.class).setParameter("recipeId", recipeId).getSingleResult();

            recipeListupDTO.setFavor(avg_favor);
            recipeListupDTOList.add(recipeListupDTO);
        }
        return recipeListupDTOList;
    }

    public List<RecipeListupDTO> recipeFavor() {
        List<RecipeListupDTO> recipeListupDTOList = new ArrayList<>();
        String jpql = "select distinct(e.recipe.recipeId) from Evaluation e where e.recipe.flag=true order by e.favor desc";
        List<Long> recipeIds = entityManager.createQuery(jpql, Long.class).getResultList();
        for (int i = 0; i < recipeIds.size(); i++) {
            RecipeListupDTO recipeListupDTO = new RecipeListupDTO();
            Optional<Recipe> recipe = recipeRepository.findById(recipeIds.get(i));
            recipeListupDTO.setRecipeId(recipe.get().getRecipeId());
            recipeListupDTO.setUrl(recipe.get().getImage());
            recipeListupDTO.setDescription(recipe.get().getDescription());
            recipeListupDTO.setRecipename(recipe.get().getCuisine());
            Long recipeId = recipe.get().getRecipeId();
            //평균평점
            String query = "select avg(e.favor) from Evaluation e where e.recipe.recipeId= :recipeId";
            Double avg_favor = entityManager.createQuery(query, Double.class).setParameter("recipeId", recipeId).getSingleResult();
            recipeListupDTO.setFavor(avg_favor);
            recipeListupDTOList.add(recipeListupDTO);
        }
        return recipeListupDTOList;
    }

    public boolean evaluateUpdate(EvaluationDTOpost evaluationDTOpost) {
        Optional<Evaluation> evaluation = Optional.ofNullable(evaluationRepository.findById(evaluationDTOpost.getEvaluationId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 평가데이터는 존재하지않습니다.")));
        evaluation.get().setIsComplete(evaluationDTOpost.getIsComplete());
        evaluation.get().setFavor(evaluationDTOpost.getFavor());
        for (int i = 0; i < evaluationDTOpost.getKeywordList().size(); i++) {
            EvaluationKeyword evaluationKeyword = new EvaluationKeyword();
            Keyword keyword = keywordRepository.findByKeyword(evaluationDTOpost.getKeywordList().get(i));//keyword 테이블에서 해당 키워드 정도 찾기
            evaluationKeyword.setEvaluation(evaluation.get()); //평가 id는 위에서 저장한 평가데이터의 id로 설정
            evaluationKeyword.setKeyword(keyword);//각각 키워드는 위에서구한 keyword 객체로 설정
            evaluationKeywordRepository.save(evaluationKeyword);
        }
        evaluationRepository.save(evaluation.get());
        return true;
    }

//    public void recipeClick(RecipeClickDTO recipeClickDTO) {
//        Optional<User> user = Optional.ofNullable(userRepository.findById(recipeClickDTO.getUserId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당유저는 존재하지않습니다.")));
//        Optional<Recipe> recipe = Optional.ofNullable(recipeRepository.findById(recipeClickDTO.getRecipeId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 레시피는 존재하지 않습니다.")));
//        Evaluation evaluation = new Evaluation();
//        evaluation.setIsSampled(true);
//        evaluation.setUser(user.get());
//        evaluation.setRecipe(recipe.get());
//    }

    public List<RecipeListupDTO> search(String cuisine) {
        List<RecipeListupDTO> recipeListupDTOList = new ArrayList<>();
        List<Recipe> recipeList = recipeRepository.findByCuisineContaining(cuisine);
//        System.out.println(recipeList.size());
        for (int i = 0; i < recipeList.size(); i++) {
            RecipeListupDTO recipeListupDTO = new RecipeListupDTO();
            recipeListupDTO.setRecipename(recipeList.get(i).getCuisine());
            recipeListupDTO.setUrl(recipeList.get(i).getImage());
            recipeListupDTO.setRecipeId(recipeList.get(i).getRecipeId());
            recipeListupDTO.setDescription(recipeList.get(i).getDescription());
            Long recipeId = recipeList.get(i).getRecipeId();
            //평균평점
            String query = "select avg(e.favor) from Evaluation e where e.recipe.recipeId= :recipeId";
            Double avg_favor = entityManager.createQuery(query, Double.class).setParameter("recipeId", recipeId).getSingleResult();
            recipeListupDTO.setFavor(avg_favor);
            recipeListupDTOList.add(recipeListupDTO);
        }
        return recipeListupDTOList;
    }

    public int evaluationExist(Long userId) {
        Optional<User> user = Optional.ofNullable(userRepository.findById(userId).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저는 존재하지 않습니다.")));
        Optional<List<Evaluation>> evaluationList = Optional.ofNullable((List<Evaluation>) evaluationRepository.findByUser(user.get()));
        if (evaluationList.get().size() > 0)
            return 1;
        else return 0;
    }


    public Long newRecipe(RecipeDTOpost recipeDTOpost) throws IOException {
        //해당 유저가 존재하는지 확인
        Optional<User> user = Optional.ofNullable(userRepository.findByUid(recipeDTOpost.getUid()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저는 존재하지 않습니다.")));
        //1. recipe 테이블에 등록
        Recipe recipe = new Recipe();
        recipe.setUser(user.get());
        recipe.setServing(recipeDTOpost.getServing());
        recipe.setLevel(recipeDTOpost.getLevel());
        recipe.setCookingTime(recipeDTOpost.getCookingTime());
        recipe.setDescription(recipeDTOpost.getDescription());
        recipe.setCuisine(recipeDTOpost.getCuisine());
        recipe.setFlag(true);
        recipeRepository.save(recipe);
        //3. recipe_has_ingredient 테이블에 등록
        List<IngredientDTOpost> ingredientList = recipeDTOpost.getIngredientDTOpostList();
        for (int i = 0; i < ingredientList.size(); i++) {
            String ingredientName = ingredientList.get(i).getIngredientName();
            Optional<Ingredient> ing = Optional.ofNullable(ingredientRepository.findByIngredientName(ingredientName));
            RecipeIngredient recipeIngredient = new RecipeIngredient();
            //2. 만약 재료가 존재하지않은 재료면 재료 테이블에 새로 등록
            if (!ing.isPresent()) {//해당재료가 존재하지않은 재료면
                Ingredient ingredient = new Ingredient();
                ingredient.setIngredientName(ingredientName);
                ingredientRepository.save(ingredient);
                recipeIngredient.setIngredient(ingredient);
            } else {
                recipeIngredient.setIngredient(ing.get());
            }
            recipeIngredient.setType(ingredientList.get(i).getIsType());
            recipeIngredient.setAmount(ingredientList.get(i).getAmount());
            recipeIngredient.setRecipe(recipe);
            recipeIngredientRepository.save(recipeIngredient);
        }

        //4. step 테이블에 등록
        List<StepDTOpost> stepDTOList = recipeDTOpost.getStepDTOpostList();
        for (int i = 0; i < stepDTOList.size(); i++) {
            Step step = new Step();
            step.setRecipe(recipe);
            step.setLevel(stepDTOList.get(i).getLevel());
            step.setDescription(stepDTOList.get(i).getStepDescription());
            step.setImage(stepDTOList.get(i).getImage());
            stepRepository.save(step);
        }
        return recipe.getRecipeId();
    }

    public List<String> allIngredient() {
        String jpql = "select i.ingredientName from Ingredient i";
        return entityManager.createQuery(jpql, String.class).getResultList();
    }

    public void mainImage(MultipartFile file, Long recipeId) throws IOException {
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);
        //5.s3에 이미지 업로드 후 recipe image에 set한다.
        String image = s3Uploader.upload(file, recipeId);
        System.out.println(image);
        recipe.get().setImage(image);
        recipeRepository.save(recipe.get());
    }

    public void basicFix(RecipeBasicFixDTO recipeBasicFixDTO) {
        Optional<Recipe> recipe = Optional.ofNullable(recipeRepository.findById(recipeBasicFixDTO.getRecipId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 레시피는 존재하지 않습니다.")));
        recipe.get().setCuisine(recipeBasicFixDTO.getCuisine());
        recipe.get().setDescription(recipeBasicFixDTO.getDescription());
        recipe.get().setCookingTime(recipeBasicFixDTO.getCookingTime());
        recipeRepository.save(recipe.get());
    }

    public void stepFix(RecipeStepFixDTO recipeStepFixDTO) {
        Optional<Step> step = Optional.ofNullable(stepRepository.findById(recipeStepFixDTO.getStepId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 과정은 존재하지 않습니다.")));
        step.get().setDescription(recipeStepFixDTO.getDescription());
        step.get().setLevel(recipeStepFixDTO.getLevel());
        stepRepository.save(step.get());
    }

    public void stepImage(MultipartFile file, Long stepId) throws IOException {
        Optional<Step> step = Optional.ofNullable(stepRepository.findById(stepId).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 과정은 존재하지 않습니다.")));
        String image = s3Uploader.uploadStep(file, stepId);
        step.get().setImage(image);
        stepRepository.save(step.get());
    }

    public void ingredientFix(RecipeIngredientFixDTO recipeIngredientFixDTO) {
        Optional<RecipeIngredient> recipeIngredient = Optional.ofNullable(recipeIngredientRepository.findById(recipeIngredientFixDTO.getRecipeIngredientId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 재료 정보는 존재하지 않습니다.")));
        recipeIngredient.get().setAmount(recipeIngredientFixDTO.getAmount());
        recipeIngredient.get().setType(recipeIngredientFixDTO.getType());
        recipeIngredientRepository.save(recipeIngredient.get());
    }

    public void deleteRecipe(Long recipdId) {
        Optional<Recipe> recipe = Optional.ofNullable(recipeRepository.findById(recipdId).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 레시피는 존재하지 않습니다.")));
        recipe.get().setFlag(false);
        recipeRepository.save(recipe.get());
    }

}