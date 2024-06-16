import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // Example items for sidebar
  sidebarItems = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Profile', route: '/profile' },
    { label: 'Settings', route: '/settings' }
    // Add more sidebar items as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
