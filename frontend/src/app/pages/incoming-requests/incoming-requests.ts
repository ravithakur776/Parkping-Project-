import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-incoming-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incoming-requests.html',
  styleUrl: './incoming-requests.css',
})
export class IncomingRequests implements OnInit {
  vehicleId: string | null = null;
  requestSent = false;
  cooldown = false;
  countdown = 60;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private api: Api) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.vehicleId = params['vehicle'];
    });
  }

  sendAlert() {
    if (this.cooldown || !this.vehicleId) return;
    
    this.api.sendAlert(this.vehicleId).subscribe({
      next: (res) => {
        this.requestSent = true;
        this.cooldown = true;
        this.errorMessage = '';
        
        const timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(timer);
            this.cooldown = false;
            this.countdown = 60;
            this.requestSent = false;
          }
        }, 1000);
      },
      error: (err) => {
        if (err.status === 429) {
          // It's a cooldown error from backend
          this.errorMessage = err.error.msg;
          this.cooldown = true;
          // Simple local recovery for UI since backend told us to wait
          setTimeout(() => { this.cooldown = false; this.errorMessage = ''; }, 60000);
        } else {
          this.errorMessage = err.error.msg || 'Failed to send alert. Try again later.';
        }
      }
    });
  }
}
