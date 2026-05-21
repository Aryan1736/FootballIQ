package com.footballiq.backened.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SearchResultDTO {

    private int id;

    private String name;

    private String type;

    private String logo;
}