package com.example.carrentingsystemSpringBootAppliction.services.jwt;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;


public interface UserServices {

     UserDetailsService userDetailservice();
}
