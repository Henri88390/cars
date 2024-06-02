import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import { Car } from '../models/cars';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('CarService', () => {
  let service: CarService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all cars', () => {
    const expectedCars: Car[] = [
      {
        id: 1,
        model: 'Peugeot test',
        price: 10000,
      },
    ];
    service.getAll().subscribe(cars => {
      expect(cars.data).toEqual(expectedCars);
    });

    const expectedUrl = 'http://localhost/api/list';
    const testRequest = httpTestingController.expectOne(expectedUrl);

    expect(testRequest.request.method).toEqual('GET');

    testRequest.flush(expectedCars);
  });
});
