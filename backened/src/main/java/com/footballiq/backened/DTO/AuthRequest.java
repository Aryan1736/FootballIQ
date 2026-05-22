package com.footballiq.backened.DTO;

import lombok.Data;

@Data
public class AuthRequest {

    private String email;
    private String password;
}
