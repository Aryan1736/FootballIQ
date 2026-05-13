package com.footballiq.backened.Controller;

import com.footballiq.backened.DTO.MatchDTO;
import com.footballiq.backened.DTO.StandingDTO;
import com.footballiq.backened.Service.FootballService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FootballController {

    private final FootballService footballService;

    public FootballController(FootballService footballService) {
        this.footballService = footballService;
    }

    @GetMapping("/api/football/standings")
    public List<StandingDTO> getStandings() {
        return footballService.getStandings();
    }

    @GetMapping("/api/football/matches")
    public List<MatchDTO> getMatches() {
        return footballService.getMatches();
    }
}
