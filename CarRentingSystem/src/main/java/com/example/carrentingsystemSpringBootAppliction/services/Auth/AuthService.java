package com.example.carrentingsystemSpringBootAppliction.services.Auth;

import com.example.carrentingsystemSpringBootAppliction.dto.SingupRequest;
import com.example.carrentingsystemSpringBootAppliction.dto.UserDto;
import lombok.Data;
import org.springframework.stereotype.Service;


public interface AuthService
{
    UserDto createCustomer(SingupRequest singupRequest);

    boolean hasCustomerwithEamil(String email);

}
