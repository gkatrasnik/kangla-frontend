import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../core/notifications/notification.service';
import { AuthService } from '../../../core/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class RegistrationConfirmationComponent {
  resendConfirmationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.resendConfirmationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  resendConfirmationEmail(): void {
    if (this.resendConfirmationForm.valid) {
      const { email } = this.resendConfirmationForm.value;
      this.authService.resendConfirmationEmail(email).subscribe({
        next: () => {
          this.notificationService.showNonErrorSnackBar('Confirmation email resent.');
        },
        error: () => {
          this.notificationService.showClientError('Failed to resend confirmation email.');
        }
      });
    }
  }
}
