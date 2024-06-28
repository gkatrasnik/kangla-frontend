import { Component, Inject, inject  } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { WateringDeviceCardComponent } from '../../components/watering-device-card/watering-device-card.component';
import { WateringDeviceService } from '../../watering-device.service';
import { WateringDevice } from '../../watering-device';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceDialogComponent } from '../../components/add-device-dialog/add-device-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    WateringDeviceCardComponent,
    MatButtonModule,    
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  wateringDeviceService: WateringDeviceService = inject(WateringDeviceService);

  constructor(public dialog: MatDialog) { 
    this.wateringDevicesList = this.wateringDeviceService.getAllWateringDevices();
  }

  wateringDevicesList: WateringDevice[] = [];

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDeviceDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Device added:', result);        
        this.wateringDeviceService.addWateringDevice(result);
      }
    });
  }
}
