import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() dropdownTrigger: 'hover' | 'click' = 'hover';

  // Track which dropdowns are open
  isDropdownOpen: { [key: string]: boolean } = {
    nav1: false,
    nav2: false,
    dropdown: false
  };

  ngOnInit() {}

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
