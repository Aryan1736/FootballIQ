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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FootballService {

    @Value("${football.api.key}")
    private String apiKey;

    // Standings

    public List<StandingDTO> getStandings(String leagueCode){
        String standings_url = "https://api.football-data.org/v4/competitions/" + leagueCode +"/standings";
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

                int id = team.path("team")
                        .path("id")
                        .asInt();

                int position = team.path("position").asInt();

                String teamName =
                        team.path("team")
                                .path("name")
                                .asText();

                int points = team.path("points").asInt();

                String logo =
                        team.path("team")
                                .path("crest")
                                .asText();

                standingsList.add(
                        new StandingDTO(id, position, teamName, points, logo)
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return standingsList;
    }

    // Matches

    private Map<String, List<MatchDTO>> matchesCache =
            new HashMap<>();

    private Map<String, Long> cacheTime =
            new HashMap<>();

    public List<MatchDTO> getMatches(String leagueCode) {

        String MATCH_URL = "https://api.football-data.org/v4/competitions/" + leagueCode +"/matches";

        if(matchesCache.containsKey(leagueCode) &&

                System.currentTimeMillis()
                        - cacheTime.get(leagueCode) < 300000) {

            return matchesCache.get(leagueCode);
        }

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

        } catch (Exception e) {
            e.printStackTrace();
        }

        matchesCache.put(leagueCode, matchList);

        cacheTime.put(
                leagueCode,
                System.currentTimeMillis()
        );

        return matchList;
    }
}
