import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInfoDto } from "../../auth/user-info-dto";
import { BehaviorSubject, Observable, Subject, catchError, map, of, tap, throwError } from "rxjs";
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);

  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }

  //To login with cookies: /login?useCookies=true
  //At the moment we use Bearer token authentication
  public login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/login`, { 
      email: email,
      password: password
    }, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((res: HttpResponse<string>) => {
        if (res.body) {
          const responseBody = JSON.parse(res.body);
          localStorage.setItem('accessToken', responseBody.accessToken);
          localStorage.setItem('refreshToken', responseBody.refreshToken);
        }
        this._authStateChanged.next(res.ok);
        return res.ok;
      })
    );
  }

  public register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      email: email,
      password: password
    }, {
      observe: 'response',
      responseType: 'text'
    })
      .pipe(
        map((res: HttpResponse<string>) => {
        return res.ok;
      })
    );
  }

  public logout() {
    /*
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    }).pipe<boolean>(map((res: HttpResponse<string>) => {
      if (res.ok) {
        this._authStateChanged.next(false);
      }
      return res.ok;
    }));
    */ 
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');   
  }

  // check if the user is authenticated. the endpoint is protected so 401 if not.
  public user() {
    return this.http.get<UserInfoDto>(`${this.apiUrl}/manage/info`).pipe(
      map((userInfo: UserInfoDto) => {
        return userInfo;
      }),
      catchError((_: HttpErrorResponse, __: Observable<UserInfoDto>) => {
        return of({} as UserInfoDto);
      }));
  }

  // is signed in when the call completes without error and the user has an email
  public isSignedIn(): Observable<boolean> {
    return this.user().pipe(
      map((userInfo) => {
        const valid = !!(userInfo && userInfo.email && userInfo.email.length > 0);
        return valid;
      }),
      catchError((_) => {
        return of(false);
      }));
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token found'));
    }
    
    return this.http.post<any>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
      })
    );
  }

  public resendConfirmationEmail(email: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/resendConfirmationEmail`, { email }, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((res: HttpResponse<string>) => {
        return res.ok;
      })
    );
  }

  public forgotPassword(email: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/forgotPassword`, { email }, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((res: HttpResponse<string>) => {
        return res.ok;
      })
    );
  }

  public resetPassword(email: string, resetCode: string, newPassword: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/resetPassword`, {
      email: email,
      resetCode: resetCode,
      newPassword: newPassword
    }, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((res: HttpResponse<string>) => {
        return res.ok;
      })      
    );
  }
}