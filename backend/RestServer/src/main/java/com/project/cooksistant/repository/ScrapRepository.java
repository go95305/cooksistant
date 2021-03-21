package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.Scrap;
import com.project.cooksistant.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {

    List<Scrap> findAllByUser(User user);
}
