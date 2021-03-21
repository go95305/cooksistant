package com.project.cooksistant.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Data
public class Step {
    @Id
    @GeneratedValue
    @Column(name = "id",nullable = false)
    private Long stepId;

    @ManyToOne
    @JoinColumn(name = "recipeId",nullable = false)
    private Recipe recipe;

    @Column(name = "description",nullable = false)
    private String description;

    @Column(name = "level",nullable = false)
    private Long level;
    private String image;
}
