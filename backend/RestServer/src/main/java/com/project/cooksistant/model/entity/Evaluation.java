package com.project.cooksistant.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table
@Data
public class Evaluation {

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long evalId;

    @ManyToOne
    @JoinColumn(name = "uid", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "recipeId", nullable = false)
    private Recipe recipe;

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

    @Column(name = "favor")
    private boolean favor;

    @Column(name = "is_complete")
    private boolean isComplete;

    @Column(name = "is_sampled")
    private boolean isSampled;


}
