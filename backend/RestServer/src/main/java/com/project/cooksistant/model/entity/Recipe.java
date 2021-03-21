package com.project.cooksistant.model.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ToString
@Table
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
    private final List<RecipeIngredient> hasIngredients = new ArrayList<>();


    private String level;
    private String serving;
    private String image;

}
