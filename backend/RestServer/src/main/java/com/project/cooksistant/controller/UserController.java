package com.project.cooksistant.controller;

import com.project.cooksistant.model.dto.PersonalDTO;
import com.project.cooksistant.model.dto.ScrapMypageDTO;
import com.project.cooksistant.model.dto.SignupDTO;
import com.project.cooksistant.model.dto.UserDTO;
import com.project.cooksistant.service.RecipeService;
import com.project.cooksistant.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "유저 정보 불러오기(Ok)", notes = "Request\n" +
            "                                           - uid(pathVariable)\n" +
            "                                           Response\n" +
            "                                           - userId:유저 인덱스\n" +
            "                                           - nickname:닉네임\n" +
            "                                           - scrapList: 유저가 스크랩한 레시피 리스트\n" +
            "                                           - {\n" +
            "                                           - recipeId: 레시피 번호\n" +
            "                                           - image: 레시피 사진 url\n" +
            "                                           - nickname: 레시피 소유자의 닉네임\n" +
            "                                           - cuisine: 스크랩한 레시피의 이름\n" +
            "                                           - description: 스크랩한 레시피의 설명\n" +
            "                                           - }")
    @GetMapping("/user/{uid}")
    public PersonalDTO personalData(@PathVariable String uid) {
        PersonalDTO personalDTO = userService.getUserData(uid);
        return personalDTO;
    }

    @ApiOperation(value = "레시피정보를 스크랩하기(Ok)", notes = "Request\n" +
            "                                           - recipeId: 스크랩할 레시피 인덱스\n" +
            "                                           Response\n" +
            "                                           - cuisine: 레시피 명\n" +
            "                                           - description: 레시피 설명\n" +
            "                                           - image: 레시피 이미지 URL\n" +
            "                                           - recipeId: 레시피 인덱스\n" +
            "                                           - nickname: 레시피 주인 닉네임\n")
    @PostMapping("/user/scrap/{recipeId}/{userId}")
    public ScrapMypageDTO scrapRecipe(@PathVariable Long recipeId, @PathVariable Long userId) {
        ScrapMypageDTO scrapMypageDTO = userService.scrapRecipe(recipeId, userId);
        return scrapMypageDTO;
    }

    @ApiOperation(value = "cooksistant 서비스 가입(Ok)", notes = "Request\n" +
            "                                              - uid:인증키?\n" +
            "                                              - nickname: 닉네임")
    @PostMapping("/user")
    public void signup(@RequestBody SignupDTO signupDTO) {
        userService.signup(signupDTO);
    }

    @ApiOperation(value = "해당 유저가 해당 레시피를스크랩했는지 여부", notes = "Request\n" +
            "                                                           - recipeId:레시피 인덱스\n" +
            "                                                           - userId: 유저 인덱스")
    @GetMapping("/user/isscrap/{userId}/{recipeId}")
    public Boolean isScraped(@PathVariable Long userId, @PathVariable Long recipeId) {
        return userService.myScrapData(userId, recipeId);
    }
}
