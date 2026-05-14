package com.footballiq.backened.Controller;

import com.footballiq.backened.DTO.MatchDTO;
import com.footballiq.backened.DTO.StandingDTO;
import com.footballiq.backened.Service.FootballService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FootballController {

    private final FootballService footballService;

    public FootballController(FootballService footballService) {
        this.footballService = footballService;
    }

    @GetMapping("/api/football/standings/{leagueCode}")
    public List<StandingDTO> getStandings(@PathVariable String leagueCode) {
        return footballService.getStandings(leagueCode);
    }

    @GetMapping("/api/football/matches/{leagueCode}")
    public List<MatchDTO> getMatches(@PathVariable String leagueCode) {
        return footballService.getMatches(leagueCode);
    }
}
