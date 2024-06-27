import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';

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
      name: ['', Validators.required],
      id: ['', Validators.required],
      interval: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.deviceForm.valid) {
      this.dialogRef.close(this.deviceForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
