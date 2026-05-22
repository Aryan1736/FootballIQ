package com.footballiq.backened.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class FavoritePlayerDTO {

    private Integer playerId;

    private String playerName;

    private Instant createdAt;
}
