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

  // This property holds the user's preferred language from Firestore
  userPreferredLanguage: string = 'en';

  showLoginModal = false;
  showSignupModal = false;

  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Set the CSS class based on position
    this.cssClass = `header ${this.position}`;

    // Subscribe to user changes via AuthService
    this.authService.user$.subscribe((user: firebase.User | null) => {
      if (user) {
        this.isLoggedIn = true;
        console.log('HeaderComponent: user is logged in:', user.email);
        // Load user preferences from Firestore:
        firebase.firestore().collection('preferences').doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const prefs = doc.data();
              // Use bracket notation if necessary:
              this.userPreferredLanguage = prefs?.['defaultLanguage'] || 'en';
              console.log('User preferred language:', this.userPreferredLanguage);
              // Optionally, update the app language immediately:
              this.translate.use(this.userPreferredLanguage);
            } else {
              console.log('No preferences found; using default language.');
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
}
