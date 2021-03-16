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
@Table
public class Ingredient {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long ingredientId;

    @Column(name = "name")
    private String ingredeintName;

    @OneToMany(mappedBy = "ingredient")
    private final List<Recipe_has_ingredient> hasIngredients = new ArrayList<>();
}
