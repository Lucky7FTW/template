// src/app/app-config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config {
  sidebar: { enabled: boolean };
  navbar: { enabled: boolean };
  footer: { enabled: boolean };
  header: {
    enabled: boolean;
    title: string;
  };
  languagePicker: {
    enabled: boolean;
    languages: Array<{
      name: string;
      enabled: boolean;
    }>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl);
  }
}
