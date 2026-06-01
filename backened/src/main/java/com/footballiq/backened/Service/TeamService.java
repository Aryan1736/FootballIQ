package com.footballiq.backened.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class TeamService {

    @Value("${football.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://api.football-data.org/v4";

    private final SearchService searchService;
    private final RedisCacheService redisCacheService;

    public TeamService(
            SearchService searchService,
            RedisCacheService redisCacheService
    ) {
        this.searchService = searchService;
        this.redisCacheService = redisCacheService;
    }


    private final Map<Integer,
            String>
            teamCache =
            new HashMap<>();

    private final Map<Integer,
                Long>
            teamCacheTime =
            new HashMap<>();


    public String getTeamDetails(int id) {



        if(teamCache.containsKey(id)

                &&

                System.currentTimeMillis()
                        -
                        teamCacheTime.get(id)
                        < 300000) {

            try {

                ObjectMapper mapper =
                        new ObjectMapper();

                JsonNode root =
                        mapper.readTree(
                                teamCache.get(id)
                        );

                JsonNode squad =
                        root.path("squad");

                for(JsonNode player
                        : squad) {

                    searchService
                            .registerPlayer(

                                    player.path("id")
                                            .asInt(),

                                    player.path("name")
                                            .asText()
                            );
                }

            } catch(Exception e) {

                e.printStackTrace();
            }

            return teamCache.get(id);
        }

        String redisKey =
                "footballiq:team:"
                        + id
                        + ":details";

        java.util.Optional<String> redisTeam =
                redisCacheService.get(
                        redisKey,
                        String.class
                );

        if(redisTeam.isPresent()) {

            teamCache.put(
                    id,
                    redisTeam.get()
            );

            teamCacheTime.put(
                    id,
                    System.currentTimeMillis()
            );

            return redisTeam.get();
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String url = BASE_URL + "/teams/" + id;

        ResponseEntity<String> response = restTemplate.exchange(
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

            JsonNode squad =
                    root.path("squad");

            for(JsonNode player
                    : squad) {

                searchService
                        .registerPlayer(

                                player.path("id")
                                        .asInt(),

                                player.path("name")
                                        .asText()
                        );
            }

        } catch(Exception e) {

            e.printStackTrace();
        }

        teamCache.put(
                id,
                response.getBody()
        );

        teamCacheTime.put(
                id,
                System.currentTimeMillis()
        );

        redisCacheService.set(
                redisKey,
                response.getBody()
        );

        return response.getBody();
    }

    public String getTeamMatches(int id) {

        String redisKey =
                "footballiq:team:"
                        + id
                        + ":matches";

        java.util.Optional<String> redisTeamMatches =
                redisCacheService.get(
                        redisKey,
                        String.class
                );

        if(redisTeamMatches.isPresent()) {
            return redisTeamMatches.get();
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String url = BASE_URL + "/teams/" + id + "/matches?limit=5";

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        redisCacheService.set(
                redisKey,
                response.getBody()
        );

        return response.getBody();
    }


}
