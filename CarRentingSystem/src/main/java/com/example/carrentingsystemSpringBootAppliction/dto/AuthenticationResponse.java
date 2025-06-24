package com.example.carrentingsystemSpringBootAppliction.dto;

import com.example.carrentingsystemSpringBootAppliction.enums.UserRoles;
import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;
    private UserRoles userRole;
    private Long userId;


}
