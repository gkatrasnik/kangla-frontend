import { Component, inject } from '@angular/core';
import { WateringDeviceService } from '../../watering-device.service';
import { ActivatedRoute } from '@angular/router';
import { WateringDevice } from '../../watering-device';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditDeviceDialogComponent } from '../../components/edit-device-dialog/edit-device-dialog.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  wateringDeviceService: WateringDeviceService = inject(WateringDeviceService);

  wateringDeviceId = -1;
  wateringDevice: WateringDevice | undefined;
  constructor(private router: Router, private location: Location, public dialog: MatDialog) {
    this.wateringDeviceId = Number(this.route.snapshot.params['id']);
    this.wateringDevice = this.wateringDeviceService.getWateringDeviceById(this.wateringDeviceId);
  }

  removeDevice() {
    this.wateringDeviceService.removeWateringDevice(this.wateringDeviceId);
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  editDevice(): void {
    const dialogRef = this.dialog.open(EditDeviceDialogComponent, {
      width: '400px',
      data: this.wateringDevice
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Device updated:', result);        
        this.wateringDeviceService.updateWateringDevice(result);
        this.getUpdatedDevice();
      }
    });
  }
  
  private getUpdatedDevice(): void {
    this.wateringDevice = this.wateringDeviceService.getWateringDeviceById(this.wateringDeviceId);
  }

  goBack() {
    this.location.back();
  }

}
