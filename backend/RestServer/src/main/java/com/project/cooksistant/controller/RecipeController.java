package com.project.cooksistant.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.project.cooksistant.model.dto.*;
import com.project.cooksistant.service.RecipeService;
import io.swagger.annotations.ApiOperation;
import jdk.nashorn.internal.parser.JSONParser;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.modelmapper.TypeToken;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.*;

@RestController
public class RecipeController {
    private final RecipeService recipeService;
    private final WebClient webClient;

    public RecipeController(RecipeService recipeService, WebClient.Builder webClientBuilder) {
        this.recipeService = recipeService;
        this.webClient = webClientBuilder.baseUrl("http://j4c101.p.ssafy.io:5000").build();
    }

    @ApiOperation(value = "취향 기반 레시피 리스트 제공(Ok)", notes = "Request\n" +
            "                                                   - userId:협업필터링에 사용될 유저와 비슷한 레시피 추천을 위한 UserId\n" +
            "                                                   - List<String>: 추천받을 재료 리스트")
    @PostMapping("recipe/recommendation")
    public List<RecipeDTO> recommend(@RequestBody RecommendDTO recommendDTO) {
        Gson gson = new Gson();
        String jsonArray = (webClient.post()
                .uri("/evaluation")
                .body(Mono.just(recommendDTO), RecommendDTO.class)
                .retrieve()
                .bodyToMono(String.class).block());
        JsonObject jsonObject = gson.fromJson(jsonArray, JsonObject.class);
        String[] idx = gson.fromJson(jsonObject.getAsJsonArray("result"), String[].class);
        List<Long> recommendList = new ArrayList<>();
        for (int i = 0; i < idx.length; i++) {
            recommendList.add(Long.parseLong(idx[i]));
        }
        List<RecipeDTO> recipeDTOList = recipeService.getRecommendation(recommendList);
        System.out.println(recipeDTOList);
        return recipeDTOList;
    }

    @ApiOperation(value = "레시피 평가하기(Ok)", notes = "Request\n" +
            "                                          - complete: 레시피 리뷰 작성 여부\n" +
            "                                          - keywordList: 평가 키워드 리스트\n" +
            "                                          - recipeId: 평가 레시피 번호\n" +
            "                                          - sampled: 샘플링 되었는지:\n" +
            "                                          - userId: 평가할 유저의 Id")
    @PostMapping("/recipe/evaluation")
    public String evaluation(@RequestBody EvaluationDTOpost evaluationDTOpost) throws Exception {
        boolean isEvaluation = recipeService.evaluateRecipe(evaluationDTOpost);
        if (isEvaluation)
            return "success";
        else
            return "fail";
    }

    @ApiOperation(value = "특정 레시피 평가내용 보기(Ok)", notes = "Request\n" +
            "                                                 - evalId: 평가 번호\n" +
            "                                                 Response\n" +
            "                                                 - complete: 레시피 리뷰 작성 여부\n" +
            "                                                 - keywords: 키워드 리스트\n" +
            "                                                 - recipeid: 레시피 번호\n" +
            "                                                 - sampled: 샘플링 되었는지\n" +
            "                                                 - userId: 유저번호")
    @GetMapping("/recipe/evaluation/{evalId}")
    public EvaluationDTO specificEvaluation(@PathVariable Long evalId) {
        EvaluationDTO evaluationDTO = recipeService.findEvaluation(evalId);
        return evaluationDTO;
    }


//    @ApiOperation(value = "레시피 등록")
//    @PostMapping("/recipe")
//    public String insertRecipe(@RequestBody RecipeDTOpost recipeDTOpost) {
//        String isInsert = recipeService.insertRecipe(recipeDTOpost);
//        if (isInsert.equals("success")) {
//            return "success";
//        } else {
//            return "fail";
//        }
//    }

    @ApiOperation(value = "내가 리뷰한 혹은 리뷰하지 않은 레시피 리스트 (Ok)", notes = "Request\n" +
            "                                                           - authKey: 유저 인증키\n" +
            "                                                           Response\n" +
            "                                                           - cuisine: 레시피 명\n" +
            "                                                           - recipe_id: 레시피 번호\n" +
            "                                                           - favor: 좋아요 여부\n" +
            "                                                           - isSampled:샘플링 여부\n" +
            "                                                           - isComplete: 레시피 리뷰 작성 여부")
    @PostMapping("/recipe/review/{authKey}")
    public List<AllEvaluationDTO> viewRecipe(@PathVariable String authKey) {
        List<AllEvaluationDTO> evaluationDTOList = recipeService.findAllEvaluation(authKey);
        return evaluationDTOList;
    }
}
