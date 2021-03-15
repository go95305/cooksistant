package com.project.cooksistant.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    @GetMapping("/hello")
    public String hello(){
        return "Hello #1";
    }
}
