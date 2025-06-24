package com.example.carrentingsystemSpringBootAppliction.entity;

import com.example.carrentingsystemSpringBootAppliction.dto.CarDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String brand;

    private String color;

    private String name;

    private String type;

    private  String transmission;

    private  String description;

    private Long prices;

    private Date year;

    @Column(columnDefinition = "bytea")
    private byte[] image;

    public CarDto getCarDto() {
        CarDto carDto = new CarDto();
        carDto.setId(Id);
        carDto.setBrand(brand);
        carDto.setColor(color);
        carDto.setName(name);
        carDto.setType(type);
        carDto.setTransmission(transmission);
        carDto.setDescription(description);
        carDto.setPrices(prices);
        carDto.setYear(year);
        carDto.setReturnedImage(image);
        return carDto;

    }

}
