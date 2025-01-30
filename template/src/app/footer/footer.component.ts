import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule] 
})
export class FooterComponent implements OnInit {
  @Input() position: 'sticky' | 'flex' = 'flex';

  cssClass = '';

  ngOnInit() {
    this.cssClass = `footer ${this.position}`;
  }
}
