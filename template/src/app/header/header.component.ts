// src/app/components/header/header.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CommonModule,
    LanguagePickerComponent,
    TranslateModule
  ]
})
export class HeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() languages: { name: string; enabled: boolean }[] = [];
  @Input() position: 'sticky' | 'flex' = 'flex';

  @Output() languageSelected = new EventEmitter<string>();

  cssClass = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cssClass = `header ${this.position}`;
  }

  onLanguagePicked(langCode: string) {
    this.languageSelected.emit(langCode);
  }


  openLoginModal(): void {
    // For example, you could open a modal component here.
    // For now, we’ll simply log to the console.
    console.log('Login modal opened');
    // Later, you can use the authService.login() method from within your modal component.
  }

  // Open the sign up modal (replace this with your modal logic)
  openSignupModal(): void {
    console.log('Sign Up modal opened');
    // Later, you can use the authService.signUp() method from within your modal component.
  }
}
