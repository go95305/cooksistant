package com.project.cooksistant.service;

import com.project.cooksistant.model.dto.RecipeDTO;
import com.project.cooksistant.model.dto.UserDTO;
import com.project.cooksistant.model.entity.*;
import com.project.cooksistant.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class RecipeService {

    @PersistenceContext
    EntityManager entityManager;
    private final UserRepository userRepository;
    private final WebClient webClient;

    public RecipeService(UserRepository userRepository, WebClient.Builder webClientBuilder) {
        this.userRepository = userRepository;
        this.webClient = webClientBuilder.baseUrl("http://localhost:8080").build();
    }


    public List<UserDTO> findRecipeName() {
        ModelMapper modelMapper = new ModelMapper();
        List<User> list = userRepository.findAll();
        List<UserDTO> userDTOList = modelMapper.map(list, new TypeToken<List<UserDTO>>() {
        }.getType());
        System.out.println(userDTOList);
        return userDTOList;
    }

    //새로운 레시피 등록시 해당 레시피 등록후 다시 리턴
    public RecipeDTO insertRecipe(RecipeDTO recipeDTO) {
        Recipe recipe = new Recipe();
        Step step = new Step();
        Ingredient ingredient = new Ingredient();
        RecipeIngredient recipeIngredient = new RecipeIngredient();

        //해당 테이블에 값 입력. 알맞는 컬럼정보만 넣게 modelmapper를 사용하자.


    }
}
