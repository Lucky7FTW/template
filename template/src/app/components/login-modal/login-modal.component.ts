import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Needed for ngModel
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
  infoMessage: string = '';  // For displaying information (e.g. reset email sent)

  @Output() close = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<void>(); // New event for "forgot password"

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
   * Instead of sending a reset email directly here,
   * we want to close the login modal and notify the parent
   * to open the reset password modal.
   */
  resetPassword(): void {
    // Close the login modal...
    this.close.emit();
    // Emit event so parent can open the reset password modal.
    this.forgotPassword.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
