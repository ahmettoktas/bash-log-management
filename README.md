# bash-log-management

## Overview

**This project contains a Node.js web server that generates daily log files and a log rotation script to manage those logs.**

    
`Imagine you are part of a system administration team responsible for managing a web server. The server generates log files daily, and you need to develop a Bash script to analyze these logs efficiently. The script should perform the following tasks:
* Log Rotation: Implement a log rotation mechanism that archives the current log file and creates a new one at the beginning of each day. Ensure that old log files are compressed and organized in a structured manner (e.g., archived in a separate directory).
* Automation: Ensure that the script can be scheduled to run daily using a cron job. The script should automatically locate the latest log file, process it, and generate reports without manual intervention.
`


