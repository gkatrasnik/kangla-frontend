import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from './auth-service.service'
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
// protects routes from unauthenticated users
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.isSignedIn();
  }

  isSignedIn(): Observable<boolean> {
    return this.authService.isSignedIn().pipe(
      map((isSignedIn) => {
        if (!isSignedIn) {
          // redirect to signin page
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }));
  }
}