import { Component, Inject, inject  } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { WateringDeviceCardComponent } from '../../components/watering-device-card/watering-device-card.component';
import { WateringDeviceService } from '../../watering-device.service';
import { WateringDevice } from '../../watering-device';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    WateringDeviceCardComponent,
    MatButtonModule, 
    NgFor,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  wateringDeviceService: WateringDeviceService = inject(WateringDeviceService);

  constructor() { 
    this.wateringDevicesList = this.wateringDeviceService.getAllWateringDevices();
  }

  wateringDevicesList: WateringDevice[] = [];
  openDialog() {
    alert('open dialog');
  }
}
