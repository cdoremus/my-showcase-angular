import { SITE_URL } from './shared/constants';
import { Component } from '@angular/core';

import { ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = SITE_URL;

  constructor(private api: ApiService) {
    // Do something with api
  }
}
