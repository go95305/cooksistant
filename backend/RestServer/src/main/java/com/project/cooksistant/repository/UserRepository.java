package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByNickname(String userId);

    Optional<User> findByUid(String uid);
//    Optional<User> findByAuthKey(String authKey);


}
