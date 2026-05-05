import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  isLoginMode = true;
  errorMessage = '';
  isSubmitting = false;

  constructor(private router: Router, private api: Api) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit(form: any) {
    if (form.invalid) return;
    this.errorMessage = '';
    this.isSubmitting = true;
    
    if (this.isLoginMode) {
      this.api.login(form.value).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          localStorage.setItem('parkping_token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.error.msg || 'Login failed';
        }
      });
    } else {
      this.api.register(form.value).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          localStorage.setItem('parkping_token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.error.msg || 'Registration failed';
        }
      });
    }
  }
}
