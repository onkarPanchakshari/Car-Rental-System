package com.example.carrentingsystemSpringBootAppliction.services.customer;

import com.example.carrentingsystemSpringBootAppliction.dto.BookACarDto;
import com.example.carrentingsystemSpringBootAppliction.dto.CarDto;
import com.example.carrentingsystemSpringBootAppliction.dto.CarDtoListDto;
import com.example.carrentingsystemSpringBootAppliction.dto.SearchCarDto;

import java.util.List;

public interface CustomerServices {

    List<CarDto> getAllCars();

    boolean bookACar(Long carId ,BookACarDto bookACarDto);

    CarDto getCarById(Long carId);

    List<BookACarDto> getBookingByUserId(Long userId);

    CarDtoListDto searchCars(SearchCarDto searchCarDto);
}
