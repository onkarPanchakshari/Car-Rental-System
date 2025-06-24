import { Component } from '@angular/core';
import { CoustomerService } from '../../service/coustomer.service';
import { CommonModule } from '@angular/common';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coustomer-dashboard',
  imports: [CommonModule,NgZorroImportsModule,RouterLink],
  templateUrl: './coustomer-dashboard.component.html',
  styleUrl: './coustomer-dashboard.component.scss'
})
export class CoustomerDashboardComponent {

    cars: any[] = [];

  constructor(private service : CoustomerService){ }

  ngOnInit() {

    this.getAllCars();

  }

 getAllCars() {
  this.service.getAllCars().subscribe((res) => {
    console.log(res);
    res.forEach((Element: { processedImg: string; returnedImage: string; }) => {
      Element.processedImg = 'data:image/jpeg;base64,' + Element.returnedImage;
      this.cars.push(Element);
    });
  });
}
}
