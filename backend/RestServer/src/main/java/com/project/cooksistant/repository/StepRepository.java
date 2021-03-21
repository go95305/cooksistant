package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.Step;
import com.project.cooksistant.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StepRepository extends JpaRepository<Step,Long> {
}
