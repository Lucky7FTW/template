import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  infoMessage: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<void>(); // New output

  constructor(private authService: AuthService) {}

  login(): void {
    this.errorMessage = '';
    this.infoMessage = '';
    this.authService.login(this.email, this.password)
      .then(userCredential => {
        console.log('Logged in successfully:', userCredential);
        this.close.emit();
      })
      .catch(error => {
        console.error('Login error:', error);
        this.errorMessage = error.message;
      });
  }

  /**
   * Instead of sending the reset email here,
   * close the login modal and emit an event to open the reset password modal.
   */
  resetPassword(): void {
    this.close.emit();
    this.forgotPassword.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
