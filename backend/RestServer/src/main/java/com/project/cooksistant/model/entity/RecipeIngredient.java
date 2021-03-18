package com.project.cooksistant.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "recipe_has_ingredient")
public class RecipeIngredient {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipeId",nullable = false)
    private Recipe recipe;


    @ManyToOne
    @JoinColumn(name = "ingredientId",nullable = false)
    private Ingredient ingredient;

    private String amount;
    @Column(name = "isType")
    private String type;

}
