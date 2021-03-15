package com.project.cooksistant.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class User {
    @Id
    @GeneratedValue
    @Column(name = "id",nullable = false)
    private Long uid;

    @Column(name = "auth_key")
    private String authKey;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "sweetness")
    private Long sweetness;

    @Column(name = "saltiness")
    private Long saltiness;

    @Column(name = "spiciness")
    private Long spiciness;

    @Column(name = "bitterness")
    private Long bitterness;

    @Column(name = "sourness")
    private Long sourness;

}
