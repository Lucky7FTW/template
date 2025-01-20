import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService, Config } from './app-config.service';


import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    NavbarComponent,
    SidebarComponent,
    LanguagePickerComponent,
    FooterComponent
  ]
})
export class AppComponent implements OnInit {
  config: Config | undefined;

  constructor(private configService: AppConfigService) {}

  ngOnInit(): void {
    this.configService.getConfig().subscribe((data: Config) => {
      this.config = data;
    });
  }
}
