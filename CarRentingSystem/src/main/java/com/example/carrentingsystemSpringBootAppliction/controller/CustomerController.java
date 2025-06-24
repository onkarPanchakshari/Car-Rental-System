package com.example.carrentingsystemSpringBootAppliction.controller;

import com.example.carrentingsystemSpringBootAppliction.dto.BookACarDto;
import com.example.carrentingsystemSpringBootAppliction.dto.CarDto;
import com.example.carrentingsystemSpringBootAppliction.dto.SearchCarDto;
import com.example.carrentingsystemSpringBootAppliction.services.customer.CustomerServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerServices customerServices;

    @GetMapping("/cars")
    public ResponseEntity<List<CarDto>> getAllCars(){
        List<CarDto> carDtoList = customerServices.getAllCars();
        return ResponseEntity.ok(carDtoList);
    }


    @PostMapping("/car/book/{carId}")
    public ResponseEntity<Void> bookACar( @PathVariable long carId ,  @RequestBody BookACarDto bookACarDto){
        System.out.println(bookACarDto);
        boolean success= customerServices.bookACar(carId , bookACarDto);
       if(success) return ResponseEntity.status(HttpStatus.CREATED).build();
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }


    @GetMapping("/car/{carId}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long carId)
    {
        CarDto carDto = customerServices.getCarById(carId);
        if(carDto==null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(carDto);
    }

    @GetMapping("/car/booking/{userId}")
    public ResponseEntity<List<BookACarDto>> getbookingsByUserId(@PathVariable Long userId)
    {
        return ResponseEntity.ok(customerServices.getBookingByUserId(userId));
    }

    @PostMapping("/car/search")
    public ResponseEntity<?> serachCar(@RequestBody SearchCarDto searchCarDto) {
        return ResponseEntity.ok(customerServices.searchCars(searchCarDto));
    }



}
