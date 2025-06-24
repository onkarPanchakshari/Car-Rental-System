import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { CommonModule } from '@angular/common';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-booking',
  imports: [NgZorroImportsModule,CommonModule ],
  templateUrl: './get-booking.component.html',
  styleUrl: './get-booking.component.scss'
})
export class GetBookingComponent {

  isSpinning = false;
   bookings: any;
  // bookedCars: readonly any[] | undefined;

  constructor(private adminService:AdminService,
    private message : NzMessageService
  ){
    this.getBookings();
  }

  getBookings()
  {
    this.adminService.getCarBookings().subscribe((res)=>{
      console.log(res);
      this.bookings=res;
    })
  }

  changeBookingStatus(bookingId: number, status: string)
  {
    this.isSpinning = true;
    console.log(bookingId, status);
    this.adminService.changeBookingStatus(bookingId, status).subscribe((res) =>
    { 
      this.isSpinning = false;
      console.log(res);
      this.getBookings();
      this.message.success("Booking status change successfully",{nzDuration:5000});
    } , error => {
        this.message.error("Something Went Wrong",{nzDuration:5000});
    }
  )
  }
}
