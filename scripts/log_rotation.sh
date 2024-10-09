#!/bin/bash

LOG_DIR="/path/to/your/project/logs"
ARCHIVE_DIR="/path/to/your/project/logs/archive"

mkdir -p "$ARCHIVE_DIR"

CURRENT_DATE=$(date +"%Y-%m-%d")

if [ -f "$LOG_DIR/server.log" ]; then
    mv "$LOG_DIR/server.log" "$ARCHIVE_DIR/server_$CURRENT_DATE.log"
    gzip "$ARCHIVE_DIR/server_$CURRENT_DATE.log"
    echo "Log rotated and archived as server_$CURRENT_DATE.log.gz"
fi

touch "$LOG_DIR/server.log"
echo "New log file created: server.log"
