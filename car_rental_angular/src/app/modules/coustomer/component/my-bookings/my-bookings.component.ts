import { Component } from '@angular/core';
import { CoustomerService } from '../../service/coustomer.service';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  imports: [NgZorroImportsModule,CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  isSpinning = false;
  bookings: any;
//  bookedCars: readonly any[] | undefined;
  
  constructor(private service:CoustomerService){
    this.getMyBooking();
  }

   getMyBooking()
   {
    // this.isSpinning = true;
    this.service.getbookingsByUserId().subscribe((res)=>{
      this.isSpinning = false;
      console.log(res);
      this.bookings = res;
    })
   }
}
