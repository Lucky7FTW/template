import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config {
  sidebar: { enabled: boolean };
  navbar: { enabled: boolean };
  footer: { enabled: boolean };
  languagePicker: {
    enabled: boolean;
    languages: string[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private configUrl = 'assets/config.json'; // Path to your config file

  constructor(private http: HttpClient) {}

  getConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl);
  }
}
