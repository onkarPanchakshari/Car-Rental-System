import { Component } from '@angular/core';
import { CoustomerService } from '../../service/coustomer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-car',
  imports: [NgZorroImportsModule,CommonModule],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {

  cars: any[] = [];
  isSpinning =false;
  searchCarFrom! : FormGroup;
  listOfBrands = ["BMW", "Mercedes", "Audi", "Volkswagen", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai","KIA","TATA","MG","BYD","Volvo","Porsche","Lexus","Mazda","Subaru","Mitsubishi","Suzuki","Peugeot","Citroen","Renault","Fiat","Alfa Romeo","Jaguar","Land Rover","MAHINDRA","ISUZU","BYD"];
  listOfType = ["petrol", "diesel", "electric", "hybrid", "cng", "lpg", "hydrogen"];
  listOfColor = ["red", "blue", "green", "black", "white", "silver", "grey", "yellow", "orange", "purple","brown","gold","pink"];
  listOfTransmission = ["manual", "automatic", "semi-automatic", "cvt", "dual-clutch"];

  constructor(private fb: FormBuilder,
              private CoustomerService : CoustomerService,
              private message : NzMessageService
  ){

    this.searchCarFrom = this.fb.group({
      brand:[null],
      type:[null],
      transmission:[null],
      color:[null],
    })
  }

  searchCar()
  {
    this.isSpinning=true;
    this.CoustomerService.searchCar(this.searchCarFrom.value).subscribe((res)=>{
    
        res.carDtoList.forEach((Element: { processedImg: string; returnedImage: string; }) => {
      Element.processedImg = 'data:image/jpeg;base64,' + Element.returnedImage;
      this.cars.push(Element);
    });
      this.isSpinning=false;
    })
  }
}
