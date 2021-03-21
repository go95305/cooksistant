package com.project.cooksistant.service;

import com.project.cooksistant.model.dto.IngredientDTO;
import com.project.cooksistant.model.dto.RecipeDTO;
import com.project.cooksistant.model.dto.StepDTO;
import com.project.cooksistant.model.dto.UserDTO;
import com.project.cooksistant.model.entity.*;
import com.project.cooksistant.repository.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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

    public RecipeService(UserRepository userRepository, WebClient.Builder webClientBuilder, StepRepository stepRepository, RecipeRepository recipeRepository, IngredientRepository ingredientRepository, RecipeIngredientRepository recipeIngredientRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.webClient = webClientBuilder.baseUrl("http://localhost:8080").build();
        this.stepRepository = stepRepository;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.modelMapper = modelMapper;
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
    public String insertRecipe(RecipeDTO recipeDTO) {
//        RecipeDTO newRecipeDTO = new RecipeDTO();
//        List<StepDTO> stepDTOList = new ArrayList<>();//리턴할 조리과정 리스트
//        List<IngredientDTO> ingredientDTOList = new ArrayList<>(); //리턴할 조리 재료 리스트

        //레시피를 저장할 유저 정보 가져오기
        User user = userRepository.findByUid(recipeDTO.getUserId());
        //이 모든과정은 회원 즉 유저정보가 있으면 가능
        if (user != null) {
            Recipe recipe = new Recipe();
            //레시피를 저장
            recipe.setCuisine(recipeDTO.getCuisine());
            recipe.setDescription(recipeDTO.getDescription());
            recipe.setCookingTime(recipeDTO.getCookingTime());
            recipe.setLevel(recipeDTO.getLevel());
            recipe.setServing(recipeDTO.getServing());
            recipe.setImage(recipeDTO.getImage());
            recipe.setUser(user);
            recipeRepository.save(recipe);

//            //리턴할 레시피 테이블 정보
//            newRecipeDTO.setCuisine(recipe.getCuisine());
//            newRecipeDTO.setCookingTime(recipe.getCookingTime());
//            newRecipeDTO.setDescription(recipe.getDescription());
//            newRecipeDTO.setImage(recipe.getImage());
//            newRecipeDTO.setLevel(recipe.getLevel());
//            newRecipeDTO.setServing(recipe.getServing());
//            newRecipeDTO.setUserId(recipeDTO.getUserId());

            //레시피에 맞는 조리과정을 저장
            for (int i = 0; i < recipeDTO.getStepDTOList().size(); i++) {
                StepDTO stepDTO = new StepDTO();
                Step step = new Step();
                step.setDescription(recipeDTO.getStepDTOList().get(i).getStepDescription());
                step.setImage(recipeDTO.getStepDTOList().get(i).getImage());
                step.setLevel(recipeDTO.getStepDTOList().get(i).getLevel());
                step.setRecipe(recipe);
                stepRepository.save(step);

//                stepDTO = modelMapper.map(step, StepDTO.class);
//                stepDTOList.add(stepDTO);
            }

            for (int i = 0; i < recipeDTO.getIngredientDTOList().size(); i++) {
                IngredientDTO newIngredientDTO = new IngredientDTO();

                //재료가 ingredient테이블에 있는지 확인
                Ingredient hasIngredient = ingredientRepository.findByIngredientName(recipeDTO.getIngredientDTOList().get(i).getIngredientName());
                //만약 없으면 새롭게 재료를 넣는다.
                if (hasIngredient == null) {
                    Ingredient ingredient = new Ingredient();
                    ingredient.setIngredientName(recipeDTO.getIngredientDTOList().get(i).getIngredientName());
                    ingredientRepository.save(ingredient);
//                    newIngredientDTO.setId(ingredient.getIngredientId());
//                    newIngredientDTO.setIngredientName(ingredient.getIngredientName());
                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setRecipe(recipe);
                    recipeIngredient.setIngredient(ingredient);
                    recipeIngredient.setAmount(recipeDTO.getIngredientDTOList().get(i).getAmount());
                    recipeIngredient.setType(recipeDTO.getIngredientDTOList().get(i).getIsType());
                    recipeIngredientRepository.save(recipeIngredient);//해당 레시피의 재료,amount,type을 저장
                } else {
                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setRecipe(recipe);
                    recipeIngredient.setIngredient(hasIngredient);
                    recipeIngredient.setAmount(recipeDTO.getIngredientDTOList().get(i).getAmount());
                    recipeIngredient.setType(recipeDTO.getIngredientDTOList().get(i).getIsType());
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
}
