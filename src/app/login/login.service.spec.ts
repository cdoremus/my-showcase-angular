import { Http } from '@angular/http';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginService } from './login.service';

describe('LoginService:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, Http]
    });
  });

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
