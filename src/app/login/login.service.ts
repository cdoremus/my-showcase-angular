import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

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
    console.log('Login url: ', this.loginUrl);
    return http.get(`${this.loginUrl}/${username}`)
      .map((response: Response) => response.json())
      .catch(error => Observable.throw(error));
  }
}
