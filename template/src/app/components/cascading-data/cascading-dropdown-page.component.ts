import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-cascading-dropdown-page',
  templateUrl: './cascading-dropdown-page.component.html',
  styleUrls: ['./cascading-dropdown-page.component.css'],
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class CascadingDropdownPageComponent implements OnInit {
  // Arrays to store data for the dropdowns
  countries: any[] = [];
  selectedCountry: string = '';

  cities: any[] = [];
  selectedCity: string = '';

  // For error messages
  errorMessage: string | null = null;

  // Loading flags for spinners
  isLoadingCountries: boolean = false;
  isLoadingCities: boolean = false;

  // API credentials and base URL for countrystatecity.in API
  private apiKey: string = 'eUNSTng4NjZ1R1lzQ3RRYVZsbVlUZ2RzaHVOcGhKa1M2SXYxQ1kzdw==';
  private apiBaseUrl: string = 'https://api.countrystatecity.in/v1';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadAllCountries();
  }

  /**
   * Load all countries via XHR.
   * Endpoint: GET https://api.countrystatecity.in/v1/countries
   */
  private loadAllCountries(): void {
    const url = `${this.apiBaseUrl}/countries`;
    this.isLoadingCountries = true;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false; // Credentials not needed for this API

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.isLoadingCountries = false;
        if (xhr.status === 200) {
          try {
            const res = JSON.parse(xhr.responseText);
            // API might return an array or an object with a "data" property.
            this.countries = Array.isArray(res) ? res : (res.data || []);
            console.log('All Countries =>', this.countries);
          } catch (err) {
            console.error('Error parsing countries JSON:', err);
            this.handleError(err);
          }
        } else {
          console.error('Failed to load countries:', xhr.status, xhr.statusText);
          this.handleError('Failed to load countries');
        }
      }
    });

    xhr.open('GET', url);
    xhr.setRequestHeader('X-CSCAPI-KEY', this.apiKey);
    xhr.send(null);
  }

  /**
   * When the user picks a country, load the list of cities for that country.
   * Endpoint: GET https://api.countrystatecity.in/v1/countries/{countryCode}/cities
   */
  onCountryChange(): void {
    if (!this.selectedCountry) {
      this.cities = [];
      this.selectedCity = '';
      return;
    }

    this.isLoadingCities = true;
    const url = `${this.apiBaseUrl}/countries/${this.selectedCountry}/cities`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.isLoadingCities = false;
        if (xhr.status === 200) {
          try {
            const res = JSON.parse(xhr.responseText);
            // API might return an array or an object with a "data" property.
            this.cities = Array.isArray(res) ? res : (res.data || []);
            console.log(`Cities for country '${this.selectedCountry}' =>`, this.cities);
            this.selectedCity = '';
          } catch (err) {
            console.error('Error parsing cities JSON:', err);
            this.handleError(err);
          }
        } else if (xhr.status === 404) {
          console.warn(`No cities found for country '${this.selectedCountry}'.`);
          this.cities = [];
          this.selectedCity = '';
          this.errorMessage = 'No cities found for the selected country.';
        } else {
          console.error(`Failed to load cities: ${xhr.status} ${xhr.statusText}`);
          this.handleError('Failed to load cities');
        }
      }
    });

    xhr.open('GET', url);
    xhr.setRequestHeader('X-CSCAPI-KEY', this.apiKey);
    xhr.send(null);
  }

  /**
   * Final submission: Process the selected country and city.
   */
  onSubmit(): void {
    if (!this.selectedCountry || !this.selectedCity) {
      this.errorMessage = this.translate.instant('ERRORS.MUST_SELECT_ALL');
      return;
    }
    console.log('Selections =>', {
      country: this.selectedCountry,
      city: this.selectedCity
    });
  }

  private handleError(error: any): void {
    console.error('Error encountered:', error);
    this.errorMessage = this.translate.instant('ERRORS.GENERIC_ERROR');
  }
}
