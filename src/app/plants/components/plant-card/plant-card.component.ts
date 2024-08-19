import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Plant } from '../../plant';
import { ImageSrcDirective } from '../../../core/directives/httpsrc.directive';

@Component({
  selector: 'app-watering-device-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink, ImageSrcDirective],
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.scss'
})
export class PlantCardComponent {
  @Input() plant!: Plant;
  @Input() imageUrl!: string | undefined;

  triggerWatering() {
    alert("watering now!")
  }
}
