// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { CascadingDropdownPageComponent } from './pages/cascading-dropdown-page/cascading-dropdown-page.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: 'cascading', component: CascadingDropdownPageComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/' }
];
