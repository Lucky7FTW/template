import { Component, Output, EventEmitter, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password-modal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.css']
})
export class ResetPasswordModalComponent {
  email: string = '';
  errorMessage: string = '';
  infoMessage: string = '';

  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService, private ngZone: NgZone) {}

  async resetPassword(): Promise<void> {
    this.errorMessage = '';
    this.infoMessage = '';
    try {
      await this.authService.resetPassword(this.email);
      console.log('Password reset email sent.');
      
      // Use NgZone.run to ensure change detection picks up the change
      this.ngZone.run(() => {
        this.infoMessage = 'Password reset email sent! Check your inbox.';
      });
      
      // Clear the notification after 3 seconds
      setTimeout(() => {
        this.ngZone.run(() => {
          this.infoMessage = '';
        });
      }, 3000);
    } catch (error: any) {
      console.error('Reset password error:', error);
      this.ngZone.run(() => {
        this.errorMessage = error.message;
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
