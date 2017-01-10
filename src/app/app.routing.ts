import { ContentEditorComponent } from './contentEditor/contentEditor.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'addContent', component: ContentEditorComponent}
];

export const routing = RouterModule.forRoot(routes);
