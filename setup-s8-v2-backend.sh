#!/bin/bash
sudo git clone --filter=blob:none https://github.com/manuelgarciacr/ita-angular-s8-v2-backend.git /var/www/html/nodejs/ita-angular-s8-v2-backend
sudo chown -R manuel:manuel /var/www/html/nodejs/ita-angular-s8-v2-backend
cd /var/www/html/nodejs/ita-angular-s8-v2-backend
git sparse-checkout set --no-cone '/package.json' '/ecosystem.config.js' '/src/' '/bin/'
npm install --omit=dev
pm2 start ecosystem.config.js
pm2 save
pm2 startup
