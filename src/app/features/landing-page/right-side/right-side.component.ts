import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-right-side',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.css']
})
export class RightSideComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response: any) => {
          if (response.user.type === 'chef') {
            this.toastr.success('', 'Welcome back, chef!');
            this.router.navigate(['/chef']);
            localStorage.setItem('userRole', response.user.type);
            localStorage.setItem('userId', response.user.id);
          } else if (response.user.type === 'customer') {
            this.toastr.success('', 'Welcome back, customer!');
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }
}
