package com.project.cooksistant.repository;

import com.project.cooksistant.model.dto.EvaluationDTO;
import com.project.cooksistant.model.entity.Evaluation;
import com.project.cooksistant.model.entity.Recipe;
import com.project.cooksistant.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByUser(User user);
    List<Evaluation> findAllByUserOrderByIsCompleteAscEvalIdDesc(User user);

}
