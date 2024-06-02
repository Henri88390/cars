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
  })  
  
  ngOnInit() {
    this.getCars();
  } 

  async insertCar() { 
    this.carService.insert({model: this.carForm.value.model || '', price: this.carForm.value.price || 0})
      .subscribe(response => this.carsArray.push(response))
  }

  deleteCar(idCar: number) {
    this.carService.delete(idCar).subscribe(response => {if(response.code === 200) {
      this.carsArray = this.carsArray.filter(car => car.id !== idCar)
      }
    }) 
  }
  
  getCars(): void {
    this.carService.getAll().subscribe(response => {
      if(response.data) {
        this.carsArray = response.data;
      }
    }
    );
  }
}
