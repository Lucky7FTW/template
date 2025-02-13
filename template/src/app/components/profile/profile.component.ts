import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: firebase.User | null = null;

  ngOnInit(): void {

    this.user = firebase.auth().currentUser;
  }
}
