import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePickerComponent } from '../language-picker/language-picker.component'; // Import the component

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, LanguagePickerComponent], // Include in imports
})
export class HeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() languages: { name: string; enabled: boolean }[] = [];
  @Input() position: 'sticky' | 'flex' = 'flex';

  cssClass = '';

  ngOnInit() {
    this.cssClass = `header ${this.position}`;
  }
}
