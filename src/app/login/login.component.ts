import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import User from '../shared/user';

@Component({
  selector: 'my-login',
  // templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
   template: `
    <div>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm)" >
        <legend>
        <fieldset>
          <label for="loginUsername">User Name:</label>
          <input id=loginUsername #username type="text" placeholder="Enter user name" formControlName= "username" />
          <div class="error" *ngIf="loginClicked && loginForm.controls.username.errors">
            Please enter the user name
          </div>
        </fieldset>
        <input type="submit" value="Login" (click)="onClickLogin()" />
        </legend>
      </form>
    </div>
    <pre>
      {{user | json}}
    </pre>
   `
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private loginClicked: boolean;
  private user: User;

  constructor(fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = fb.group({
      'username': ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    console.log('Hello Login', this.loginForm);
    this.loginClicked = false;
  }

  public onSubmit(form: FormGroup): void {
    console.log('LoginComponent.onSubmit form param:', form);
    let username: string = form.value.username;
    this.loginService.login(username)
      .subscribe(
        response => {
          console.log('Login service response', response);
          this.user = response;
      },
        error => console.log('Error in login formm submit', error)
      );

  }

  public onClickLogin(): void {
    this.loginClicked = true;
  }

}
