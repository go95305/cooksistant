package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.Evaluation;
import com.project.cooksistant.model.entity.EvaluationKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EvaluationKeywordRepository extends JpaRepository<EvaluationKeyword, Long> {
    List<EvaluationKeyword> findAllByEvaluation(Optional<Evaluation> evaluation);

}
