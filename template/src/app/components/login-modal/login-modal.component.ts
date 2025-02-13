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

  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  login(): void {
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

  onClose(): void {
    this.close.emit();
  }
}
