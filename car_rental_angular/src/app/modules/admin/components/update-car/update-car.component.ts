import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-update-car',
  imports: [NgZorroImportsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  isSpinning =false;
  carId: number;
  imgChanged:boolean =false;
  selectedFile:any;
  imagePreview:string | ArrayBuffer | null | undefined;
  existingImage:String | null = null;
  updateForm! :FormGroup;
   listOfBrands = ["BMW", "Mercedes", "Audi", "Volkswagen", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai","KIA","TATA","MG","BYD","Volvo","Porsche","Lexus","Mazda","Subaru","Mitsubishi","Suzuki","Peugeot","Citroen","Renault","Fiat","Alfa Romeo","Jaguar","Land Rover","MAHINDRA","ISUZU","BYD"];
  listOfType = ["petrol", "diesel", "electric", "hybrid", "cng", "lpg", "hydrogen"];
  listOfColor = ["red", "blue", "green", "black", "white", "silver", "grey", "yellow", "orange", "purple","brown","gold","pink"];
  listOfTransmission = ["manual", "automatic", "semi-automatic", "cvt", "dual-clutch"];


  constructor(
    private adminService: AdminService,
    private activatedRout: ActivatedRoute,
    private fb:FormBuilder,
    private message: NzMessageService,
    private router : Router
   
  ) {
    this.carId = this.activatedRout.snapshot.params['id'];
  }

  ngOnInit(){
    this.updateForm=this.fb.group({
      name :[ null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      prices: [null, [Validators.required, Validators.min(0)]],
      description: [null, Validators.required],
      year: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
    });
      this.getCarById();
  }

  getCarById(){
    this.isSpinning=true;
    this.adminService.getCarById(this.carId).subscribe((res)=>
    {
      // console.log(res);
      this.isSpinning=false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' +res.returnedImage;
      // console.log(this.existingImage)
      this.updateForm.patchValue(carDto);
    })
  }

  updateCar(){
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile){
      formData.append('image',this.selectedFile);
    }

    formData.append('brand',this.updateForm.value.brand);
    formData.append('name', this.updateForm.value.name);
    formData.append('type', this.updateForm.value.type);
    formData.append('color', this.updateForm.value.color);
    formData.append('transmission', this.updateForm.value.transmission);
    formData.append('prices', this.updateForm.value.prices);
    formData.append('description', this.updateForm.value.description);
    formData.append('year', this.updateForm.value.year);
    console.log(formData);
    this.adminService.updateCar(this.carId,formData).subscribe((res) => {
      this.isSpinning = false;
        this.message.success("Car update successfully", { nzDuration: 5000 });
        console.log(res);
        this.router.navigateByUrl('/admin/dashboard');
      },error => {
        this.message.error("Error While Updating Car", { nzDuration: 5000 });
      });
      
  }


  onFileSelected(event:any){
    this.selectedFile= event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
       this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  submitFrom(){

  }

}
