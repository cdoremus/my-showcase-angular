import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CONFIG } from '../shared/tokens';

import User from '../shared/user';


@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    @Inject(CONFIG) private config) {
      console.log('Login URL: ', config);
  }

  public login(username: string): Observable<User> {
    console.log('Login username: ', username);
    let loginQueryString = `${this.config.loginUrl}${username}`;
    console.log('Login query string: ', loginQueryString);
    return this.http.get(`${loginQueryString}`)
      .map((response: Response) => response.json())
      .catch(error => Observable.throw(error));
  }
}
