import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,NgZorroImportsModule,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any[] = [];

  constructor( private adminService:AdminService,
              private message:NzMessageService

  ) { }

  ngOnInit() {

    this.getAllCars();

  }

 getAllCars() {
  this.adminService.getAllCars().subscribe((res) => {
    console.log(res);
    res.forEach((Element: { processedImg: string; returnedImage: string; }) => {
      Element.processedImg = 'data:image/jpeg;base64,' + Element.returnedImage;
      this.cars.push(Element);
    });
  });
}

deleteCar(id:number){
  console.log(id);
  this.adminService.deleteCar(id).subscribe((res)=> {
    this.getAllCars();
    this.message.success("Car deleted successfully",{nzDuration : 5000});
  })

}

}
