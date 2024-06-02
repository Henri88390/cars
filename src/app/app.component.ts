import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FavoriteColorComponent } from './components/favorite-color-component/favorite-color-component.component';
import { CarsComponent } from './components/cars/cars.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FavoriteColorComponent, CarsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'my-app';
}
