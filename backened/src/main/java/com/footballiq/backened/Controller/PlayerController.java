package com.footballiq.backened.Controller;

import com.footballiq.backened.DTO.PlayerDTO;
import com.footballiq.backened.Service.PlayerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/football")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/player/{id}")
    public PlayerDTO getPlayer(@PathVariable int id) {
        return playerService.getPlayerDetails(id);
    }

}