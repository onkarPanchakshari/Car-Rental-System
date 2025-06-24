import { Component } from '@angular/core';
import { CoustomerService } from '../../service/coustomer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-book-car',
  imports: [CommonModule,NgZorroImportsModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

    carId: number;
    car:any;
    processedImage:any;
    ValidateForm! : FormGroup;
    isSpinning = false;
    dateFormat!: "DD-MM-YYYY";

   constructor(
    private service : CoustomerService,
    private activatedRoute: ActivatedRoute,
    private fb : FormBuilder, 
    private message :NzMessageService,
    private router: Router
   ){ 
      this.carId = this.activatedRoute.snapshot.params["id"];
   }


   ngOnInit()
   {
      
      this.ValidateForm =this.fb.group({
         toDate: [null,Validators.required],
         fromDate: [null,Validators.required]

      })
      this.getCarById();
   }

   getCarById()
   {
      this.service.getAllCarById(this.carId).subscribe((res) => {
        console.log(res);
        this.processedImage ='data:image/jpeg;base64,' + res.returnedImage;
        this.car=res;
      })

   }

   bookACar(data:any){
      console.log(data);
      this.isSpinning=true;
      let bookACarDto ={
          fromDate: data.fromDate ? new Date(data.fromDate).toISOString() : null,
           toDate: data.toDate ? new Date(data.toDate).toISOString() : null, 
         userId : StorageService.getUserId(),
         carId : this.carId
      }
      
      this.service.bookACar(this.carId,bookACarDto).subscribe((res)=>{
         console.log(bookACarDto);
         console.log(res);
         this.message.success("Booking request submitted successfully",{ nzDuration:5000});
         this.router.navigateByUrl("/customer/dashboard");
      }, error => {
         this.message.error("Somthing went wrong", {nzDuration:5000})
      })
   }



}
