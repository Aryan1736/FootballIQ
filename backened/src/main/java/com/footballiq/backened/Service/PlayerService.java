package com.footballiq.backened.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.footballiq.backened.DTO.PlayerDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PlayerService {

    @Value("${football.api.key}")
    private String apiKey;

    private final String BASE_URL =
            "https://api.football-data.org/v4";

    // Cache
    private final Map<Integer,
            PlayerDTO>
            playerCache =
            new HashMap<>();

    private final Map<Integer,
            Long>
            playerCacheTime =
            new HashMap<>();

    public PlayerDTO getPlayerDetails(int playerId) {

        if(playerCache.containsKey(playerId)

                &&

                System.currentTimeMillis()
                        -
                        playerCacheTime.get(playerId)
                        < 300000) {

            return playerCache.get(playerId);
        }

        String url =
                BASE_URL
                        + "/persons/"
                        + playerId;

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

        ResponseEntity<String> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        String.class
                );

        try {

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode root =
                    mapper.readTree(
                            response.getBody()
                    );

            List<String> competitions =
                    new ArrayList<>();

            List<String> competitionLogos =
                    new ArrayList<>();

            JsonNode comps =
                    root.path("currentTeam")
                            .path(
                                    "runningCompetitions"
                            );

            for(JsonNode comp : comps) {

                competitions.add(
                        comp.path("name")
                                .asText()
                );

                competitionLogos.add(
                        comp.path("emblem")
                                .asText()
                );
            }

            PlayerDTO player =
                    new PlayerDTO(

                            root.path("id")
                                    .asInt(),

                            root.path("name")
                                    .asText(),

                            root.path("nationality")
                                    .asText(),

                            root.path("position")
                                    .asText(),

                            root.path("dateOfBirth")
                                    .asText(),

                            root.path("shirtNumber")
                                    .asInt() == 0
                                    ? null
                                    : root.path("shirtNumber")
                                    .asInt(),

                            root.path("currentTeam")
                                    .path("name")
                                    .asText(),

                            root.path("currentTeam")
                                    .path("crest")
                                    .asText(),

                            root.path("currentTeam")
                                    .path("venue")
                                    .asText(),

                            root.path("currentTeam")
                                    .path("founded")
                                    .asInt(),

                            root.path("currentTeam")
                                    .path("clubColors")
                                    .asText(),

                            root.path("currentTeam")
                                    .path("website")
                                    .asText(),

                            root.path("currentTeam")
                                    .path("contract")
                                    .path("start")
                                    .isNull()
                                    ? null
                                    : root.path("currentTeam")
                                    .path("contract")
                                    .path("start")
                                    .asText(),

                            root.path("currentTeam")
                                    .path("contract")
                                    .path("until")
                                    .isNull()
                                    ? null
                                    : root.path("currentTeam")
                                    .path("contract")
                                    .path("until")
                                    .asText(),

                            competitions,
                            competitionLogos
                    );

            playerCache.put(
                    playerId,
                    player
            );

            playerCacheTime.put(
                    playerId,
                    System.currentTimeMillis()
            );

            return player;

        } catch(Exception e) {

            e.printStackTrace();
        }

        return null;
    }

}