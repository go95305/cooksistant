package com.project.cooksistant.service;

import com.project.cooksistant.Exception.RestException;
import com.project.cooksistant.model.dto.PersonalDTO;
import com.project.cooksistant.model.dto.RecipeMypageDTO;
import com.project.cooksistant.model.dto.ScrapMypageDTO;
import com.project.cooksistant.model.dto.SignupDTO;
import com.project.cooksistant.model.entity.Recipe;
import com.project.cooksistant.model.entity.Scrap;
import com.project.cooksistant.model.entity.User;
import com.project.cooksistant.repository.RecipeRepository;
import com.project.cooksistant.repository.ScrapRepository;
import com.project.cooksistant.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
    public PersonalDTO getUserData(String uid) {
        PersonalDTO personalDTO = new PersonalDTO();
        List<RecipeMypageDTO> recipeMypageDTOList = new ArrayList<>();
        List<ScrapMypageDTO> scrapMypageDTOList = new ArrayList<>();
        Optional<User> user = Optional.ofNullable(userRepository.findByUid(uid).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저는 존재하지 않습니다.")));
        personalDTO.setUserId(user.get().getUserId());
        personalDTO.setNickname(user.get().getNickname());

        //내가 스크랩한 레시피 검색
        List<Scrap> scrapList = scrapRepository.findAllByUser(user.get());

        ScrapMypageDTO scrapMypageDTO = new ScrapMypageDTO();
        for (int i = 0; i < scrapList.size(); i++) {
            scrapMypageDTO.setNickname(scrapList.get(i).getUser().getNickname());
            scrapMypageDTO.setRecipeId(scrapList.get(i).getRecipe().getRecipeId());
            scrapMypageDTO.setImage(scrapList.get(i).getRecipe().getImage());
            scrapMypageDTO.setDescription(scrapList.get(i).getRecipe().getDescription());
            scrapMypageDTO.setCuisine(scrapList.get(i).getRecipe().getCuisine());
            scrapMypageDTOList.add(scrapMypageDTO);
        }
        personalDTO.setScrapList(scrapMypageDTOList);
        return personalDTO;
    }

    public ScrapMypageDTO scrapRecipe(Long recipeId, Long userId) {
        Optional<Recipe> recipe = Optional.ofNullable(recipeRepository.findById(recipeId).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 레시피는 존재하지 않는 레시피 입니다.")));
        Optional<User> user = Optional.ofNullable(userRepository.findById(userId).orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "해당 유저는 존재하지 않습니다.")));

        //이미 스크랩한 데이터인지 확인
        Optional<Scrap> isScrap = Optional.ofNullable(scrapRepository.findScrapByRecipeAndUser(recipe, user));
        if (isScrap.isPresent()) {//이미 존재하는 스크랩 정보면 에러 발생시킨다.
            throw new RestException(HttpStatus.BAD_REQUEST, "이미 스크랩한 데이터 입니다.");
        } else {
            Scrap scrap = new Scrap();
            scrap.setRecipe(recipe.get());
            scrap.setUser(user.get());
            scrapRepository.save(scrap);

            ScrapMypageDTO scrapMypageDTO = new ScrapMypageDTO();
            scrapMypageDTO.setCuisine(recipe.get().getCuisine());
            scrapMypageDTO.setDescription(recipe.get().getDescription());
            scrapMypageDTO.setImage(recipe.get().getImage());
            scrapMypageDTO.setRecipeId(recipe.get().getRecipeId());
            scrapMypageDTO.setNickname(user.get().getNickname());
            return scrapMypageDTO;
        }
    }

    public RestException signup(SignupDTO signupDTO) {
        Optional<User> user = userRepository.findByUid(signupDTO.getUid());
        if (user.isPresent()) {
            return new RestException(HttpStatus.NOT_FOUND, "이미 존재하는 유저입니다.");
        }
        User newuser = new User();
        newuser.setUid(signupDTO.getUid());
        newuser.setNickname(signupDTO.getNickname());
        userRepository.save(newuser);

        return null;
    }
}
