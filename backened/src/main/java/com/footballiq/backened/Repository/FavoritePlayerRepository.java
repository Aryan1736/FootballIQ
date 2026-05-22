package com.footballiq.backened.Repository;

import com.footballiq.backened.Entity.FavoritePlayer;
import com.footballiq.backened.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritePlayerRepository extends JpaRepository<FavoritePlayer, Long> {

    List<FavoritePlayer> findByUserOrderByCreatedAtDesc(User user);

    boolean existsByUserAndPlayerId(User user, Integer playerId);

    void deleteByUserAndPlayerId(User user, Integer playerId);
}
