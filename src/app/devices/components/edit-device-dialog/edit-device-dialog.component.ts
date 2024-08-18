import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { WateringDevice } from '../../watering-device';
import { ImageService } from '../../../shared/services/image.service';

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
  originalDevice: WateringDevice;
  formChanged: boolean = false;
  selectedFile: File | null = null;
  imageBase64: string | undefined | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<EditDeviceDialogComponent>,
    private imageService: ImageService, 
    @Inject (MAT_DIALOG_DATA) public data: WateringDevice) 
    {
      this.deviceId = data.id;
      this.originalDevice = { ...data }
      this.imageBase64 = data.imageBase64;
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
        this.formChanged = !this.formsAreIdentical(this.originalDevice, this.deviceForm.value) || this.selectedFile !== null;
      });
  }

  async onSubmit(): Promise<void> {
    if (this.deviceForm.valid) {
      const formValues = this.deviceForm.value;     
      const formData = new FormData();
  
      formData.append('name', formValues.name);
      formData.append('description', formValues.description);
      formData.append('location', formValues.location);
      formData.append('notes', "");
      formData.append('waterNow', "false");
      formData.append('minimumSoilHumidity', formValues.minimumSoilHumidity);
      formData.append('wateringIntervalSetting', formValues.wateringIntervalSetting);
      formData.append('wateringDurationSetting', formValues.wateringDurationSetting);
  
      if (this.selectedFile) {
        try {          
          const resizedFile = await this.imageService.resizeImage(this.selectedFile, 512, 512);
          formData.append('image', resizedFile, resizedFile.name);
        } catch (error) {
          throw new Error ("Error resizing image");
        }
      } else if (!this.imageBase64 && this.originalDevice.imageBase64) {
        formData.append('removeImage', 'true');
      }

      this.dialogRef.close(formData);
    }    
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageBase64 = null;
      this.formChanged = true;
    }
  }

  onRemoveImage(): void {
    this.imageBase64 = null;
    this.selectedFile = null;
    this.formChanged = true;
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
