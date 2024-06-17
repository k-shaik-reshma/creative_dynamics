import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userId: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || 'customer';
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

}
