package com.footballiq.backened.Service;

import com.footballiq.backened.DTO.MatchDTO;
import com.footballiq.backened.DTO.StandingDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Service
public class FootballService {

    @Value("${football.api.key}")
    private String apiKey;

    private final String standings_url = "https://api.football-data.org/v4/competitions/PL/standings";

    public List<StandingDTO> getStandings(){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                standings_url,
                HttpMethod.GET,
                entity,
                String.class
        );

        List<StandingDTO> standingsList = new ArrayList<>();

        try {

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response.getBody());

            JsonNode table =
                    root.path("standings")
                            .get(0)
                            .path("table");

            for(JsonNode team : table) {

                int position = team.path("position").asInt();

                String teamName =
                        team.path("team")
                                .path("name")
                                .asText();

                int points = team.path("points").asInt();

                standingsList.add(
                        new StandingDTO(position, teamName, points)
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return standingsList;
    }

    private final String MATCH_URL = "https://api.football-data.org/v4/competitions/PL/matches";

    public List<MatchDTO> getMatches() {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                MATCH_URL,
                HttpMethod.GET,
                entity,
                String.class
        );

        List<MatchDTO> matchList = new ArrayList<>();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode matches = root.path("matches");

            for(JsonNode match : matches) {
                String homeTeam =
                        match.path("homeTeam")
                                .path("name")
                                .asText();

                String awayTeam =
                        match.path("awayTeam")
                                .path("name")
                                .asText();

                String date =
                        match.path("utcDate")
                                .asText();

                String status =
                        match.path("status")
                                .asText();

                matchList.add(
                        new MatchDTO(
                                homeTeam,
                                awayTeam,
                                date,
                                status
                        )
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return matchList;
    }
}
