import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LanguageConfig {
  name: string;
  enabled: boolean;
}

@Component({
  standalone: true,
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css'],
  imports: [CommonModule]
})
export class LanguagePickerComponent {
  @Input() languages: LanguageConfig[] = [];
  
  get enabledLanguages(): LanguageConfig[] {
    return this.languages.filter(lang => lang.enabled);
  }
}
