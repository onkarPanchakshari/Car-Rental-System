package com.example.carrentingsystemSpringBootAppliction.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class CarDto {

    private Long Id;

    private String brand;

    private String color;

    private String name;

    private String type;

    private  String transmission;

    private  String description;

    private Long prices;

    private Date year;

    private MultipartFile image;

    private  byte[] returnedImage;
}
