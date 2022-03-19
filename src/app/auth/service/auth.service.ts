import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentUser = new BehaviorSubject<User>(null);
  isLoggedIn = false;

  backendAuthURI = environment.backendURL + '/auth';

  constructor(private httpClient: HttpClient) {
  }

  public login(request: User): Observable<User> {
    console.log(request);
    return this.httpClient.post<User>(this.backendAuthURI + '/login', request);
  }

  public register(request: User): Observable<any> {
    return this.httpClient.put<any>(this.backendAuthURI + '/register', request);
  }

  public activateAccount(request: string): Observable<boolean> {
    return this.httpClient.post<boolean>(this.backendAuthURI + '/activate-account', request);
  }

  public sendResetPasswordEmail(request: string): Observable<boolean> {
    return this.httpClient.post<boolean>(this.backendAuthURI + '/send-reset-password-email', request);
  }

  public updatePassword(request: string, token: string): Observable<boolean> {
    const tokenParam = new HttpParams().set('token', token);
    return this.httpClient.post<boolean>(this.backendAuthURI + '/update-password', request, {params: tokenParam});
  }

  public resendActivateEmail(request: string): Observable<any> {
    return this.httpClient.post<any>(this.backendAuthURI + '/resend-activate-email', request);
  }


}

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Array<Role>;
}

export class Role {
  name: string;
}
