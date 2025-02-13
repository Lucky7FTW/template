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

  // RapidAPI credentials for the Country State City Search REST API
  private rapidApiKey = '0a7e822956msh0bef10d17495a63p15f36cjsn0581d5a9520c';
  private rapidApiHost = 'country-state-city-search-rest-api.p.rapidapi.com';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Load all countries when the component initializes
    this.loadAllCountries();
  }

  /**
   * Load all countries via XHR.
   * Note: We use '/countries/all' because '/countries' returned a 404.
   * Endpoint: GET https://{rapidApiHost}/countries/all
   */
  private loadAllCountries(): void {
    const url = `https://${this.rapidApiHost}/countries/all`;

    const xhr = new XMLHttpRequest();
    // Credentials are not needed in this API (set to false)
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            const res = JSON.parse(xhr.responseText);
            // Assume the API returns the countries array in res.data (adjust if needed)
            this.countries = res.data || [];
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
    xhr.setRequestHeader('x-rapidapi-key', this.rapidApiKey);
    xhr.setRequestHeader('x-rapidapi-host', this.rapidApiHost);
    xhr.send(null);
  }

  /**
   * When the user picks a country, load the list of cities for that country.
   * Endpoint: GET https://{rapidApiHost}/cities-by-countrycode?countrycode={selectedCountry}
   */
  onCountryChange(): void {
    if (!this.selectedCountry) {
      this.cities = [];
      this.selectedCity = '';
      return;
    }

    // Convert the selected country code to lowercase if the API expects it (adjust as needed)
    const countryCode = this.selectedCountry.toLowerCase();
    const url = `https://${this.rapidApiHost}/cities-by-countrycode?countrycode=${countryCode}`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            const res = JSON.parse(xhr.responseText);
            // Assume the API returns cities in res.data
            this.cities = res.data || [];
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
    xhr.setRequestHeader('x-rapidapi-key', this.rapidApiKey);
    xhr.setRequestHeader('x-rapidapi-host', this.rapidApiHost);
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
