package com.footballiq.backened.Service;

import com.footballiq.backened.DTO.MatchDTO;
import com.footballiq.backened.DTO.StandingDTO;
import com.footballiq.backened.DTO.TeamMatchDTO;
import com.footballiq.backened.DTO.TopScorerDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

@Service
public class FootballService {

    @Value("${football.api.key}")
    private String apiKey;

    // Standings

    private Map<String, List<StandingDTO>> standingsCache =
            new HashMap<>();

    private Map<String, Long> standingsCacheTime =
            new HashMap<>();

    private final SearchService searchService;


    public FootballService(SearchService searchService) {
        this.searchService = searchService;
    }

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

                int playedGames =
                        team.path("playedGames").asInt();

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
                                goalDifference,
                                playedGames
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

                int matchId =
                        match.path("id").asInt();

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

                Integer homeScore =
                        match.path("score")
                                .path("fullTime")
                                .path("home")
                                .isNull()
                                ? null
                                : match.path("score")
                                .path("fullTime")
                                .path("home")
                                .asInt();

                Integer awayScore =
                        match.path("score")
                                .path("fullTime")
                                .path("away")
                                .isNull()
                                ? null
                                : match.path("score")
                                .path("fullTime")
                                .path("away")
                                .asInt();

                matchList.add(
                        new MatchDTO(
                                matchId,
                                homeTeamId,
                                awayTeamId,
                                homeTeam,
                                awayTeam,
                                homeLogo,
                                awayLogo,
                                date,
                                status,
                                homeScore,
                                awayScore
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

    public List<TeamMatchDTO> getTeamPreviousMatches(int teamId) {

        String url =
                "https://api.football-data.org/v4/teams/"
                        + teamId
                        + "/matches?status=FINISHED&limit=10";

        RestTemplate restTemplate =
                new RestTemplate();

        HttpHeaders headers =
                new HttpHeaders();

        headers.set("X-Auth-Token", apiKey);

        HttpEntity<String> entity =
                new HttpEntity<>(headers);

        ResponseEntity<String> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        String.class
                );

        List<TeamMatchDTO> matchesList =
                new ArrayList<>();

        try {

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode root =
                    mapper.readTree(response.getBody());

            JsonNode matches =
                    root.path("matches");

            for(JsonNode match : matches) {

                matchesList.add(

                        new TeamMatchDTO(

                                match.path("id").asInt(),


                                match.path("homeTeam")
                                        .path("id")
                                        .asInt(),

                                match.path("awayTeam")
                                        .path("id")
                                        .asInt(),

                                match.path("homeTeam")
                                        .path("name")
                                        .asText(),

                                match.path("awayTeam")
                                        .path("name")
                                        .asText(),

                                match.path("homeTeam")
                                        .path("crest")
                                        .asText(),

                                match.path("awayTeam")
                                        .path("crest")
                                        .asText(),

                                match.path("score")
                                        .path("fullTime")
                                        .path("home")
                                        .asInt(),

                                match.path("score")
                                        .path("fullTime")
                                        .path("away")
                                        .asInt(),

                                match.path("status")
                                        .asText(),

                                match.path("utcDate")
                                        .asText()
                        )
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return matchesList;
    }

    private final Map<String,
            List<MatchDTO>>
            finishedMatchesCache =
            new HashMap<>();

    private final Map<String,
            Long>
            finishedMatchesCacheTime =
            new HashMap<>();

    public List<MatchDTO> getFinishedMatches(
            String leagueCode
    ) {

        if(finishedMatchesCache.containsKey(leagueCode)

                &&

                System.currentTimeMillis()
                        -
                        finishedMatchesCacheTime
                                .get(leagueCode)
                        < 300000) {

            return finishedMatchesCache
                    .get(leagueCode);
        }

        String url =
                "https://api.football-data.org/v4/competitions/"
                        + leagueCode
                        + "/matches?status=FINISHED";

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

        List<MatchDTO> matchList =
                new ArrayList<>();

        try {

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode root =
                    mapper.readTree(
                            response.getBody()
                    );

            JsonNode matches =
                    root.path("matches");

            for(JsonNode match : matches) {

                int matchId =
                        match.path("id")
                                .asInt();

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

                String homeLogo =
                        match.path("homeTeam")
                                .path("crest")
                                .asText();

                String awayLogo =
                        match.path("awayTeam")
                                .path("crest")
                                .asText();

                Integer homeScore =
                        match.path("score")
                                .path("fullTime")
                                .path("home")
                                .isNull()
                                ? null
                                : match.path("score")
                                .path("fullTime")
                                .path("home")
                                .asInt();

                Integer awayScore =
                        match.path("score")
                                .path("fullTime")
                                .path("away")
                                .isNull()
                                ? null
                                : match.path("score")
                                .path("fullTime")
                                .path("away")
                                .asInt();

                matchList.add(
                        new MatchDTO(
                                matchId,
                                homeTeamId,
                                awayTeamId,
                                homeTeam,
                                awayTeam,
                                homeLogo,
                                awayLogo,
                                date,
                                status,
                                homeScore,
                                awayScore
                        )
                );
            }

        } catch(Exception e) {

            e.printStackTrace();
        }

        Collections.reverse(matchList);

        if(matchList.size() > 15) {

            matchList =
                    matchList.subList(
                            0,
                            15
                    );
        }

        finishedMatchesCache.put(
                leagueCode,
                matchList
        );

        finishedMatchesCacheTime.put(
                leagueCode,
                System.currentTimeMillis()
        );

        return matchList;
    }

    private final Map<String,
            List<TopScorerDTO>>
            scorersCache =
            new HashMap<>();

    private final Map<String,
            Long>
            scorersCacheTime =
            new HashMap<>();


    public List<TopScorerDTO> getTopScorers(String leagueCode) {



        if(scorersCache.containsKey(leagueCode)

                &&

                System.currentTimeMillis()
                        -
                        scorersCacheTime
                                .get(leagueCode)
                        < 300000) {

            List<TopScorerDTO>
                    cachedScorers =
                    scorersCache.get(
                            leagueCode
                    );

            for(TopScorerDTO scorer
                    : cachedScorers) {

                searchService
                        .registerPlayer(

                                scorer.getPlayerId(),

                                scorer.getPlayerName()
                        );
            }

            return cachedScorers;
        }

        String url =
                "https://api.football-data.org/v4/competitions/"
                        + leagueCode
                        + "/scorers";

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

        List<TopScorerDTO> scorers =
                new ArrayList<>();

        try {

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode root =
                    mapper.readTree(
                            response.getBody()
                    );

            JsonNode scorersNode =
                    root.path("scorers");

            for(JsonNode scorer
                    : scorersNode) {

                scorers.add(

                        new TopScorerDTO(

                                scorer.path("player")
                                        .path("id")
                                        .asInt(),

                                scorer.path("player")
                                        .path("name")
                                        .asText(),

                                scorer.path("team")
                                        .path("name")
                                        .asText(),

                                scorer.path("team")
                                        .path("crest")
                                        .asText(),

                                scorer.path("goals")
                                        .asInt()
                        )

                );

                searchService
                        .registerPlayer(

                                scorer
                                        .path("player")
                                        .path("id")
                                        .asInt(),

                                scorer
                                        .path("player")
                                        .path("name")
                                        .asText()
                        );
            }

        } catch(Exception e) {

            e.printStackTrace();
        }

        scorersCache.put(
                leagueCode,
                scorers
        );

        scorersCacheTime.put(
                leagueCode,
                System.currentTimeMillis()
        );

        return scorers;
    }
}
