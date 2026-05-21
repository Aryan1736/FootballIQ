package com.footballiq.backened.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopScorerDTO {

    private int playerId;

    private String playerName;

    private String teamName;

    private String teamLogo;

    private int goals;
}