package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.User;
import com.project.cooksistant.model.entity.UserKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserKeywordRepository extends JpaRepository<UserKeyword, Long> {
    List<UserKeyword> findAllByUser(User user);
}
