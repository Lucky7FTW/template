import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule,TranslateModule]
})
export class SidebarComponent implements OnInit {
  @Input() position: 'sticky' | 'flex' = 'flex';

  cssClass = '';

  ngOnInit() {
    this.cssClass = `sidebar ${this.position}`;
  }
}
