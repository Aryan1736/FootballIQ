package com.footballiq.backened.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StandingDTO {
    private int id;
    private int position;
    private String teamName;
    private int points;
    private String logo;
    private int won;
    private int draw;
    private int lost;
    private int goalsFor;
    private int goalsAgainst;
    private int goalDifference;
    private int playedGames;
}
