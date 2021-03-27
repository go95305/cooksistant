package com.project.cooksistant.controller;

import com.project.cooksistant.model.dto.*;
import com.project.cooksistant.service.RecipeService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RecipeController {
    private final RecipeService recipeService;
    private final WebClient webClient;

    public RecipeController(RecipeService recipeService,WebClient.Builder webClientBuilder) {
        this.recipeService = recipeService;
        this.webClient = webClientBuilder.baseUrl("http://j4c101.p.ssafy.io:8083").build();
    }

    @ApiOperation(value = "취향 기반 레시피 리스트 제공(X)", notes = "Request\n" +
            "                                                   - userId:협업필터링에 사용될 유저와 비슷한 레시피 추천을 위한 UserId\n" +
            "                                                   - List<String>: 추천받을 재료 리스트")
    @GetMapping("recipe/recommendation")
    public List<RecipeDTO> recommend(@RequestBody RecommendDTO recommendDTO) {
        List<Long> recommendList = Collections.singletonList(webClient.get()
                .uri("/evaluation")
                .retrieve()
                .bodyToMono(Long.class).block());
        List<RecipeDTO> recipeDTOList = recipeService.getRecommendation(recommendList);
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

    @ApiOperation(value = "트렌디한 레시피 보기", notes = "네이버 데이터랩에서 가져오기")
    @GetMapping("/recipe/trend")
    public ResponseEntity<Map<String, Object>> trendRecipe() {
        ResponseEntity<Map<String, Object>> resEntity = null;
        Map<String, Object> map = new HashMap<String, Object>();

        return resEntity;
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
