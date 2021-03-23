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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evalId;

    @ManyToOne
    @JoinColumn(name = "userId",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "recipeId",nullable = false)
    private Recipe recipe;


    @Column(name = "favor",columnDefinition = "TINYINT(1)")
    private boolean favor;

    @Column(name = "is_complete",columnDefinition = "TINYINT(1)")
    private boolean isComplete;

    @Column(name = "is_sampled",columnDefinition = "TINYINT(1)")
    private boolean isSampled;


}
