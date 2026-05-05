import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  userName = 'Driver';
  vehicles: any[] = [];
  recentRequests: any[] = []; 

  constructor(private api: Api, private router: Router) {}

  ngOnInit() {
    this.fetchVehicles();
    this.fetchRequests();
    
    // Poll for new requests every 5 seconds for a snappy UI
    setInterval(() => {
      this.fetchRequests();
    }, 5000);
  }

  fetchVehicles() {
    this.api.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
      },
      error: (err) => {
        console.error('Failed to load vehicles', err);
        if (err.status === 401 || err.status === 403) {
          this.logout();
        }
      }
    });
  }

  fetchRequests() {
    this.api.getRequests().subscribe({
      next: (data) => {
        // Map the data to the format the UI expects
        const newRequests = data.map((req: any) => ({
          id: req._id,
          vehicleNumber: req.vehicleId ? req.vehicleId.number : 'Unknown',
          status: req.status,
          time: new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));

        // Check if there's a new request by comparing lengths (simple approach)
        if (this.recentRequests.length > 0 && newRequests.length > this.recentRequests.length) {
          this.playAlertSound();
          this.showBrowserNotification(newRequests[0]);
        }

        this.recentRequests = newRequests;
      },
      error: (err) => console.error('Failed to load requests', err)
    });
  }

  showBrowserNotification(request: any) {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('🚨 ParkPing Alert!', {
          body: `Someone needs you to move your vehicle (${request.vehicleNumber})!`,
          icon: '/favicon.ico'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('🚨 ParkPing Alert!', {
              body: `Someone needs you to move your vehicle (${request.vehicleNumber})!`
            });
          }
        });
      }
    }
  }

  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // Test it!
          new Notification('🔔 Notifications Enabled!', {
            body: 'You will now receive desktop alerts when someone needs you to move your car.',
            icon: '/favicon.ico'
          });
        }
      });
    } else {
      alert('Your browser does not support desktop notifications.');
    }
  }

  playAlertSound() {
    // A simple beep using the Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 800; // Frequency in hertz
      
      oscillator.start();
      
      // Stop after 200ms
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
      }, 200);
    } catch (e) {
      console.error('Audio play failed', e);
    }
  }

  logout() {
    localStorage.removeItem('parkping_token');
    this.router.navigate(['/auth']);
  }
}
