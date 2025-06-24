import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = ["http://localhost:8080"];
@Injectable({
  providedIn: 'root'
})
export class CoustomerService {

  constructor(private http:HttpClient) { }

    getAllCars(): Observable<any> {
      return this.http.get(BASE_URL+"/api/customer/cars",{
        headers:this.createAuthorizationHeader()
      });
    }

      getAllCarById(carId : number): Observable<any> {
      return this.http.get(BASE_URL+"/api/customer/car/"+carId,{
        headers:this.createAuthorizationHeader()
      });
    }

     bookACar(carId:number,bookACarDto : any): Observable<any> {
      return this.http.post<[]>(BASE_URL + `/api/customer/car/book/${carId}`, bookACarDto, {
        headers:this.createAuthorizationHeader()
      });
    }

     getbookingsByUserId(): Observable<any> {
      return this.http.get(BASE_URL+"/api/customer/car/booking/"+ StorageService.getUserId(),{
        headers:this.createAuthorizationHeader()
      });
    }

     searchCar(searchCarDto:any): Observable<any> {
        return this.http.post(BASE_URL+"/api/customer/car/search",searchCarDto,{
          headers:this.createAuthorizationHeader()
        });
      }

    createAuthorizationHeader(): HttpHeaders {
      let authHeaders: HttpHeaders = new HttpHeaders();
      authHeaders = authHeaders.set(
        'Authorization',
        'Bearer ' + StorageService.getToken()
      )
      return authHeaders;
    }
}
