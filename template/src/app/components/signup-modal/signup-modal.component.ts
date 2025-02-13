import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  // Emit an event to notify the parent to close the modal
  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  signUp(): void {
    // Ensure that passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Call the signUp method from AuthService
    this.authService.signUp(this.email, this.password)
      .then(userCredential => {
        if (userCredential.user) {
          // Send verification email
          userCredential.user.sendEmailVerification()
            .then(() => {
              // Optionally, set a success message for the user
              this.successMessage = 'Verification email sent. Please check your inbox.';
              console.log('Verification email sent successfully.');
              // Close the modal or perform further actions as needed
              this.close.emit();
            })
            .catch(error => {
              console.error('Error sending verification email:', error);
              this.errorMessage = error.message;
            });
        }
      })
      .catch(error => {
        console.error('Sign Up error:', error);
        this.errorMessage = error.message;
      });
  }

  onClose(): void {
    this.close.emit();
  }
}
