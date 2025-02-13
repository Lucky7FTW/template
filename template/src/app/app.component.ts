import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService, Config } from './app-config.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

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
    FooterComponent,
    RouterModule
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

  onLanguageChange(langName: string): void {
    const code = this.mapLanguageNameToCode(langName);
    console.log('Switching language to:', code);
    this.translate.use(code);
  }
  
  private mapLanguageNameToCode(name: string): string {
    switch (name.toLowerCase()) {
      case 'english':  return 'en';
      case 'spanish':  return 'es';
      case 'french':   return 'fr';
      case 'german':   return 'de';
      default:         return 'en'; // Fallback to English
    }
  }
}
