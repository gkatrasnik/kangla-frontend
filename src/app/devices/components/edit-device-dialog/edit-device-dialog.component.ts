import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { WateringDevice } from '../../watering-device';
import { WateringDeviceUpdateRequestDto } from '../../dto/watering-device-update-request-dto';

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
  private originalDevice: WateringDevice;
  formChanged: boolean = false;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EditDeviceDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: WateringDevice) {
      this.deviceId = data.id;
      this.originalDevice = { ...data }
      this.deviceForm = this.formBuilder.group({
        name: [data.name, Validators.required],
        description: [data.description],
        location: [data.location],
        notes: [data.notes],
        minimumSoilHumidity: [data.minimumSoilHumidity, Validators.required],
        wateringIntervalSetting: [data.wateringIntervalSetting, Validators.required],
        wateringDurationSetting: [data.wateringDurationSetting, Validators.required]
      });

      this.deviceForm.valueChanges.subscribe(() => {
        this.formChanged = !this.formsAreIdentical(this.originalDevice, this.deviceForm.value);
      });
  }

  onSubmit(): void {
    if (this.deviceForm.valid) {
      const formValues = this.deviceForm.value;
      const newDevice: WateringDeviceUpdateRequestDto = {
        name: formValues.name,
        description: formValues.description,
        location: formValues.location,
        notes: formValues.notes,
        waterNow: false,
        minimumSoilHumidity: formValues.minimumSoilHumidity,
        wateringIntervalSetting: formValues.wateringIntervalSetting,
        wateringDurationSetting: formValues.wateringDurationSetting
      };
      this.dialogRef.close(newDevice);
    }    
  }

  private formsAreIdentical(original: WateringDevice, current: any): boolean {
    return (
      original.name === current.name &&
      original.description === current.description &&
      original.location === current.location &&
      original.notes === current.notes &&
      original.wateringIntervalSetting === current.interval &&
      original.wateringDurationSetting === current.duration
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
