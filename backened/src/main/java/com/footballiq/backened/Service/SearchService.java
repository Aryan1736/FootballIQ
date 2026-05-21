package com.footballiq.backened.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.footballiq.backened.DTO.SearchResultDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    @Value("${football.api.key}")
    private String apiKey;

    private final String BASE_URL =
            "https://api.football-data.org/v4";


    private final List<SearchResultDTO> playerIndex = new ArrayList<>();

    public void registerPlayer(int id, String name) {



        boolean exists =
                playerIndex
                        .stream()
                        .anyMatch(

                                p ->
                                        p.getId()
                                                == id
                        );

        if(!exists) {

            playerIndex.add(

                    new SearchResultDTO(

                            id,
                            name,
                            "PLAYER",
                            ""
                    )
            );

            System.out.println(
                    "REGISTERED: "
                            + name
            );
        }
    }

    public List<SearchResultDTO>
    searchTeams(
            String query
    ) {

        List<SearchResultDTO>
                results =
                new ArrayList<>();

        String[] leagues = {

                "PL",
                "PD",
                "BL1",
                "SA",
                "FL1"
        };

        try {

            RestTemplate restTemplate =
                    new RestTemplate();

            HttpHeaders headers =
                    new HttpHeaders();

            headers.set(
                    "X-Auth-Token",
                    apiKey
            );

            HttpEntity<String> entity =
                    new HttpEntity<>(headers);

            ObjectMapper mapper =
                    new ObjectMapper();

            for(String league
                    : leagues) {

                String url =
                        BASE_URL
                                + "/competitions/"
                                + league
                                + "/teams";

                ResponseEntity<String>
                        response =
                        restTemplate.exchange(
                                url,
                                HttpMethod.GET,
                                entity,
                                String.class
                        );

                JsonNode root =
                        mapper.readTree(
                                response.getBody()
                        );

                JsonNode teams =
                        root.path("teams");

                for(JsonNode team
                        : teams) {

                    String teamName =
                            team.path("name")
                                    .asText();

                    if(teamName
                            .toLowerCase()
                            .contains(
                                    query.toLowerCase()
                            )) {

                        results.add(

                                new SearchResultDTO(

                                        team.path("id")
                                                .asInt(),

                                        teamName,

                                        "TEAM",

                                        team.path("crest")
                                                .asText()
                                )
                        );
                    }
                }
            }

        } catch(Exception e) {

            e.printStackTrace();
        }

        return results;
    }

    public List<SearchResultDTO> searchPlayers(String query) {
        return playerIndex
                .stream()
                .filter(
                        p ->
                                p.getName()
                                        .toLowerCase()
                                        .contains(
                                                query
                                                        .toLowerCase()
                                        )
                )
                .toList();
    }
    public List<SearchResultDTO> performSearch(String query) {

        List<SearchResultDTO>
                results =
                new ArrayList<>();

        results.addAll(
                searchTeams(query)
        );

        results.addAll(
                searchPlayers(query)
        );

        return results;
    }
}