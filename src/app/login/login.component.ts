import { Response } from '@angular/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
        <input type="submit" value="Login" />
        </legend>
      </form>
    </div>
    <pre>
      {{user | json}}
    </pre>
   `
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginForm: FormGroup;
  private loginClicked: boolean;
  private user: User;
  private loginSubscription: Subscription;

  constructor(fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = fb.group({
      'username': ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.loginClicked = false;
  }

  public ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  public onSubmit(form: FormGroup): void {
    this.loginClicked = true;
    console.log('LoginComponent.onSubmit form param:', form.value);
    let username: string = form.value.username;
    if (username) {
      this.loginSubscription = this.loginService.login(username)
        .subscribe(
          response => {
            console.log('Login service response', response);
            this.user = response.json();
        },
          error => console.log('Error in login form submit', error)
        );
    }

  }

  public onClickLogin(): void {
    this.loginClicked = true;
  }

}
