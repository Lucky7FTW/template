// src/app/header/header.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';

interface LanguageConfig {
  name: string;
  enabled: boolean;
}

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, LanguagePickerComponent]
})
export class HeaderComponent {
  @Input() title?: string;
  @Input() languages: LanguageConfig[] = [];
}
