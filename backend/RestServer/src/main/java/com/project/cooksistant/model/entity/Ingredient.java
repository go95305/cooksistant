package com.project.cooksistant.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "ingredient")
@Data
public class Ingredient {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long ingredientId;

    @Column(name = "name",nullable = false)
    private String ingredientName;

    @OneToMany(mappedBy = "ingredient")
    private final List<RecipeIngredient> hasIngredients = new ArrayList<>();
}
