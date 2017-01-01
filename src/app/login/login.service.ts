import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { Http } from '@angular/http';

export const LOGIN_URL = new OpaqueToken('LoginUrl');

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    @Inject(LOGIN_URL) private loginUrl) {
      console.log('Login URL: ', loginUrl);
  }

  public login(username: string): any {
    console.log('Login username: ', username);
    let loginQueryString = `${this.loginUrl}${username}`;
    console.log('Login query string: ', loginQueryString);
    return this.http.get(`${loginQueryString}`);
  }
}
