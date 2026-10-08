#!/bin/bash
cd /var/www/html/nodejs/ita-angular-s8-v2-backend

git fetch origin
git reset --hard origin/main
git sparse-checkout reapply
npm install --omit=dev
pm2 restart ita-angular-s8-v2-backup
pm2 save   