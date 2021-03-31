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
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "recipeId", nullable = false)
    private Recipe recipe;


    @Column(name = "favor")
    private float favor;

    @Column(name = "is_complete", columnDefinition = "TINYINT(1)")
    private Boolean isComplete;

    @Column(name = "is_sampled", columnDefinition = "TINYINT(1)") //레시피를 단순히 클릭하여 데이터 분석에 활용(레시피를 클릭했으면 1)
    private Boolean isSampled;


}
