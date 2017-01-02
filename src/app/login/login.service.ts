import { Observable } from 'rxjs';
import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { Http, Response } from '@angular/http';

import User from '../shared/user';
export const LOGIN_URL = new OpaqueToken('LoginUrl');


@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    @Inject(LOGIN_URL) private loginUrl) {
      console.log('Login URL: ', loginUrl);
  }

  public login(username: string): Observable<User> {
    console.log('Login username: ', username);
    let loginQueryString = `${this.loginUrl}${username}`;
    console.log('Login query string: ', loginQueryString);
    return this.http.get(`${loginQueryString}`)
      .map((response: Response) => response.json())
      .catch(error => Observable.throw(error));
  }
}
