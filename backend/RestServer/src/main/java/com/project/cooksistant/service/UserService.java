package com.project.cooksistant.service;

import com.project.cooksistant.Exception.RestException;
import com.project.cooksistant.model.dto.*;
import com.project.cooksistant.model.entity.Recipe;
import com.project.cooksistant.model.entity.Scrap;
import com.project.cooksistant.model.entity.User;
import com.project.cooksistant.repository.RecipeRepository;
import com.project.cooksistant.repository.ScrapRepository;
import com.project.cooksistant.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final ScrapRepository scrapRepository;
    private final ModelMapper modelMapper;

    @PersistenceContext
    EntityManager entityManager;

    public UserService(UserRepository userRepository, RecipeRepository recipeRepository, ScrapRepository scrapRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.scrapRepository = scrapRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public PersonalDTO getUserData(String authKey) {
        PersonalDTO personalDTO = new PersonalDTO();
        List<RecipeMypageDTO> recipeMypageDTOList = new ArrayList<>();
        List<ScrapMypageDTO> scrapMypageDTOList = new ArrayList<>();
        Optional<User> user = Optional.ofNullable(userRepository.findByAuthKey(authKey).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저는 존재하지 않습니다.")));
        personalDTO.setUserId(user.get().getUserId());
        personalDTO.setNickname(user.get().getNickname());
        personalDTO.setSaltiness(user.get().getSaltiness());
        personalDTO.setSourness(user.get().getSourness());
        personalDTO.setSpiciness(user.get().getSpiciness());
        personalDTO.setSweetness(user.get().getSweetness());
        personalDTO.setBitterness(user.get().getBitterness());

        //내가 등록한 레시피 검색
        List<Recipe> recipeList = recipeRepository.findAllByUser(user.get());
        recipeMypageDTOList = modelMapper.map(recipeList, new TypeToken<List<RecipeMypageDTO>>() {
        }.getType());
        personalDTO.setRecipeList(recipeMypageDTOList);

        //내가 스크랩한 레시피 검색
        List<Scrap> scrapList = scrapRepository.findAllByUser(user.get());
        scrapMypageDTOList = modelMapper.map(scrapList, new TypeToken<List<ScrapMypageDTO>>() {
        }.getType());
        personalDTO.setScrapList(scrapMypageDTOList);
//        personalDTO.setRecipeList(recipeList);
//        System.out.println(recipeList);
//        List<Scrap> scrapList = scrapRepository.findAllByUser(user.get());
//        personalDTO.setScrapList(scrapList);
        return personalDTO;
    }

}
