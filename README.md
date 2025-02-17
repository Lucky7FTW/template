My Angular Template
A modern, multi-language Angular template that comes with a host of features including authentication with Firebase, real-time user preferences, cascading dropdowns, dark/light mode, and multi-language support using ngx-translate.

Deployed Demo
Experience the live version of this template here:
https://template-xi-six.vercel.app/

Features
Multi-Language Support

Users can choose from several languages using a language picker.
Translations are available for English, French, German, and more.
Authentication & User Management

Secure login, signup, and logout using Firebase Authentication.
"Forgot Password?" feature sends a password reset email via a dedicated reset password modal.
User Preferences

Users can set and save their preferences (e.g., default language, page mode) on their profile.
Preferences are stored in Firebase Firestore (or Realtime Database) and automatically loaded each time the user logs in.
The app automatically applies the chosen language and page mode (dark/light).
Cascading Dropdowns

Users can select a country and, based on that selection, choose from a list of cities.
Data is fetched from an external API with a loading indicator to signal when data is being loaded.
Responsive Navigation

The header contains a clickable title that returns to the home page.
The navbar adapts based on the user's authentication state and preferred language.
Dark Mode / Light Mode

The app supports both dark and light modes, which are applied based on user preferences.
Real-Time Updates

Uses Firebase’s real-time capabilities to keep user preferences and authentication state up to date.

Technologies Used
Angular (standalone components)
Firebase (Authentication, Firestore/Realtime Database)
ngx-translate (for multi-language support)
RapidAPI (for external data in cascading dropdowns)
CSS (for responsive design and dark/light mode)


Project Structure
Components

HeaderComponent: Contains the header with the title (clickable to return home), language picker, and authentication modals.
LoginModalComponent: Standalone login modal with a "Forgot Password?" link.
SignupModalComponent: Standalone signup modal.
ResetPasswordModalComponent: Standalone reset password modal that sends a password reset email.
ProfileComponent: Displays user details and allows saving user preferences (default language, page mode).
CascadingDropdownPageComponent: Implements cascading dropdowns for selecting a country and city.
Services

AuthService: Handles all Firebase authentication functions (login, signup, logout, password reset).
GeoDbService (if applicable): Fetches data for the cascading dropdown component from external APIs.
Routing

The app uses Angular’s router with route guards to protect pages like the Profile.
Unknown routes redirect to a Not Found page.
