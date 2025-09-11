# !./bin/sh
cd ~/source/BacarotruckMobileApp/backend
npm run build
cp .env dist
cd dist
pm2 delete main
NODE_ENV=development pm2 start main.js
pm2 logs main