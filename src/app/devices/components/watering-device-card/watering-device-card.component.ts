import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WateringDevice } from '../../watering-device';

@Component({
  selector: 'app-watering-device-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './watering-device-card.component.html',
  styleUrl: './watering-device-card.component.scss'
})
export class WateringDeviceCardComponent {
  @Input() wateringDevice!: WateringDevice;

  triggerWatering() {
    alert("watering now!")
  }
}
