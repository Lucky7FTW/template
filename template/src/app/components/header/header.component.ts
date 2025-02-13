// src/app/components/header/header.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import firebase from 'firebase/compat/app'; // Import firebase for auth state listener
import 'firebase/compat/auth';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CommonModule,
    LanguagePickerComponent,
    TranslateModule,
    LoginModalComponent,
    SignupModalComponent,
]
})
export class HeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() languages: { name: string; enabled: boolean }[] = [];
  @Input() position: 'sticky' | 'flex' = 'flex';

  @Output() languageSelected = new EventEmitter<string>();

  cssClass = '';
  isLoggedIn: boolean = false; // Tracks authentication status
  showLoginModal: boolean = false;
  showSignupModal: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cssClass = `header ${this.position}`;
    // Listen for authentication state changes
    firebase.auth().onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
    });
  }

  onLanguagePicked(langCode: string) {
    this.languageSelected.emit(langCode);
  }

  openLoginModal(): void {
    this.showLoginModal = true;
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
  }

  openSignupModal(): void {
    this.showSignupModal = true;
  }

  closeSignupModal(): void {
    this.showSignupModal = false;
  }

  logout(): void {
    this.authService.logout()
      .then(() => {
        console.log('User logged out successfully');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }
}
