#!\/bin\/bash

LOG_FILE="/var/www/html/log.csv"
output=$(vnstat -tr 10)

download=$(echo \"$output\" | grep \"rx\" | awk '{print $2}')
upload=$(echo \"$output\" | grep \"tx\" | awk '{print $2}')
timestamp=$(date +%s)
echo "$timestamp","downloadSpeed":"$download","uploadSpeed":"$upload\" >> \"$LOG_FILE\"