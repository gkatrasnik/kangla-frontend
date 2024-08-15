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
import { ConfirmDialogComponent } from  '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../shared/interfaces/confirm-dialog-data';

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
  }

  ngOnInit(): void {
    this.loadDevice();
  }

  loadDevice(): void {
    this.wateringDeviceService.getWateringDeviceById(this.wateringDeviceId).subscribe((data: WateringDevice) => {
      this.wateringDevice = data;
    });
  }

  removeDevice(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Remove Device',
        message: 'Are you sure you want to remove this device?'
      } as ConfirmDialogData
    });         

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Device removed:', result);
        this.wateringDeviceService.removeWateringDevice(this.wateringDeviceId).subscribe(() => {
          this.router.navigate(['/home'], { replaceUrl: true });          
        });        
      }
    });
  }

  editDevice(): void {
    const dialogRef = this.dialog.open(EditDeviceDialogComponent, {
      width: '400px',
      data: this.wateringDevice
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.wateringDeviceService.updateWateringDevice(this.wateringDeviceId, result).subscribe((updatedDevice: WateringDevice) => {
          this.wateringDevice = updatedDevice;
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
