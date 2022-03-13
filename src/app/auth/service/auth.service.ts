import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  backendAuthURI = environment.backendURL + '/auth';

  constructor(private httpClient: HttpClient) {
  }

  public login(request: User): Observable<User> {
    console.log(request);
    return this.httpClient.post<User>(this.backendAuthURI + '/login', request);
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
