#!/bin/bash

LOG_ROTATION_SCRIPT="/path/to/your/project/scripts/log_rotation.sh"
REPORTER_SCRIPT="/path/to/your/project/reporter.js"

(crontab -l 2>/dev/null | grep -q "$LOG_ROTATION_SCRIPT") || {
    (crontab -l 2>/dev/null; echo "0 0 * * * $LOG_ROTATION_SCRIPT") | crontab -
    echo "Cron job added for log rotation."
}

(crontab -l 2>/dev/null | grep -q "$REPORTER_SCRIPT") || {
    (crontab -l 2>/dev/null; echo "5 0 * * * cd /path/to/your/project && node $REPORTER_SCRIPT >> /path/to/your/project/reports/report-\$(date +\%Y-\%m-\%d).txt 2>&1") | crontab -
    echo "Cron job added for daily reporting."
}
