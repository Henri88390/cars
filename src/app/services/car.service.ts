import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Car } from '../models/cars';
import { Observable } from 'rxjs';

type DeleteResponse = {
  code: number;
};

type ListResponse = {
  data?: Car[];
  error?: number;
};

@Injectable({
  providedIn: 'root',
})
export class CarService {
  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ListResponse> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  delete(idCar: number): Observable<DeleteResponse> {
    const params = new HttpParams().set('id', idCar.toString());

    return this.http.delete<DeleteResponse>(`${this.baseUrl}/delete`, {
      params: params,
    });
  }

  insert({ model, price }: Car): Observable<Car> {
    return this.http.post<Car>(`${this.baseUrl}/insert`, {
      data: { model, price },
    });
  }
}
