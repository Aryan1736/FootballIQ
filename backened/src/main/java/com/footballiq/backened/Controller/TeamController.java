package com.footballiq.backened.Controller;

import com.footballiq.backened.Service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/football")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping("/team/{id}")
    public String getTeam(@PathVariable int id) {
        return teamService.getTeamDetails(id);
    }

    @GetMapping("/team/{id}/matches")
    public String getTeamMatches(@PathVariable int id) {
        return teamService.getTeamMatches(id);
    }
}