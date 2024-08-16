import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService) {}

  handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error instanceof HttpErrorResponse) {
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
      this.notificationService.showServerError('Error', errorMessage);
    } else {
      errorMessage = `Client Error: ${error.message}`;
      this.notificationService.showClientError(errorMessage);
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
