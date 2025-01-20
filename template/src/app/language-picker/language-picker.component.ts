import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css']
})
export class LanguagePickerComponent {
  @Input() languages: string[] = [];
}
