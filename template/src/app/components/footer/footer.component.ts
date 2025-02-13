import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule, TranslateModule] 
})
export class FooterComponent implements OnInit {
  @Input() position: 'sticky' | 'flex' = 'flex';

  cssClass = '';

  ngOnInit() {
    this.cssClass = `footer ${this.position}`;
  }
}
