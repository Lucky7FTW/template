// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // The "profile" route you had in AppRoutingModule
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  // If you don't have a real home component, you can do:
  // { path: '', component: SomeHomeComponent },  (optional)

  // Redirect unknown routes
  { path: '**', redirectTo: '/' }
];
