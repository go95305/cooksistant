package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    Keyword findByKeyword(String keyword);
}
