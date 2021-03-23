package com.project.cooksistant.controller;

import com.project.cooksistant.model.dto.EvaluationDTO;
import com.project.cooksistant.model.dto.EvaluationDTOpost;
import com.project.cooksistant.model.dto.RecipeDTOpost;
import com.project.cooksistant.model.dto.UserDTO;
import com.project.cooksistant.model.entity.Evaluation;
import com.project.cooksistant.service.RecipeService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

//    @ApiOperation(value = "취향 기반 레시피 리스트 제공(X)")
//    @GetMapping("recipe/recommendation")
//    public ResponseEntity<Map<String, Object>> recommend() {
//        ResponseEntity<Map<String, Object>> resEntity = null;
//        Map<String, Object> map = new HashMap<String, Object>();
//
//        return resEntity;
//    }
//
    @ApiOperation(value = "레시피 평가하기 (Ok)",notes = "Response\n" +
            "                                          - complete: 현재 레시피 사용을 완료한 상태인가\n" +
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

    @ApiOperation(value = "특정 레시피 평가내용 보기(Ok)")
    @GetMapping("/recipe/evaluation/{evalId}")
    public EvaluationDTO specificEvaluation(@PathVariable Long evalId) {
        EvaluationDTO evaluationDTO = recipeService.findEvaluation(evalId);
        return evaluationDTO;

//        ResponseEntity<Map<String, Object>> resEntity = null;
//        Map<String, Object> map = new HashMap<String, Object>();

    }

//    @ApiOperation(value = "트렌디한 레시피 보기", notes = "네이버 데이터랩에서 가져오기")
//    @GetMapping("/recipe/trend")
//    public ResponseEntity<Map<String, Object>> trendRecipe() {
//        ResponseEntity<Map<String, Object>> resEntity = null;
//        Map<String, Object> map = new HashMap<String, Object>();
//
//        return resEntity;
//    }
//
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
//
//    @ApiOperation(value = "내가 리뷰한 혹은 리뷰하지 않은 레시피 리스트")
//    @PostMapping("/recipe/review/{authKey}")
//    public List<EvaluationDTO> viewRecipe(@PathVariable String authKey) {
//        List<EvaluationDTO> evaluationDTOList = recipeService.findAllEvaluation(authKey);
//        return evaluationDTOList;
//    }
}
