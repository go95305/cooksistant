package com.project.cooksistant.model.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long userId;

    @Column(name = "auth_key",nullable = false)
    private String authKey;

    @Column(name = "nickname",nullable = false)
    private String nickname;

    @Column(name = "sweetness",nullable = false)
    private Long sweetness;

    @Column(name = "saltiness",nullable = false)
    private Long saltiness;

    @Column(name = "spiciness",nullable = false)
    private Long spiciness;

    @Column(name = "bitterness",nullable = false)
    private Long bitterness;

    @Column(name = "sourness",nullable = false)
    private Long sourness;

}
