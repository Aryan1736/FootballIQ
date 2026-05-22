package com.footballiq.backened.Controller;

import com.footballiq.backened.DTO.FavoritePlayerDTO;
import com.footballiq.backened.DTO.FavoriteTeamDTO;
import com.footballiq.backened.Service.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/team")
    public ResponseEntity<FavoriteTeamDTO> addFavoriteTeam(
            @RequestBody FavoriteTeamDTO dto,
            Authentication authentication
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(

                        favoriteService
                                .addFavoriteTeam(
                                        dto,
                                        authentication
                                )
                );
    }

    @DeleteMapping("/team/{id}")
    public ResponseEntity<Void> removeFavoriteTeam(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        favoriteService.removeFavoriteTeam(id, authentication);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/teams")
    public List<FavoriteTeamDTO> getFavoriteTeams(Authentication authentication) {
        return favoriteService.getFavoriteTeams(authentication);
    }

    @PostMapping("/player")
    public ResponseEntity<FavoritePlayerDTO> addFavoritePlayer(
            @RequestBody FavoritePlayerDTO dto,
            Authentication authentication
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(

                        favoriteService
                                .addFavoritePlayer(
                                        dto,
                                        authentication
                                )
                );
    }

    @DeleteMapping("/player/{id}")
    public ResponseEntity<Void> removeFavoritePlayer(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        favoriteService.removeFavoritePlayer(id, authentication);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/players")
    public List<FavoritePlayerDTO> getFavoritePlayers(Authentication authentication) {
        return favoriteService.getFavoritePlayers(authentication);
    }
}
