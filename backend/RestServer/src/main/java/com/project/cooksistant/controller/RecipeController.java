package com.project.cooksistant.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RecipeController {

//    @GetMapping("/recommendation")
//    public ResponseEntity<Map<String,Object>> recommend(){
//        ResponseEntity<Map<String, Object>> resEntity = null;
//        Map<String, Object> map = new HashMap<String, Object>();
//        try {
//            memberService.deleteMember(userid);
//            map.put("msg", "success");
//            resEntity = new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
//            System.out.println("삭제성공");
//        } catch (SQLException e) {
//            e.printStackTrace();
//            map.put("msg", "fail");
//            resEntity = new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
//            System.out.println("삭제실패");
//        }
//        return resEntity;
//    }
}
