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
  templateUrl: './add-plant-dialog.component.html',
  styleUrl: './add-plant-dialog.component.scss'
})
export class AddPlantDialogComponent {
  plantForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<AddPlantDialogComponent>,
    private imagesService: ImagesService
  ) {
    this.plantForm = this.formBuilder.group({
      name: ['', 
        [Validators.required, Validators.maxLength(30)]
      ],
      scientificName: [
        '', 
        [Validators.maxLength(50)]
      ],
      description: [
        '', 
        [Validators.maxLength(100)]
      ],
      location: [
        '', 
        [Validators.maxLength(100)]
      ],
      notes: [
        '', 
        [Validators.maxLength(500)]
      ],
      wateringInterval: [
        '', 
        [Validators.required, Validators.min(1), Validators.max(365)]
      ],
      wateringInstructions: [
        '', 
        [Validators.maxLength(500)]
      ],
      wateringDeviceId: [null],
      image: [null]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.plantForm.valid) {
      const formValues = this.plantForm.value;
      const formData = new FormData();
  
      formData.append('name', formValues.name);
      formData.append('scientificName', formValues.scientificName || '');
      formData.append('description', formValues.description || '');
      formData.append('location', formValues.location || '');
      formData.append('notes', formValues.notes || '');
      formData.append('wateringInterval', formValues.wateringInterval);
      formData.append('wateringInstructions', formValues.wateringInstructions || '');
      formData.append('wateringDeviceId', formValues.wateringDeviceId);
  
      if (this.selectedFile) {
        try {
          const resizedFile = await this.imagesService.resizeImage(this.selectedFile, 512, 512);
          formData.append('image', resizedFile, resizedFile.name);
        } catch (error) {
          console.error("Error resizing image:", error);
          return; 
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
