package com.footballiq.backened.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PlayerDTO {

    private int id;

    private String name;

    private String nationality;

    private String position;

    private String dateOfBirth;

    private Integer shirtNumber;

    private String currentTeam;

    private String teamLogo;

    private String venue;

    private Integer founded;

    private String clubColors;

    private String website;

    private String contractStart;

    private String contractUntil;

    private List<String> competitions;

    private List<String> competitionLogos;
}