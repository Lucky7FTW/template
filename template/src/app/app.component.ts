import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService, Config } from './app-config.service';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    TranslateModule,        
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class AppComponent implements OnInit {
  config: Config | undefined;

  constructor(
    private configService: AppConfigService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe({
      next: (data: Config) => {
        console.log('Loaded config:', data); 
        this.config = data;

      },
      error: (error) => {
        console.error('Error loading config:', error);
      }
    });
  }

  onLanguageChange(langCode: string): void {
    console.log('Switching language to:', langCode);
    this.translate.use(langCode);
  }
}
