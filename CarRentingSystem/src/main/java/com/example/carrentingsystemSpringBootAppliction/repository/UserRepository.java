package com.example.carrentingsystemSpringBootAppliction.repository;

import com.example.carrentingsystemSpringBootAppliction.entity.User;
import com.example.carrentingsystemSpringBootAppliction.enums.UserRoles;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>
{

    Optional<User> findFirstByEmail(String email);

    User findByUserRole(UserRoles userRoles);
//    Optional<User> findByUserRole(enums UserRoles );
}