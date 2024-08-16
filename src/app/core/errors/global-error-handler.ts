import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor (private ErrorHandlerService: ErrorHandlerService) {}

  handleError(error: Error | HttpErrorResponse): void {
    this.ErrorHandlerService.handleError(error);
  }
}