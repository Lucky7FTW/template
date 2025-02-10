import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css'],
  // If using a standalone component, include FormsModule:
  // imports: [FormsModule]
})
export class SignupModalComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  signUp(): void {
    // Validate that password and confirmPassword match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.signUp(this.email, this.password)
      .then(userCredential => {
        console.log('User signed up successfully:', userCredential);
        // TODO: Close the modal here or navigate as needed
      })
      .catch(error => {
        console.error('Sign Up error:', error);
        this.errorMessage = error.message;
      });
  }
}
