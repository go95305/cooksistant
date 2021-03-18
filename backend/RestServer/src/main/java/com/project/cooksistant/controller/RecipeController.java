package com.project.cooksistant.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.cooksistant.model.dto.RecipeDTO;
import com.project.cooksistant.model.dto.UserDTO;
import com.project.cooksistant.model.entity.Recipe;
import com.project.cooksistant.model.entity.User;
import com.project.cooksistant.service.RecipeService;
import io.swagger.annotations.ApiOperation;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @ApiOperation(value = "취향 기반 레시피 리스트 제공")
    @GetMapping("recipe/recommendation")
    public ResponseEntity<Map<String, Object>> recommend() {
        ResponseEntity<Map<String, Object>> resEntity = null;
        Map<String, Object> map = new HashMap<String, Object>();

        return resEntity;
    }

    @ApiOperation(value = "레시피 평가하기")
    @PostMapping("/recipe/evaluation")
    public ResponseEntity<Map<String, Object>> evaluation() {
        ResponseEntity<Map<String, Object>> resEntity = null;
        Map<String, Object> map = new HashMap<String, Object>();

        return resEntity;
    }

    @ApiOperation(value = "특정 레시피 평가내용 보기")
    @GetMapping("/recipe/evaluation")
    public List<UserDTO> specificEvaluation() {

        List<UserDTO> recipename = recipeService.findRecipeName();

        return recipename;

//        ResponseEntity<Map<String, Object>> resEntity = null;
//        Map<String, Object> map = new HashMap<String, Object>();

    }

    @ApiOperation(value = "트렌디한 레시피 보기", notes = "네이버 데이터랩에서 가져오기")
    @GetMapping("/recipe/trend")
    public ResponseEntity<Map<String, Object>> trendRecipe() {
        ResponseEntity<Map<String, Object>> resEntity = null;
        Map<String, Object> map = new HashMap<String, Object>();

        return resEntity;
    }

    @ApiOperation(value = "레시피 등록")
    @PostMapping("/recipe")
    public ResponseEntity<Map<String, Object>> insertRecipe(@RequestBody RecipeDTO recipeDTO) {
        ResponseEntity<Map<String, Object>> resEntity = null;
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            RecipeDTO newrecipe = recipeService.insertRecipe(recipeDTO);
        }catch (Exception e){

        }


        return resEntity;
    }

    @ApiOperation(value = "내가 리뷰한 혹은 리뷰하지 않은 레시피 리스트")
    @PostMapping("/recipe/review")
    public ResponseEntity<Map<String, Object>> viewRecipe() {
        ResponseEntity<Map<String, Object>> resEntity = null;
        Map<String, Object> map = new HashMap<String, Object>();

        return resEntity;
    }
}
