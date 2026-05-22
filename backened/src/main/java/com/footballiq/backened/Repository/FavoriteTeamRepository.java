package com.footballiq.backened.Repository;

import com.footballiq.backened.Entity.FavoriteTeam;
import com.footballiq.backened.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteTeamRepository extends JpaRepository<FavoriteTeam, Long> {

    List<FavoriteTeam> findByUserOrderByCreatedAtDesc(User user);

    boolean existsByUserAndTeamId(User user, Integer teamId);

    void deleteByUserAndTeamId(User user, Integer teamId);
}
