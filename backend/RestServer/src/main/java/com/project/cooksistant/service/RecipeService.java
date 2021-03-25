package com.project.cooksistant.service;

import com.project.cooksistant.Exception.RestException;
import com.project.cooksistant.model.dto.*;
import com.project.cooksistant.model.entity.*;
import com.project.cooksistant.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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

    public RecipeService(UserRepository userRepository, WebClient.Builder webClientBuilder, StepRepository stepRepository, RecipeRepository recipeRepository, IngredientRepository ingredientRepository, RecipeIngredientRepository recipeIngredientRepository, ModelMapper modelMapper, EvaluationRepository evaluationRepository, EvaluationKeywordRepository evaluationKeywordRepository, KeywordRepository keywordRepository) {
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
    }

//
//    //새로운 레시피 등록시 해당 레시피 등록후 다시 리턴
//    @Transactional
//    public String insertRecipe(RecipeDTOpost recipeDTOpost) {
////        RecipeDTOpost newRecipeDTO = new RecipeDTOpost();
////        List<StepDTOpost> stepDTOList = new ArrayList<>();//리턴할 조리과정 리스트
////        List<IngredientDTOpost> ingredientDTOList = new ArrayList<>(); //리턴할 조리 재료 리스트
//
//        //레시피를 저장할 유저 정보 가져오기
//        User user = userRepository.findByNickname(recipeDTOpost.getNickname());
//        System.out.println(user);
//        //이 모든과정은 회원 즉 유저정보가 있으면 가능
//        if (user != null) {
//            Recipe recipe = new Recipe();
//            //레시피를 저장
//            recipe.setCuisine(recipeDTOpost.getCuisine());
//            recipe.setDescription(recipeDTOpost.getDescription());
//            recipe.setCookingTime(recipeDTOpost.getCookingTime());
//            recipe.setLevel(recipeDTOpost.getLevel());
//            recipe.setServing(recipeDTOpost.getServing());
//            recipe.setImage(recipeDTOpost.getImage());
//            recipe.setUser(user);
////            //리턴할 레시피 테이블 정보
////            newRecipeDTO.setCuisine(recipe.getCuisine());
////            newRecipeDTO.setCookingTime(recipe.getCookingTime());
////            newRecipeDTO.setDescription(recipe.getDescription());
////            newRecipeDTO.setImage(recipe.getImage());
////            newRecipeDTO.setLevel(recipe.getLevel());
////            newRecipeDTO.setServing(recipe.getServing());
////            newRecipeDTO.setUserId(recipeDTOpost.getUserId());
//
//            //레시피에 맞는 조리과정을 저장
//            for (int i = 0; i < recipeDTOpost.getStepDTOpostList().size(); i++) {
//                StepDTOpost stepDTO = new StepDTOpost();
//                Step step = new Step();
//                step.setDescription(recipeDTOpost.getStepDTOpostList().get(i).getStepDescription());
//                step.setImage(recipeDTOpost.getStepDTOpostList().get(i).getImage());
//                step.setLevel(recipeDTOpost.getStepDTOpostList().get(i).getLevel());
//                step.setRecipe(recipe);
//                stepRepository.save(step);
//
////                stepDTO = modelMapper.map(step, StepDTOpost.class);
////                stepDTOList.add(stepDTO);
//            }
//
//            for (int i = 0; i < recipeDTOpost.getIngredientDTOpostList().size(); i++) {
////                IngredientDTOpost newIngredientDTO = new IngredientDTOpost();
//
//                //재료가 ingredient테이블에 있는지 확인
//                Ingredient hasIngredient = ingredientRepository.findByIngredientName(recipeDTOpost.getIngredientDTOpostList().get(i).getIngredientName());
//                //만약 없으면 새롭게 재료를 넣는다.
//                if (hasIngredient == null) {
//                    Ingredient ingredient = new Ingredient();
//                    ingredient.setIngredientName(recipeDTOpost.getIngredientDTOpostList().get(i).getIngredientName());
//                    ingredientRepository.save(ingredient);
////                    newIngredientDTO.setId(ingredient.getIngredientId());
////                    newIngredientDTO.setIngredientName(ingredient.getIngredientName());
//                    RecipeIngredient recipeIngredient = new RecipeIngredient();
//                    recipeIngredient.setRecipe(recipe);
//                    recipeIngredient.setIngredient(ingredient);
//                    recipeIngredient.setAmount(recipeDTOpost.getIngredientDTOpostList().get(i).getAmount());
//                    recipeIngredient.setType(recipeDTOpost.getIngredientDTOpostList().get(i).getIsType());
//                    recipeIngredientRepository.save(recipeIngredient);//해당 레시피의 재료,amount,type을 저장
//                } else {
//                    RecipeIngredient recipeIngredient = new RecipeIngredient();
//                    recipeIngredient.setRecipe(recipe);
//                    recipeIngredient.setIngredient(hasIngredient);
//                    recipeIngredient.setAmount(recipeDTOpost.getIngredientDTOpostList().get(i).getAmount());
//                    recipeIngredient.setType(recipeDTOpost.getIngredientDTOpostList().get(i).getIsType());
//                    recipeIngredientRepository.save(recipeIngredient);//해당 레시피의 재료,amount,type을 저장
////                    newIngredientDTO.setId(hasIngredient.getIngredientId());
////                    newIngredientDTO.setIngredientName(hasIngredient.getIngredientName());
//                }
//                //recipe_has_ingredient테이블에 추가
//
//
////                newIngredientDTO.setAmount(recipeIngredient.getAmount());
////                newIngredientDTO.setIsType(recipeIngredient.getType());
////                ingredientDTOList.add(newIngredientDTO);
//            }
//            return "success";
//        } else {
//            return "fail";
//        }
//
//
//        //해당 테이블에 값 입력. 알맞는 컬럼정보만 넣게 modelmapper를 사용하자.
//
//
//    }

    public EvaluationDTO findEvaluation(Long evalId) {
        Optional<Evaluation> evaluation = Optional.ofNullable(evaluationRepository.findById(evalId).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "평가 데이터가 존재 하지 않습니다.")));
        List<EvaluationKeyword> evaluationKeywordList = evaluationKeywordRepository.findAllByEvaluation(evaluation);
        EvaluationDTO evaluationDTO = new EvaluationDTO();
        evaluationDTO.setComplete(true);
        evaluationDTO.setSampled(evaluation.get().isSampled());
        evaluationDTO.setRecipeId(evaluation.get().getRecipe().getRecipeId());
        evaluationDTO.setUserId(evaluation.get().getUser().getUserId());
        for (int i = 0; i < evaluationKeywordList.size(); i++) {
            evaluationDTO.getKeywords().add(evaluationKeywordList.get(i).getKeyword().getKeyword());
        }

        return evaluationDTO;
    }

    public boolean evaluateRecipe(EvaluationDTOpost evaluationDTOpost) throws Exception {
        Optional<Recipe> recipe = Optional.ofNullable(recipeRepository.findById(evaluationDTOpost.getRecipeId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 레시피는 존재하지 않습니다.")));
        Optional<User> user = Optional.ofNullable(userRepository.findById(evaluationDTOpost.getUserId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저는 존재하지 않는 유저입니다.")));
        Evaluation evaluation = new Evaluation();
        evaluation.setRecipe(recipe.get());
        evaluation.setUser(user.get());
        evaluation.setSampled(true);
        evaluation.setComplete(evaluationDTOpost.isComplete());
        evaluationRepository.save(evaluation);


        for (int i = 0; i < evaluationDTOpost.getKeywordList().size(); i++) {
            EvaluationKeyword evaluationKeyword = new EvaluationKeyword();
            Keyword keyword = keywordRepository.findByKeyword(evaluationDTOpost.getKeywordList().get(i));//keyword 테이블에서 해당 키워드 정도 찾기
            evaluationKeyword.setEvaluation(evaluation); //평가 id는 위에서 저장한 평가데이터의 id로 설정
            evaluationKeyword.setKeyword(keyword);//각각 키워드는 위에서구한 keyword 객체로 설정
            evaluationKeywordRepository.save(evaluationKeyword);
        }

        return true;

    }

    public List<AllEvaluationDTO> findAllEvaluation(String authKey) {
        Optional<User> user = Optional.ofNullable(userRepository.findByAuthKey(authKey).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저 존재하지않습니다.")));
        List<Evaluation> evaluationList = evaluationRepository.findAllByUser(user.get()); // 유저가 사용한 모든 레시피 평가했든 안했든

        List<AllEvaluationDTO> allEvaluationDTOList = new ArrayList<>();
        for (int i = 0; i < evaluationList.size(); i++) {
            AllEvaluationDTO allEvaluationDTO = new AllEvaluationDTO();
            allEvaluationDTO.setCuisine(evaluationList.get(i).getRecipe().getCuisine());
            allEvaluationDTO.setFavor(evaluationList.get(i).isFavor());
            allEvaluationDTO.setIsComplete(evaluationList.get(i).isComplete());
            allEvaluationDTO.setIsSampled(evaluationList.get(i).isSampled());
            allEvaluationDTO.setRecipe_id(evaluationList.get(i).getRecipe().getRecipeId());
            allEvaluationDTOList.add(allEvaluationDTO);
        }
        return allEvaluationDTOList;
    }

    public Long getRecommendation(RecommendDTO recommendDTO) {
        String hello = webClient.get()
                .uri("/evaluation")
                .retrieve()
                .bodyToMono(String.class).block();
        return Long.parseLong(hello);
    }
}
