package com.footballiq.backened.Service;

import com.footballiq.backened.DTO.FavoritePlayerDTO;
import com.footballiq.backened.DTO.FavoriteTeamDTO;
import com.footballiq.backened.Entity.FavoritePlayer;
import com.footballiq.backened.Entity.FavoriteTeam;
import com.footballiq.backened.Entity.User;
import com.footballiq.backened.Repository.FavoritePlayerRepository;
import com.footballiq.backened.Repository.FavoriteTeamRepository;
import com.footballiq.backened.Repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteTeamRepository favoriteTeamRepository;
    private final FavoritePlayerRepository favoritePlayerRepository;
    private final UserRepository userRepository;

    public FavoriteService(
            FavoriteTeamRepository favoriteTeamRepository,
            FavoritePlayerRepository favoritePlayerRepository,
            UserRepository userRepository
    ) {
        this.favoriteTeamRepository = favoriteTeamRepository;
        this.favoritePlayerRepository = favoritePlayerRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public FavoriteTeamDTO addFavoriteTeam(
            FavoriteTeamDTO dto,
            Authentication authentication
    ) {

        User user =
                getCurrentUser(
                        authentication
                );

        if(
                favoriteTeamRepository
                        .existsByUserAndTeamId(
                                user,
                                dto.getTeamId()
                        )
        ) {

            return favoriteTeamRepository
                    .findByUserOrderByCreatedAtDesc(
                            user
                    )
                    .stream()
                    .filter(
                            favorite ->
                                    favorite.getTeamId()
                                            .equals(
                                                    dto.getTeamId()
                                            )
                    )
                    .findFirst()
                    .map(
                            this::toTeamDto
                    )
                    .orElseThrow();
        }

        FavoriteTeam favoriteTeam =
                new FavoriteTeam();

        favoriteTeam.setUser(user);

        favoriteTeam.setTeamId(
                dto.getTeamId()
        );

        favoriteTeam.setTeamName(
                dto.getTeamName()
        );

        favoriteTeam.setTeamLogo(
                dto.getTeamLogo()
        );

        return toTeamDto(

                favoriteTeamRepository
                        .save(
                                favoriteTeam
                        )
        );
    }

    @Transactional
    public void removeFavoriteTeam(Integer teamId, Authentication authentication) {
        User user = getCurrentUser(authentication);
        favoriteTeamRepository.deleteByUserAndTeamId(user, teamId);
    }

    public List<FavoriteTeamDTO> getFavoriteTeams(Authentication authentication) {
        User user = getCurrentUser(authentication);

        return favoriteTeamRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::toTeamDto)
                .toList();
    }

    @Transactional
    public FavoritePlayerDTO addFavoritePlayer(
            FavoritePlayerDTO dto,
            Authentication authentication
    ) {

        User user =
                getCurrentUser(
                        authentication
                );

        if(
                favoritePlayerRepository
                        .existsByUserAndPlayerId(
                                user,
                                dto.getPlayerId()
                        )
        ) {

            return favoritePlayerRepository
                    .findByUserOrderByCreatedAtDesc(
                            user
                    )
                    .stream()
                    .filter(
                            favorite ->
                                    favorite.getPlayerId()
                                            .equals(
                                                    dto.getPlayerId()
                                            )
                    )
                    .findFirst()
                    .map(
                            this::toPlayerDto
                    )
                    .orElseThrow();
        }

        FavoritePlayer favoritePlayer =
                new FavoritePlayer();

        favoritePlayer.setUser(user);

        favoritePlayer.setPlayerId(
                dto.getPlayerId()
        );

        favoritePlayer.setPlayerName(
                dto.getPlayerName()
        );

        return toPlayerDto(

                favoritePlayerRepository
                        .save(
                                favoritePlayer
                        )
        );
    }

    @Transactional
    public void removeFavoritePlayer(Integer playerId, Authentication authentication) {
        User user = getCurrentUser(authentication);
        favoritePlayerRepository.deleteByUserAndPlayerId(user, playerId);
    }

    public List<FavoritePlayerDTO> getFavoritePlayers(Authentication authentication) {
        User user = getCurrentUser(authentication);

        return favoritePlayerRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::toPlayerDto)
                .toList();
    }

    private User getCurrentUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Authenticated user not found"
                ));
    }

    private FavoriteTeamDTO toTeamDto(
            FavoriteTeam favoriteTeam
    ) {

        return new FavoriteTeamDTO(

                favoriteTeam.getTeamId(),

                favoriteTeam.getTeamName(),

                favoriteTeam.getTeamLogo(),

                favoriteTeam.getCreatedAt()
        );
    }

    private FavoritePlayerDTO toPlayerDto(
            FavoritePlayer favoritePlayer
    ) {

        return new FavoritePlayerDTO(

                favoritePlayer.getPlayerId(),

                favoritePlayer.getPlayerName(),

                favoritePlayer.getCreatedAt()
        );
    }
}
