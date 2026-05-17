package com.footballiq.backened.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TeamMatchDTO {

    private int matchId;

    private int homeTeamId;
    private int awayTeamId;

    private String homeTeam;
    private String awayTeam;

    private String homeLogo;
    private String awayLogo;

    private int homeScore;
    private int awayScore;

    private String status;
    private String utcDate;
}
