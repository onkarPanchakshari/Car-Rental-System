package com.example.carrentingsystemSpringBootAppliction.services.Auth;

import com.example.carrentingsystemSpringBootAppliction.dto.SingupRequest;
import com.example.carrentingsystemSpringBootAppliction.dto.UserDto;
import com.example.carrentingsystemSpringBootAppliction.entity.User;
import com.example.carrentingsystemSpringBootAppliction.enums.UserRoles;
import com.example.carrentingsystemSpringBootAppliction.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService
{

    private final UserRepository userRepository;

    @PostConstruct
    public void createAdminAccount(){
           User AdminAccount = userRepository.findByUserRole(UserRoles.ADMIN);
           if(AdminAccount == null) {
               User newAdminAccount = new User();
               newAdminAccount.setName("Admin");
               newAdminAccount.setEmail("admin@admin.com");
               newAdminAccount.setPassword(new BCryptPasswordEncoder().encode("admin"));
               newAdminAccount.setUserRole(UserRoles.ADMIN);
               userRepository.save(newAdminAccount);
               System.out.println("Admin account created Successfully");
           }
       }


    @Override
    public UserDto createCustomer(SingupRequest singupRequest)
    {
        User user = new User();
        user.setName(singupRequest.getName());
        user.setEmail(singupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(singupRequest.getPassword()));
        user.setUserRole(UserRoles.COUSTOMER);
        User createdUser = userRepository.save(user);
        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        return userDto;
    }

    @Override
    public boolean hasCustomerwithEamil(String email) {
        return userRepository.findFirstByEmail(email).isPresent() ;
    }
}
