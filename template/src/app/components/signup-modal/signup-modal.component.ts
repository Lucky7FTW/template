import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel
import { AuthService } from '../../services/auth.service';

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

  // Emit an event to notify the parent to close the modal
  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  signUp(): void {
    // Check that the passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.signUp(this.email, this.password)
      .then(userCredential => {
        console.log('User signed up successfully:', userCredential);
        this.close.emit();
      })
      .catch(error => {
        console.error('Sign Up error:', error);
        this.errorMessage = error.message;
      });
  }

  // Called when the user clicks outside the modal or on Cancel
  onClose(): void {
    this.close.emit();
  }
}
