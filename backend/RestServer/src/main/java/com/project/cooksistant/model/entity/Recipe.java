package com.project.cooksistant.model.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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
@Table(name = "recipe")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long recipeId;


    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(name = "cuisine", nullable = false)
    private String cuisine;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "cooking_time")
    private String cookingTime;

    @OneToMany(mappedBy = "recipe")
    private final List<RecipeIngredient> hasIngredients = new ArrayList<>();


    private String image;
    private String level;
    private String serving;
    @Column(columnDefinition = "bit default true")
    private Boolean flag;
}
