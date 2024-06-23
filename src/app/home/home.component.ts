import { Component } from '@angular/core';
import { PlantCardComponent } from '../plant-card/plant-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ PlantCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
