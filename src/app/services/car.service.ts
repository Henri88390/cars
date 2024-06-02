import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Car } from '../models/cars';

@Injectable({
  providedIn: 'root', 
}) 
export class CarService {
  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  delete(idCar: number) {
    const params = new HttpParams()
    .set('id', idCar.toString());
    
    return this.http.delete(`${this.baseUrl}/delete`, { params: params }).subscribe(data => {return data})
  }

  insert({model, price}: Car) {
    return this.http.post(`${this.baseUrl}/insert`, {data: {model, price}}).subscribe({  next: data => {
     return data
  },
  error: error => {
      
      console.error('There was an error!', error);
  }
  })
  }
}