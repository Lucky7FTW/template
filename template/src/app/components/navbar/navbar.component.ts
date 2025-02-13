// src/app/components/navbar/navbar.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, TranslateModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  @Input() dropdownTrigger: 'hover' | 'click' = 'hover';

  // Track which dropdowns are open
  isDropdownOpen: { [key: string]: boolean } = {
    nav1: false,
    nav2: false,
    dropdown: false
  };

  // Track if the user is logged in
  isLoggedIn: boolean = false;

  ngOnInit() {
    // Subscribe to Firebase auth state changes
    firebase.auth().onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
    });
  }

  toggleDropdown(key: string) {
    if (this.dropdownTrigger === 'click') {
      this.isDropdownOpen[key] = !this.isDropdownOpen[key];
    }
  }

  onMouseEnter(key: string) {
    if (this.dropdownTrigger === 'hover') {
      this.isDropdownOpen[key] = true;
    }
  }

  onMouseLeave(key: string) {
    if (this.dropdownTrigger === 'hover') {
      this.isDropdownOpen[key] = false;
    }
  }
}
