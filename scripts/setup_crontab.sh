#!/bin/bash

# This script sets up the cron job for the log rotation script.

# Define the path to the log rotation script
LOG_ROTATION_SCRIPT="/path/to/your/project/scripts/log_rotation.sh"

# Check if the crontab already contains the job
(crontab -l 2>/dev/null | grep -q "$LOG_ROTATION_SCRIPT") || {
    # Add the cron job to run the log rotation script daily at midnight
    (crontab -l 2>/dev/null; echo "0 0 * * * $LOG_ROTATION_SCRIPT") | crontab -
    echo "Cron job added for log rotation."
}
