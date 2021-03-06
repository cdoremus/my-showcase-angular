import { AppStateService } from './shared/appstate.service';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ApiService } from './shared';
import { routing } from './app.routing';
import { config } from './app.config';
import { CONFIG } from './shared/constants';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { ContentEditorComponent } from './contentEditor/contentEditor.component';
import { ContentEditorService } from './contentEditor/contentEditor.service';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContentEditorComponent,
    LoginComponent
  ],
  providers: [
    ApiService,
    AppStateService,
    LoginService,
    ContentEditorService,
    { provide: CONFIG, useValue: config }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
