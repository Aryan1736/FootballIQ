package com.footballiq.backened.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/*
    NOTE:

    Full startup player indexing was attempted by fetching
    all teams from multiple leagues and then calling
    /teams/{id} to register every squad player for search.

    This worked technically, but the football-data.org
    free tier rate limit (429 Too Many Requests) was hit
    after a large number of team requests.

    Because of API restrictions, global indexing was
    removed.

    Current approach:
    1. Players from Top Scorers are indexed automatically.
    2. Team squad players are indexed when a team page is opened.

    This keeps search functional while staying within
    free API limits.
*/

@Service
public class PlayerIndexService {

//    @Value("${football.api.key}")
//    private String apiKey;
//
//    private final SearchService searchService;
//
//    private final String BASE_URL =
//            "https://api.football-data.org/v4";
//
//    public PlayerIndexService(
//            SearchService searchService
//    ) {
//
//        this.searchService =
//                searchService;
//    }
//
//    @PostConstruct
//    public void buildPlayerIndex() {
//
//        System.out.println(
//                "Building player index..."
//        );
//
//        String[] leagues = {
//
//                "PL",
//                "PD",
//                "BL1",
//                "SA",
//                "FL1"
//        };
//
//        for(String league
//                : leagues) {
//
//            fetchLeaguePlayers(
//                    league
//            );
//        }
//
//        System.out.println(
//                "Player index ready"
//        );
//    }
//
//    private void fetchLeaguePlayers(
//            String leagueCode
//    ) {
//
//        try {
//
//            RestTemplate restTemplate =
//                    new RestTemplate();
//
//            HttpHeaders headers =
//                    new HttpHeaders();
//
//            headers.set(
//                    "X-Auth-Token",
//                    apiKey
//            );
//
//            HttpEntity<String> entity =
//                    new HttpEntity<>(headers);
//
//            String url =
//                    BASE_URL
//                            + "/competitions/"
//                            + leagueCode
//                            + "/teams";
//
//            ResponseEntity<String>
//                    response =
//                    restTemplate.exchange(
//                            url,
//                            HttpMethod.GET,
//                            entity,
//                            String.class
//                    );
//
//            ObjectMapper mapper =
//                    new ObjectMapper();
//
//            JsonNode root =
//                    mapper.readTree(
//                            response.getBody()
//                    );
//
//            JsonNode teams =
//                    root.path("teams");
//
//            for(JsonNode team
//                    : teams) {
//
//                int teamId =
//                        team.path("id")
//                                .asInt();
//
//                fetchSquad(
//                        teamId
//                );
//            }
//
//        } catch(Exception e) {
//
//            e.printStackTrace();
//        }
//    }
//
//    private void fetchSquad(
//            int teamId
//    ) {
//
//        try {
//
//            RestTemplate restTemplate =
//                    new RestTemplate();
//
//            HttpHeaders headers =
//                    new HttpHeaders();
//
//            headers.set(
//                    "X-Auth-Token",
//                    apiKey
//            );
//
//            HttpEntity<String> entity =
//                    new HttpEntity<>(headers);
//
//            String url =
//                    BASE_URL
//                            + "/teams/"
//                            + teamId;
//
//            ResponseEntity<String>
//                    response =
//                    restTemplate.exchange(
//                            url,
//                            HttpMethod.GET,
//                            entity,
//                            String.class
//                    );
//
//            ObjectMapper mapper =
//                    new ObjectMapper();
//
//            JsonNode root =
//                    mapper.readTree(
//                            response.getBody()
//                    );
//
//            JsonNode squad =
//                    root.path("squad");
//
//            for(JsonNode player
//                    : squad) {
//
//                searchService
//                        .registerPlayer(
//
//                                player.path("id")
//                                        .asInt(),
//
//                                player.path("name")
//                                        .asText()
//                        );
//            }
//
//        } catch(Exception e) {
//
//            e.printStackTrace();
//        }
//    }
}