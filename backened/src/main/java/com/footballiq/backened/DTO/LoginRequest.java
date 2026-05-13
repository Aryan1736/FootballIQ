package com.footballiq.backened.DTO;

// Data Transfer Object - to send required data

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;
}
