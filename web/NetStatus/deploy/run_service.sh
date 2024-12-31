#!\/bin\/sh

cd /deploy
screen -dmS logger watch -n 1 ./log_stats.sh
apachectl -D FOREGROUND