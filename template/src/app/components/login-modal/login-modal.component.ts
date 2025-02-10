import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.email, this.password)
      .then(userCredential => {
        console.log('Logged in successfully', userCredential);
        // Close the modal here
      })
      .catch(error => {
        console.error('Login error:', error);
      });
  }
}
