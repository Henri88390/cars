import { Component } from '@angular/core';
import { Car } from '../../models/cars';
import { CarService } from '../../services/car.service';
import { map } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.sass'
})
export class CarsComponent { 
  error = '';
  success = '';
  carsArray = [] as Car[];
  constructor(private carService: CarService, private formBuilder: FormBuilder) {}
        
  carForm = this.formBuilder.group({
    model: ['', Validators.required],
    price: [null,  Validators.min(1)],
    cars: this.formBuilder.array([this.formBuilder.group({
      id: [null as number | null],
      model: [''],
      price: [null as number | null]})
    ]),
  })  
  
  ngOnInit() {
    this.getCars();
  }

  get cars() {
    return this.carForm.get('cars') as FormArray;
  }

  insertCar() { 
    this.carService.insert({model: this.carForm.value.model || '', price: this.carForm.value.price || 0})
  }

  deleteCar(idCar: number) {
    this.carService.delete(idCar)
  }
  
  getCars(): void {
    this.carService.getAll().subscribe(
      (data: Car[]) => { 
        this.carsArray = data;
        data.map(({id, model,price}) =>
          {
            this.carForm.value.cars?.push({id, model,price})
          }
        )
        this.success = 'successful retrieval of the list';
      },
      (err) => {
        console.log(err);
        this.error = err.message;
      }
    );
  }
}
