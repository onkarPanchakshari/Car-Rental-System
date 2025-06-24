package com.example.carrentingsystemSpringBootAppliction.controller;


import com.example.carrentingsystemSpringBootAppliction.dto.AuthenticationRequest;
import com.example.carrentingsystemSpringBootAppliction.dto.AuthenticationResponse;
import com.example.carrentingsystemSpringBootAppliction.dto.SingupRequest;
import com.example.carrentingsystemSpringBootAppliction.dto.UserDto;
import com.example.carrentingsystemSpringBootAppliction.entity.User;
import com.example.carrentingsystemSpringBootAppliction.repository.UserRepository;
import com.example.carrentingsystemSpringBootAppliction.services.Auth.AuthService;

import com.example.carrentingsystemSpringBootAppliction.services.jwt.UserServices;
import com.example.carrentingsystemSpringBootAppliction.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController
{

    private final  AuthService authService;

    private final UserServices userServices;

    private  final JWTUtil jwtUtil;

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<?> singCustomer(@RequestBody SingupRequest singupRequest)
    {
            if(authService.hasCustomerwithEamil(singupRequest.getEmail()))
                return new  ResponseEntity<>("Customer already exist with this email address",HttpStatus.NOT_ACCEPTABLE);
            UserDto cratedCustomerDto = authService.createCustomer(singupRequest);
            if(cratedCustomerDto == null) return  new ResponseEntity<>("Cutonmer not crated ,come again! ",HttpStatus.BAD_REQUEST);

            return new ResponseEntity<>(cratedCustomerDto,HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws
            BadCredentialsException,
            DisabledException,
            UsernameNotFoundException{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));
        } catch(BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password");
        }
        final UserDetails userDetails = userServices.userDetailservice().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if(optionalUser.isPresent())
        {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
        }
        return authenticationResponse;

    }

}
