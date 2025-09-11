#!/bin/sh

sudo rm -r /var/www/bacarotruckdelete/html/deploy
sudo cp -r /home/bacarotruck/source/BacarotruckMobileApp/webapp/unregistered/deploy /var/www/bacarotruckdelete/html/

sudo chmod -R 755 /var/www/bacarotruckdelete/html