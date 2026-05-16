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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FootballService {

    @Value("${football.api.key}")
    private String apiKey;

    // Standings

    private Map<String, List<StandingDTO>> standingsCache =
            new HashMap<>();

    private Map<String, Long> standingsCacheTime =
            new HashMap<>();

    public List<StandingDTO> getStandings(String leagueCode){

        if (standingsCache.containsKey(leagueCode) &&

                System.currentTimeMillis()
                        - standingsCacheTime.get(leagueCode) < 300000) {

            return standingsCache.get(leagueCode);
        }

        try {

            String standings_url =
                    "https://api.football-data.org/v4/competitions/"
                            + leagueCode +
                            "/standings";

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();

            headers.set("X-Auth-Token", apiKey);

            HttpEntity<String> entity =
                    new HttpEntity<>(headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            standings_url,
                            HttpMethod.GET,
                            entity,
                            String.class
                    );

            List<StandingDTO> standingsList =
                    new ArrayList<>();

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root =
                    mapper.readTree(response.getBody());

            JsonNode standingsNode =
                    root.path("standings");

            if(standingsNode.isEmpty()) {
                return standingsList;
            }

            JsonNode table =
                    standingsNode
                            .get(0)
                            .path("table");

            for(JsonNode team : table) {

                int id = team.path("team")
                        .path("id")
                        .asInt();

                int position =
                        team.path("position").asInt();

                String teamName =
                        team.path("team")
                                .path("name")
                                .asText();

                int points =
                        team.path("points").asInt();

                String logo =
                        team.path("team")
                                .path("crest")
                                .asText();

                int won =
                        team.path("won").asInt();

                int draw =
                        team.path("draw").asInt();

                int lost =
                        team.path("lost").asInt();

                int goalsFor =
                        team.path("goalsFor").asInt();

                int goalsAgainst =
                        team.path("goalsAgainst").asInt();

                int goalDifference =
                        team.path("goalDifference").asInt();

                standingsList.add(
                        new StandingDTO(
                                id,
                                position,
                                teamName,
                                points,
                                logo,
                                won,
                                draw,
                                lost,
                                goalsFor,
                                goalsAgainst,
                                goalDifference
                        )
                );
            }

            standingsCache.put(
                    leagueCode,
                    standingsList
            );

            standingsCacheTime.put(
                    leagueCode,
                    System.currentTimeMillis()
            );

            return standingsList;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return new ArrayList<>();
        }
    }

    // Matches

    private Map<String, List<MatchDTO>> matchesCache =
            new HashMap<>();

    private Map<String, Long> matchesCacheTime =
            new HashMap<>();

    public List<MatchDTO> getMatches(String leagueCode) {

        if(matchesCache.containsKey(leagueCode) &&

                System.currentTimeMillis()
                        - matchesCacheTime.get(leagueCode) < 300000) {

            return matchesCache.get(leagueCode);
        }

        try {

            String MATCH_URL =
                    "https://api.football-data.org/v4/competitions/"
                            + leagueCode +
                            "/matches";

            RestTemplate restTemplate =
                    new RestTemplate();

            HttpHeaders headers =
                    new HttpHeaders();

            headers.set("X-Auth-Token", apiKey);

            HttpEntity<String> entity =
                    new HttpEntity<>(headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            MATCH_URL,
                            HttpMethod.GET,
                            entity,
                            String.class
                    );

            List<MatchDTO> matchList =
                    new ArrayList<>();

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode root =
                    mapper.readTree(response.getBody());

            JsonNode matches =
                    root.path("matches");

            if(matches.isEmpty()) {
                return matchList;
            }

            for(JsonNode match : matches) {

                int homeTeamId =
                        match.path("homeTeam")
                                .path("id")
                                .asInt();

                int awayTeamId =
                        match.path("awayTeam")
                                .path("id")
                                .asInt();

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

                if(!status.equals("TIMED")) {
                    continue;
                }

                String homeLogo =
                        match.path("homeTeam")
                                .path("crest")
                                .asText();

                String awayLogo =
                        match.path("awayTeam")
                                .path("crest")
                                .asText();

                matchList.add(
                        new MatchDTO(
                                homeTeamId,
                                awayTeamId,
                                homeTeam,
                                awayTeam,
                                homeLogo,
                                awayLogo,
                                date,
                                status
                        )
                );
            }

            matchesCache.put(
                    leagueCode,
                    matchList
            );

            matchesCacheTime.put(
                    leagueCode,
                    System.currentTimeMillis()
            );

            return matchList;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return new ArrayList<>();
        }
    }
}
