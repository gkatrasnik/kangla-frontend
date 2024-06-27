import { Component, inject } from '@angular/core';
import { WateringDeviceService } from '../../watering-device.service';
import { ActivatedRoute } from '@angular/router';
import { WateringDevice } from '../../watering-device';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  wateringDeviceService: WateringDeviceService = inject(WateringDeviceService);

  wateringDeviceId = -1;
  wateringDevice: WateringDevice | undefined;
  constructor() {
    this.wateringDeviceId = Number(this.route.snapshot.params['id']);
    this.wateringDevice = this.wateringDeviceService.getWateringDeviceById(this.wateringDeviceId);
  }
}
