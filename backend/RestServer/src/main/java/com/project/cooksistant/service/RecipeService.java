package com.project.cooksistant.service;

import com.project.cooksistant.Exception.RestException;
import com.project.cooksistant.model.dto.*;
import com.project.cooksistant.model.entity.*;
import com.project.cooksistant.repository.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.sql.SQLOutput;
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

    public RecipeService(UserRepository userRepository, WebClient.Builder webClientBuilder, StepRepository stepRepository, RecipeRepository recipeRepository, IngredientRepository ingredientRepository, RecipeIngredientRepository recipeIngredientRepository, ModelMapper modelMapper, EvaluationRepository evaluationRepository) {
        this.userRepository = userRepository;
        this.webClient = webClientBuilder.baseUrl("http://localhost:8080").build();
        this.stepRepository = stepRepository;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.modelMapper = modelMapper;
        this.evaluationRepository = evaluationRepository;
    }


    public List<UserDTO> findRecipeName() {
//        ModelMapper modelMapper = new ModelMapper();
        List<User> list = userRepository.findAll();
        List<UserDTO> userDTOList = modelMapper.map(list, new TypeToken<List<UserDTO>>() {
        }.getType());
        System.out.println(userDTOList);
        return userDTOList;
    }

    //새로운 레시피 등록시 해당 레시피 등록후 다시 리턴
    @Transactional
    public String insertRecipe(RecipeDTOpost recipeDTOpost) {
//        RecipeDTOpost newRecipeDTO = new RecipeDTOpost();
//        List<StepDTOpost> stepDTOList = new ArrayList<>();//리턴할 조리과정 리스트
//        List<IngredientDTOpost> ingredientDTOList = new ArrayList<>(); //리턴할 조리 재료 리스트

        //레시피를 저장할 유저 정보 가져오기
        User user = userRepository.findByNickname(recipeDTOpost.getNickname());
        System.out.println(user);
        //이 모든과정은 회원 즉 유저정보가 있으면 가능
        if (user != null) {
            Recipe recipe = new Recipe();
            //레시피를 저장
            recipe.setCuisine(recipeDTOpost.getCuisine());
            recipe.setDescription(recipeDTOpost.getDescription());
            recipe.setCookingTime(recipeDTOpost.getCookingTime());
            recipe.setLevel(recipeDTOpost.getLevel());
            recipe.setServing(recipeDTOpost.getServing());
            recipe.setImage(recipeDTOpost.getImage());
            recipe.setUser(user);
//            //리턴할 레시피 테이블 정보
//            newRecipeDTO.setCuisine(recipe.getCuisine());
//            newRecipeDTO.setCookingTime(recipe.getCookingTime());
//            newRecipeDTO.setDescription(recipe.getDescription());
//            newRecipeDTO.setImage(recipe.getImage());
//            newRecipeDTO.setLevel(recipe.getLevel());
//            newRecipeDTO.setServing(recipe.getServing());
//            newRecipeDTO.setUserId(recipeDTOpost.getUserId());

            //레시피에 맞는 조리과정을 저장
            for (int i = 0; i < recipeDTOpost.getStepDTOpostList().size(); i++) {
                StepDTOpost stepDTO = new StepDTOpost();
                Step step = new Step();
                step.setDescription(recipeDTOpost.getStepDTOpostList().get(i).getStepDescription());
                step.setImage(recipeDTOpost.getStepDTOpostList().get(i).getImage());
                step.setLevel(recipeDTOpost.getStepDTOpostList().get(i).getLevel());
                step.setRecipe(recipe);
                stepRepository.save(step);

//                stepDTO = modelMapper.map(step, StepDTOpost.class);
//                stepDTOList.add(stepDTO);
            }

            for (int i = 0; i < recipeDTOpost.getIngredientDTOpostList().size(); i++) {
//                IngredientDTOpost newIngredientDTO = new IngredientDTOpost();

                //재료가 ingredient테이블에 있는지 확인
                Ingredient hasIngredient = ingredientRepository.findByIngredientName(recipeDTOpost.getIngredientDTOpostList().get(i).getIngredientName());
                //만약 없으면 새롭게 재료를 넣는다.
                if (hasIngredient == null) {
                    Ingredient ingredient = new Ingredient();
                    ingredient.setIngredientName(recipeDTOpost.getIngredientDTOpostList().get(i).getIngredientName());
                    ingredientRepository.save(ingredient);
//                    newIngredientDTO.setId(ingredient.getIngredientId());
//                    newIngredientDTO.setIngredientName(ingredient.getIngredientName());
                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setRecipe(recipe);
                    recipeIngredient.setIngredient(ingredient);
                    recipeIngredient.setAmount(recipeDTOpost.getIngredientDTOpostList().get(i).getAmount());
                    recipeIngredient.setType(recipeDTOpost.getIngredientDTOpostList().get(i).getIsType());
                    recipeIngredientRepository.save(recipeIngredient);//해당 레시피의 재료,amount,type을 저장
                } else {
                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setRecipe(recipe);
                    recipeIngredient.setIngredient(hasIngredient);
                    recipeIngredient.setAmount(recipeDTOpost.getIngredientDTOpostList().get(i).getAmount());
                    recipeIngredient.setType(recipeDTOpost.getIngredientDTOpostList().get(i).getIsType());
                    recipeIngredientRepository.save(recipeIngredient);//해당 레시피의 재료,amount,type을 저장
//                    newIngredientDTO.setId(hasIngredient.getIngredientId());
//                    newIngredientDTO.setIngredientName(hasIngredient.getIngredientName());
                }
                //recipe_has_ingredient테이블에 추가


//                newIngredientDTO.setAmount(recipeIngredient.getAmount());
//                newIngredientDTO.setIsType(recipeIngredient.getType());
//                ingredientDTOList.add(newIngredientDTO);
            }
            return "success";
        } else {
            return "fail";
        }


        //해당 테이블에 값 입력. 알맞는 컬럼정보만 넣게 modelmapper를 사용하자.


    }

    public EvaluationDTO findEvaluation(Long evalId) {
        Optional<Evaluation> evaluation = Optional.ofNullable(evaluationRepository.findById(evalId).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "평가 데이터가 존재 하지 않습니다.")));
        EvaluationDTO evaluationDTO = new EvaluationDTO();
        evaluationDTO.setBitterness(evaluation.get().getBitterness());
        evaluationDTO.setComplete(evaluation.get().isComplete());
        evaluationDTO.setSampled(evaluation.get().isSampled());
        evaluationDTO.setSaltiness(evaluation.get().getSaltiness());
        evaluationDTO.setSourness(evaluation.get().getSourness());
        evaluationDTO.setSpiciness(evaluation.get().getSpiciness());
        evaluationDTO.setSweetness(evaluation.get().getSweetness());
        evaluationDTO.setRecipeId(evaluation.get().getRecipe().getRecipeId());
        evaluationDTO.setUserId(evaluation.get().getUser().getUserId());
        return evaluationDTO;
    }

    public boolean evaluateRecipe(EvaluationDTOpost evaluationDTOpost) throws Exception {
        Optional<Recipe> recipe = Optional.ofNullable(recipeRepository.findById(evaluationDTOpost.getRecipeId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 레시피는 존재하지 않습니다.")));
        Optional<User> user = Optional.ofNullable(userRepository.findById(evaluationDTOpost.getUserId()).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저는 존재하지 않는 유저입니다.")));

        Evaluation evaluation = modelMapper.map(evaluationDTOpost, Evaluation.class);
        evaluationRepository.save(evaluation);

        return true;

    }

    public List<EvaluationDTO> findAllEvaluation(String authKey) {
        Optional<User> user = Optional.ofNullable(userRepository.findByAuthKey(authKey).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저 존재하지않습니다.")));
        List<Evaluation> evaluationList = evaluationRepository.findAllByUser(user.get());
        List<EvaluationDTO> evaluationDTOList = modelMapper.map(evaluationList, new TypeToken<List<EvaluationDTO>>() {
        }.getType());
        return evaluationDTOList;
    }

}
