import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { RouterModule } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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

  // Hold user's preferences
  userPreferredLanguage: string = 'en';
  userPageMode: string = 'light'; // Default; will be updated from Firestore

  showLoginModal = false;
  showSignupModal = false;

  constructor(private authService: AuthService, private translate: TranslateService) {}

  ngOnInit(): void {
    // Set the header CSS class based on the provided position
    this.cssClass = `header ${this.position}`;

    // Subscribe to auth state changes
    this.authService.user$.subscribe((user: firebase.User | null) => {
      if (user) {
        this.isLoggedIn = true;
        console.log('HeaderComponent: user is logged in:', user.email);
        // Load user preferences from Firestore
        firebase.firestore().collection('preferences').doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const prefs = doc.data();
              this.userPreferredLanguage = prefs ? prefs['defaultLanguage'] || 'en' : 'en';
              this.userPageMode = prefs ? prefs['pageMode'] || 'light' : 'light';
              console.log('Loaded preferences:', prefs);
              // Update translation language
              this.translate.use(this.userPreferredLanguage);
              // Apply page mode (dark or light)
              this.applyPageMode(this.userPageMode);
            } else {
              console.log('No preferences found; using defaults.');
              this.translate.use(this.userPreferredLanguage);
              this.applyPageMode(this.userPageMode);
            }
          })
          .catch(error => {
            console.error('Error loading preferences:', error);
          });
      } else {
        this.isLoggedIn = false;
        console.log('HeaderComponent: no user is logged in');
      }
    });
  }

  onLanguagePicked(langCode: string): void {
    this.languageSelected.emit(langCode);
    this.translate.use(langCode);
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

  private applyPageMode(mode: string): void {
    console.log('Applying page mode:', mode);
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
