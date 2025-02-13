import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GeoDbService {
  private baseUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
  
  // IMPORTANT: Move this into environment variables or a secure place in real projects
  private apiKey = '0a7e822956msh0bef10d17495a63p15f36cjsn0581d5a9520c';
  private apiHost = 'wft-geo-db.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  // Retrieves list of continents
  // Endpoint: GET /v1/geo/continents
  getContinents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/continents`, {
      headers: this.getHeaders()
    }).pipe(catchError(err => this.handleError(err)));
  }

  // Retrieves list of countries for a given continent code (e.g. "AF" for Africa)
  // Endpoint: GET /v1/geo/continents/{continentCode}/countries
  getCountriesByContinent(continentCode: string): Observable<any> {
    const url = `${this.baseUrl}/continents/${continentCode}/countries`;
    return this.http.get(url, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  // Retrieves list of cities for a given country code (e.g. "US" for the United States)
  // Endpoint: GET /v1/geo/countries/{countryCode}/cities
  getCitiesByCountry(countryCode: string): Observable<any> {
    const url = `${this.baseUrl}/countries/${countryCode}/cities`;
    return this.http.get(url, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost
    });
  }

  private handleError(error: any) {
    console.error('GeoDB API error:', error);
    return throwError(() => new Error('GeoDB API request failed. Please try again.'));
  }
}
