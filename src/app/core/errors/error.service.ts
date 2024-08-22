import { Injectable } from '@angular/core';
import { AuthErrorResponse } from './auth-error-response';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() {}
    
    parseErrorResponse(error: any): { title: string; errors: string[] } {
      let title = 'An error occurred';
      let errors: string[] = [];
  
      if (error && error.error) {
        try {
          const errorResponse: AuthErrorResponse = JSON.parse(error.error);  
          title = errorResponse.title || title;  
          if (errorResponse.errors) {
            errors = Object.values(errorResponse.errors).flat();
          }
          if (errorResponse.detail) {
            errors.unshift(errorResponse.detail);
          }
        } catch (e) {
          console.error('Failed to parse error response', e);
        }
      }
  
      return { title, errors };
    }
}
