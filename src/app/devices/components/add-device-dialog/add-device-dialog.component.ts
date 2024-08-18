import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ImagesService } from '../../../shared/services/images.service';

@Component({
  selector: 'app-add-device-dialog',
  standalone: true,
  imports: [   
    MatDialogModule,  
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule,
  ],
  templateUrl: './add-device-dialog.component.html',
  styleUrl: './add-device-dialog.component.scss'
})
export class AddDeviceDialogComponent {
  deviceForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<AddDeviceDialogComponent>,
    private imagesService: ImagesService
  ) {
    this.deviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      minimumSoilHumidity: [500, Validators.required],
      wateringIntervalSetting: ['300', Validators.required],
      wateringDurationSetting: ['3', Validators.required],
      deviceToken: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.deviceForm.valid) {
      const formValues = this.deviceForm.value;
      const formData = new FormData();
  
      formData.append('deviceToken', formValues.deviceToken);
      formData.append('name', formValues.name);
      formData.append('description', formValues.description);
      formData.append('location', formValues.location);
      formData.append('notes', "");
      formData.append('minimumSoilHumidity', formValues.minimumSoilHumidity);
      formData.append('wateringIntervalSetting', formValues.wateringIntervalSetting);
      formData.append('wateringDurationSetting', formValues.wateringDurationSetting);
  
      if (this.selectedFile) {
        try {          
          const resizedFile = await this.imagesService.resizeImage(this.selectedFile, 512, 512);
          formData.append('image', resizedFile, resizedFile.name);
        } catch (error) {
          throw new Error ("Error resizing image");
        }
      }
  
      this.dialogRef.close(formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
