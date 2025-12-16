import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const BASE_URL = ["https://car-rental-system.onrender.com"];

@Injectable({
  providedIn: 'root'
})
export class AuthProductionService {

  constructor(private http:HttpClient ) { }

  register(signupRequest: any):Observable<any> {
    return this.http.post(`${BASE_URL}/api/auth/signup`, signupRequest);

  }

  login(loginRequest:any): Observable<any>{
    return this.http.post(`${BASE_URL}/api/auth/login`, loginRequest);
  }
}
