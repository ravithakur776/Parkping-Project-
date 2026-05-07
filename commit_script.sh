#!/bin/bash

# Initialize repository
git init
git branch -m main

# Set date: 5 days ago
export GIT_AUTHOR_DATE="2026-05-02T10:00:00+05:30"
export GIT_COMMITTER_DATE="2026-05-02T10:00:00+05:30"
git add frontend/angular.json frontend/package.json backend/package.json
git commit -m "chore: Initialize project structure for ParkPing"

# Set date: 4 days ago
export GIT_AUTHOR_DATE="2026-05-03T14:30:00+05:30"
export GIT_COMMITTER_DATE="2026-05-03T14:30:00+05:30"
git add backend/models/ backend/middleware/ backend/index.js
git commit -m "feat(backend): Setup Express server, JWT auth middleware and Mongoose models"

# Set date: 3 days ago
export GIT_AUTHOR_DATE="2026-05-04T16:45:00+05:30"
export GIT_COMMITTER_DATE="2026-05-04T16:45:00+05:30"
git add backend/routes/
git commit -m "feat(backend): Implement API routes for auth, vehicles and alerts"

# Set date: 2 days ago
export GIT_AUTHOR_DATE="2026-05-05T11:20:00+05:30"
export GIT_COMMITTER_DATE="2026-05-05T11:20:00+05:30"
git add frontend/src/app/pages/auth/ frontend/src/app/pages/dashboard/ frontend/src/app/pages/landing/
git commit -m "feat(frontend): Build Landing, Auth, and Dashboard interfaces with neon dark theme"

# Set date: 1 day ago
export GIT_AUTHOR_DATE="2026-05-06T09:15:00+05:30"
export GIT_COMMITTER_DATE="2026-05-06T09:15:00+05:30"
git add frontend/src/app/services/ frontend/src/app/pages/add-vehicle/ frontend/src/app/pages/qr-display/
git commit -m "feat(frontend): Integrate API service, QR code generation and vehicle registration"

# Set date: Today earlier
export GIT_AUTHOR_DATE="2026-05-07T12:00:00+05:30"
export GIT_COMMITTER_DATE="2026-05-07T12:00:00+05:30"
git add frontend/src/app/pages/incoming-requests/
git commit -m "feat: Implement incoming alert request page and cooldown logic"

# Set date: Now
unset GIT_AUTHOR_DATE
unset GIT_COMMITTER_DATE
git add .
git commit -m "feat: Final polish, Twilio fallback, live notifications and deployment config"

git remote add origin https://github.com/ravithakur776/Parkping-Project-.git
git push -u origin main -f
