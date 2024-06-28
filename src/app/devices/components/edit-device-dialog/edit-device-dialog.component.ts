import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { WateringDevice } from '../../watering-device';

@Component({
  selector: 'app-edit-device-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-device-dialog.component.html',
  styleUrl: './edit-device-dialog.component.scss'
})
export class EditDeviceDialogComponent {
  deviceForm: FormGroup;
  private deviceId: number;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EditDeviceDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: WateringDevice) {
    {
      this.deviceId = data.id;
      this.deviceForm = this.formBuilder.group({
        name: [data.name, Validators.required],
        description: [data.description],
        location: [data.location],
        notes: [data.notes],
        interval: [data.wateringInterval, Validators.required],
        duration: [data.wateringDuration, Validators.required]
      });
    }
  }

  onSubmit(): void {
    if (this.deviceForm.valid) {
      const formValues = this.deviceForm.value;
      const newDevice: WateringDevice = {
        id: this.deviceId,
        name: formValues.name,
        description: formValues.description,
        location: formValues.location,
        notes: '',
        active: true,
        deleted: false,
        soilHumidity: 0,
        lastWatering: new Date(),
        waterNow: false,
        wateringInterval: formValues.interval,
        wateringDuration: formValues.duration
      };
      this.dialogRef.close(newDevice);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
