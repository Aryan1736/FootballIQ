package com.footballiq.backened.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class FavoriteTeamDTO {

    private Integer teamId;

    private String teamName;

    private String teamLogo;

    private Instant createdAt;
}
