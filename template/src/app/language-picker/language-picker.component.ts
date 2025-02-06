import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface LanguageConfig {
  name: string;
  enabled: boolean;
}

@Component({
  standalone: true,
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css'],
  imports: [CommonModule,TranslateModule]
})
export class LanguagePickerComponent {
  @Input() languages: LanguageConfig[] = [];
  @Output() languageSelected = new EventEmitter<string>();

  // Only show languages that have "enabled = true"
  get enabledLanguages(): LanguageConfig[] {
    return this.languages.filter(lang => lang.enabled);
  }

  // Called when the user changes the dropdown
  onLanguageChange(langName: string) {
    this.languageSelected.emit(langName);
  }
}
