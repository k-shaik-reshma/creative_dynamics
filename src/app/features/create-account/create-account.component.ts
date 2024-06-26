import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { LeftSideComponent } from '../landing-page/left-side/left-side.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

function passwordMatcher(
  control: FormGroup
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, LeftSideComponent, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.accountForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        full_name: ['', Validators.required],
        type: ['chef', Validators.required],
        phone_number: ['', Validators.required],
        location: ['', Validators.required],
      },
      { validator: passwordMatcher }
    );
  }

  createUser() {
    if (this.accountForm.valid) {
      this.authService.createUser(this.accountForm.value).subscribe({
        next: (response: any) => {
          this.toastr.success('', 'Account created');
          this.router.navigate(['/login']);
        },
        error: (error: any) => console.error('Error creating user', error),
      });
    } else {
      console.error('Form is not valid');
    }
  }
}
