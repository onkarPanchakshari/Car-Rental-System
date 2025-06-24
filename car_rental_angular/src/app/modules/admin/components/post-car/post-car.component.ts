import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-car',
  imports: [NgZorroImportsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {
      
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile:File |null | undefined;
  imagePreview: string | ArrayBuffer | null | undefined;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "Mercedes", "Audi", "Volkswagen", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai","KIA","TATA","MG","BYD","Volvo","Porsche","Lexus","Mazda","Subaru","Mitsubishi","Suzuki","Peugeot","Citroen","Renault","Fiat","Alfa Romeo","Jaguar","Land Rover","MAHINDRA","ISUZU","BYD"];
  listOfType = ["petrol", "diesel", "electric", "hybrid", "cng", "lpg", "hydrogen"];
  listOfColor = ["red", "blue", "green", "black", "white", "silver", "grey", "yellow", "orange", "purple","brown","gold","pink"];
  listOfTransmission = ["manual", "automatic", "semi-automatic", "cvt", "dual-clutch"];

  constructor(private fb: FormBuilder,
              private adminService: AdminService,
              private message: NzMessageService,
              private router: Router
  ){}

  ngOnInit(){
    this.postCarForm = this.fb.group({
      name :[ null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      prices: [null, [Validators.required, Validators.min(0)]],
      description: [null, Validators.required],
      year: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
  });
  }

  postCar(){
    console.log(this.postCarForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('brand',this.postCarForm.value.brand);
    formData.append('name', this.postCarForm.value.name);
    formData.append('type', this.postCarForm.value.type);
    formData.append('color', this.postCarForm.value.color);
    formData.append('transmission', this.postCarForm.value.transmission);
    formData.append('prices', this.postCarForm.value.prices);
    formData.append('description', this.postCarForm.value.description);
    formData.append('year', this.postCarForm.value.year);
    console.log(formData);
    this.adminService.postCar(formData).subscribe((res) => {
      this.isSpinning = false;
        this.message.success("Car posted successfully", { nzDuration: 5000 });
        console.log(res);
        this.router.navigateByUrl('/admin/dashboard');
      },error => {
        this.message.error("Error While Posting Car", { nzDuration: 5000 });
      });
      
    
    
  }


  onFileSelected(event:any){
    this.selectedFile = event?.target.files[0];
    this.previewImage();

  }
  previewImage() {
     const reader = new FileReader();
     reader.onload = () => {
      this.imagePreview = reader.result;
     }
     reader.readAsDataURL(this.selectedFile as File);
  }




}
