import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-picker',            
  imports: [CommonModule],
  standalone: true,     
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css']
})
export class LanguagePickerComponent {
  @Input() languages: string[] = [];
}