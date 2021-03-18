package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
    private Long uid;
    private String authKey;
    private String nickname;
    private Long saltiness;
    private Long sourness;
    private Long spiciness;
    private Long sweetness;
}
