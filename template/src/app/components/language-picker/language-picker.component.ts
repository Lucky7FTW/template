import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

export interface LanguageConfig {
  name: string;
  enabled: boolean;
}

@Component({
  standalone: true,
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css'],
  imports: [CommonModule, TranslateModule, FormsModule]
})
export class LanguagePickerComponent {
  @Input() languages: LanguageConfig[] = [];
  // New input to set the current language from Firebase preference.
  @Input() selectedLanguage: string = '';
  @Output() languageSelected = new EventEmitter<string>();

  get enabledLanguages(): LanguageConfig[] {
    return this.languages.filter(lang => lang.enabled);
  }

  onLanguageChange(newLanguage: string): void {
    this.selectedLanguage = newLanguage;
    this.languageSelected.emit(newLanguage);
  }
}
