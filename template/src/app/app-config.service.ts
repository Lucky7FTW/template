import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Config {
  sidebar: { enabled: boolean };
  navbar: { enabled: boolean };
  footer: { enabled: boolean };
  header: { enabled: boolean; title: string };
  languagePicker: {
    enabled: boolean;
    languages: Array<{ name: string; enabled: boolean }>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private configUrl = 'assets/config.json';
  private _config: Config;

  constructor(private http: HttpClient) {}

  // Returns the config as an observable.
  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }


  loadConfig(): Promise<Config> {
    return firstValueFrom(this.getConfig()).then((config) => {
      this._config = config;
      return config;
    });
  }

  get config(): Config {
    return this._config;
  }
}
