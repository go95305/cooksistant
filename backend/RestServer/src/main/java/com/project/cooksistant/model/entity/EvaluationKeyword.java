package com.project.cooksistant.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "evaluation_has_keyword")
@Data
public class EvaluationKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long evalKeyId;

    @ManyToOne
    @JoinColumn(name = "evaluationId",nullable = false)
    private Evaluation evaluation;

    @ManyToOne
    @JoinColumn(name = "keywordId",nullable = false)
    private Keyword keyword;
}
