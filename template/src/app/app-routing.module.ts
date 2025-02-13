import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  // If you don't have a HomeComponent, the default route could remain empty.
  // The root template (app.component.html) will always be displayed.
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // Optionally, add a wildcard route to handle unknown paths
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
