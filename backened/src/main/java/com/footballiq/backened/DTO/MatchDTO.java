package com.footballiq.backened.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchDTO {

    private int homeTeamId;
    private int awayTeamId;

    private String homeTeam;
    private String awayTeam;

    private String homeLogo;
    private String awayLogo;

    private String matchDate;
    private String status;
}