import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'creative_dynamics';
  message: string = 'Loading...';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getHelloMessage().subscribe(response => {
      this.message = response.message;
    });
  }
}
