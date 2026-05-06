import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { Api } from '../../services/api';

@Component({
  selector: 'app-qr-display',
  standalone: true,
  imports: [CommonModule, RouterModule, QRCodeComponent],
  templateUrl: './qr-display.html',
  styleUrl: './qr-display.css',
})
export class QrDisplay implements OnInit {
  vehicleId: string | null = null;
  qrData: string = '';
  vehicleNumber = 'Loading...';

  constructor(private route: ActivatedRoute, private api: Api) {}

  ngOnInit() {
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    const baseUrl = window.location.origin;
    this.qrData = `${baseUrl}/requests?vehicle=${this.vehicleId}`;

    if (this.vehicleId) {
      this.api.getVehicleByQrId(this.vehicleId).subscribe({
        next: (data) => {
          this.vehicleNumber = data.number;
        },
        error: (err) => {
          console.error('Failed to load vehicle', err);
          this.vehicleNumber = 'Unknown Vehicle';
        }
      });
    }
  }

  downloadQR() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `parkping-qr-${this.vehicleNumber}.png`;
      link.href = url;
      link.click();
    }
  }
}
