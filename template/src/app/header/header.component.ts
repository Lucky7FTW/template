import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, LanguagePickerComponent]
})
export class HeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() languages: { name: string; enabled: boolean }[] = [];
  @Input() position: 'sticky' | 'flex' = 'flex';

  @Output() languageSelected = new EventEmitter<string>();

  cssClass = '';

  ngOnInit() {
    this.cssClass = `header ${this.position}`;
  }

  /** Called when the user selects a language in the picker */
  onLanguagePicked(langCode: string) {
    this.languageSelected.emit(langCode);
  }
}
