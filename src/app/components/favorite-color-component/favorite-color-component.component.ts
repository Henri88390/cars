import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-favorite-color-component',
  templateUrl: './favorite-color-component.component.html',
  imports: [ReactiveFormsModule, NgFor, NgIf],
})
export class FavoriteColorComponent {
  constructor(private formBuilder: FormBuilder) {}
  profileForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(5)]],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')]),
  });

  deleteAlias(indexAlias: number) {
    this.aliases.removeAt(indexAlias);
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }
}
