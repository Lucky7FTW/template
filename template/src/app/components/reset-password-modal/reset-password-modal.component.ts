import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.css']
})
export class ResetPasswordModalComponent {
  email: string = '';
  errorMessage: string = '';
  infoMessage: string = '';

  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  sendResetEmail(): void {
    this.errorMessage = '';
    this.infoMessage = '';
    try {
      this.authService.resetPassword(this.email);
      this.infoMessage = 'Password reset email sent! Check your inbox.';
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
