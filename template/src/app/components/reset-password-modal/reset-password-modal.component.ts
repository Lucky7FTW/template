import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  infoMessage: string = '';  // For displaying notification

  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  async resetPassword(): Promise<void> {
    this.errorMessage = '';
    this.infoMessage = '';
    try {
      await this.authService.resetPassword(this.email);
      console.log('Password reset email sent.');
      this.infoMessage = 'Password reset email sent! Check your inbox.';
      // Clear the notification after 3 seconds
      setTimeout(() => {
        this.infoMessage = '';
      }, 3000);
    } catch (error: any) {
      console.error('Reset password error:', error);
      this.errorMessage = error.message;
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
