import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-vehicle.html',
  styleUrl: './add-vehicle.css',
})
export class AddVehicle {
  isSubmitting = false;
  errorMessage = '';

  constructor(private router: Router, private api: Api) {}

  onSubmit(form: any) {
    if (form.invalid) return;
    this.isSubmitting = true;
    
    this.api.addVehicle(form.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.router.navigate(['/qr-display', res.qrId]);
      },
      error: (err) => {
        console.error('Failed to add vehicle', err);
        this.isSubmitting = false;
        this.errorMessage = err.error.msg || 'Failed to add vehicle';
      }
    });
  }
}
