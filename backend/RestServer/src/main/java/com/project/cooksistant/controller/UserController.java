package com.project.cooksistant.controller;

import com.project.cooksistant.model.dto.PersonalDTO;
import com.project.cooksistant.model.dto.ScrapMypageDTO;
import com.project.cooksistant.model.dto.UserDTO;
import com.project.cooksistant.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "유저 정보 불러오기(Ok)", notes = "Request\n" +
            "                                           - authkey(pathVariable)\n" +
            "                                           Response\n" +
            "                                           - userId:유저 인덱스\n" +
            "                                           - nickname:닉네임\n" +
            "                                           - saltiness:짠맛\n" +
            "                                           - sourness: 신맛\n" +
            "                                           - spiciness: 매운맛\n" +
            "                                           - sweetness: 단맛\n" +
            "                                           - bitterness: 쓴맛\n" +
            "                                           - scrapList: 유저가 스크랩한 레시피 리스트\n" +
            "                                           - {\n" +
            "                                           - recipeId: 레시피 번호\n" +
            "                                           - image: 레시피 사진 url\n" +
            "                                           - nickname: 레시피 소유자의 닉네임\n" +
            "                                           - cuisine: 스크랩한 레시피의 이름\n" +
            "                                           - description: 스크랩한 레시피의 설명\n" +
            "                                           - }\n" +
            "                                           - recipeList: 내가 작성한 레시피 리스트\n" +
            "                                           - recipeId: 내 레시피 번호\n" +
            "                                           - image: 내 레시피 사진 url\n" +
            "                                           - username: 내 이름\n" +
            "                                           - cuisine: 내 레시피 이름\n" +
            "                                           - description: 내 레시피 설명\n" +
            "                                           - }\n")
    @GetMapping("user/{authKey}")
    public PersonalDTO personalData(@PathVariable String authKey) {
        PersonalDTO personalDTO = userService.getUserData(authKey);
        return personalDTO;
    }

    @ApiOperation(value = "레시피정보를 스크랩하기", notes = "Request\n" +
            "                                           - recipeId: 스크랩할 레시피 인덱스\n" +
            "                                           Response\n" +
            "                                           - cuisine: 레시피 명\n" +
            "                                           - description: 레시피 설명\n" +
            "                                           - image: 레시피 이미지 URL\n" +
            "                                           - recipeId: 레시피 인덱스\n" +
            "                                           - nickname: 레시피 주인 닉네임")
    @PostMapping("user/scrap/{recipeId}")
    public ScrapMypageDTO scrapRecipe(@PathVariable Long recipeId) {
        ScrapMypageDTO scrapMypageDTO = userService.scrapRecipe(recipeId);
        return scrapMypageDTO;
    }
}
