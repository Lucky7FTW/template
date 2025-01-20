import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-picker',
  template: `
    <label for="languageSelect">Select Language:</label>
    <select id="languageSelect">
      <option *ngFor="let lang of languages" [value]="lang">
        {{ lang }}
      </option>
    </select>
  `,
})
export class LanguagePickerComponent {
  @Input() languages: string[] = [];
}
