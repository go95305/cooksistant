package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RecommendDTO {
    private Long userId;
    private List<String> ingredient = new ArrayList<>();
}
