package com.footballiq.backened.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StandingDTO {
    private int position;
    private String teamName;
    private int points;
}
