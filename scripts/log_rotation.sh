#!/bin/bash

# Directory containing logs
LOG_DIR="/path/to/your/project/logs"
# Archive directory for old logs
ARCHIVE_DIR="/path/to/your/project/logs/archive"

# Create archive directory if it doesn't exist
mkdir -p "$ARCHIVE_DIR"

# Get current date for the log file
CURRENT_DATE=$(date +"%Y-%m-%d")

# Check if the current log file exists
if [ -f "$LOG_DIR/server.log" ]; then
    # Move the current log file to the archive directory with date suffix
    mv "$LOG_DIR/server.log" "$ARCHIVE_DIR/server_$CURRENT_DATE.log"
    # Compress the archived log file
    gzip "$ARCHIVE_DIR/server_$CURRENT_DATE.log"
    echo "Log rotated and archived as server_$CURRENT_DATE.log.gz"
fi

# Create a new empty log file
touch "$LOG_DIR/server.log"
echo "New log file created: server.log"
