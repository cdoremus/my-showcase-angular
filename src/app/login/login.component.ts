import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { User } from '../shared/user';

@Component({
  selector: 'my-login',
  // templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
   template: `
    <div>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm)" >
        <legend>
        <fieldset>
          <label for="loginId">Login ID:</label>
          <input id=loginId type="text" placeholder="Enter login id" formControlName= "loginId" />
          <div class="error" *ngIf="loginClicked && loginForm.controls.loginId.errors">
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
      'loginId': ['', Validators.required]
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
    let loginId: string = form.value.loginId;
    if (loginId) {
      this.loginSubscription = this.loginService.login(loginId)
        .subscribe(
          user => {
            console.log('Login service response', user);
            this.user = user;
        },
          error => console.log('Error in login form submit', error)
        );
    }

  }

  public onClickLogin(): void {
    this.loginClicked = true;
  }

}
