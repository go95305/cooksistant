package com.project.cooksistant.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Recipe {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long recipeId;

    @ManyToOne
    @JoinColumn(name = "uid", nullable = false)
    private User user;

    @Column(name = "cuisine", nullable = false)
    private String cuisine;

    private String description;

    @Column(name = "cooking_time")
    private String cookingTime;

    @OneToMany(mappedBy = "recipe")
    private final List<Recipe_has_ingredient> hasIngredients = new ArrayList<>();


    private String level;
    private String serving;
    private String image;

}
