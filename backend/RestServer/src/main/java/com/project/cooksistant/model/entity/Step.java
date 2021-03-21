package com.project.cooksistant.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Data
@Table(name = "step")
public class Step {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long stepId;

    @ManyToOne
    @JoinColumn(name = "recipeId",nullable = false)
    private Recipe recipe;

    @Column(name = "description", nullable = false, columnDefinition = "text")
    private String description;

    private String image;
    @Column(name = "level", nullable = false)
    private Long level;
}
