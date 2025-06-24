package com.example.carrentingsystemSpringBootAppliction.services.admin;

import com.example.carrentingsystemSpringBootAppliction.dto.BookACarDto;
import com.example.carrentingsystemSpringBootAppliction.dto.CarDto;
import com.example.carrentingsystemSpringBootAppliction.dto.CarDtoListDto;
import com.example.carrentingsystemSpringBootAppliction.dto.SearchCarDto;

import java.io.IOException;
import java.util.List;


public interface AdminService {

    boolean postCar(CarDto carDto) throws IOException;

    List<CarDto> getAllCars();

    void deleteCar(Long id);

    CarDto getCarById(Long id);

    boolean updateCar(Long id,CarDto carDto) throws IOException;

    List<BookACarDto> getbookings();

    boolean changeBookingStatus(Long bookingId, String status);

    CarDtoListDto searchCars(SearchCarDto searchCarDto);
}
