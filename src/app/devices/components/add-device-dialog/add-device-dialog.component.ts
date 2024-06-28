import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { WateringDevice } from '../../watering-device';

@Component({
  selector: 'app-add-device-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './add-device-dialog.component.html',
  styleUrl: './add-device-dialog.component.scss'
})
export class AddDeviceDialogComponent {
  deviceForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddDeviceDialogComponent>) {
    this.deviceForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      location: [''],
      interval: ['300', Validators.required],
      duration: ['3', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.deviceForm.valid) {
      const formValues = this.deviceForm.value;
      const newDevice: WateringDevice = {
        id: formValues.id,
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
