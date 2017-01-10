import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CONFIG, USER_KEY } from '../shared/constants';

import { User } from '../shared/user';


@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    @Inject(CONFIG) private config) {
      console.log('Login URL: ', config);
  }

  login(loginId: string): Observable<User> {
    console.log('Login ID: ', loginId);
    this.storeLoginId(loginId);
    let loginQueryString = `${this.config.loginUrl}${loginId}`;
    console.log('Login query string: ', loginQueryString);
    return this.http.get(`${loginQueryString}`)
      .map((response: Response) => response.json())
      .catch(error => Observable.throw(error));
  }

  storeLoginId(loginId: string): void {
    localStorage.setItem(USER_KEY, loginId);
  }

  getLoginId() {
    return localStorage.getItem(USER_KEY);
  }
}
