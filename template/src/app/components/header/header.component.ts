import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { RouterModule } from '@angular/router';

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
    RouterModule
  ]
})
export class HeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() languages: { name: string; enabled: boolean }[] = [];
  @Input() position: 'sticky' | 'flex' = 'flex';

  @Output() languageSelected = new EventEmitter<string>();

  cssClass = '';
  isLoggedIn: boolean = false;

  showLoginModal: boolean = false;
  showSignupModal: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cssClass = `header ${this.position}`;

    firebase.auth().onAuthStateChanged((user) => {
      console.log('Auth state changed. User = ', user);
      if (user) {
        this.isLoggedIn = true;
        console.log('User is logged in!');
      } else {
        this.isLoggedIn = false;
        console.log('No user is logged in.');
      }
    });
  }

  onLanguagePicked(langCode: string): void {
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
