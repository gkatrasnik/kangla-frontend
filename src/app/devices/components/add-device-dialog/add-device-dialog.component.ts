import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { WateringDeviceCreateRequestDto } from '../../dto/watering-device-create-request-dto';

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
      const newDevice: WateringDeviceCreateRequestDto = {
        name: formValues.name,
        description: formValues.description,
        location: formValues.location,
        notes: '',
        minimumSoilHumidity: 750,
        wateringIntervalSetting: formValues.interval,
        wateringDurationSetting: formValues.duration,
        deviceToken:'testToken'
      };
      this.dialogRef.close(newDevice);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
