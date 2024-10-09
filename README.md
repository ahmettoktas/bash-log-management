# Bash Log Management Web Server

This project is a web server built with Node.js that collects user data through a form, logs requests and form submissions, and generates daily reports based on the logged data.

## Features

- **User Data Collection**: Gathers user information such as name, surname, and birthday.
- **Logging**: Logs all HTTP requests and form submissions to separate log files named with the date.
- **Log Rotation**: Automatically rotates log files daily.
- **Reporting**: Generates daily reports summarizing user visits, unique visitors, form submissions, and browser statistics.
- **Data Analysis**: Analyzes logged data to provide insights on user behavior and technology usage.


```bash
Imagine you are part of a system administration team responsible for managing a web server. 
The server generates log files daily, and you need to develop a Bash script to analyze these logs efficiently. 
The script should perform the following tasks:

* Log Rotation: Implement a log rotation mechanism that archives the current log file and creates a new one at the beginning of each day. 
    Ensure that old log files are compressed and organized in a structured manner (e.g., archived in a separate directory).
* Automation: Ensure that the script can be scheduled to run daily using a cron job. 
    The script should automatically locate the latest log file, process it, and generate reports without manual intervention.
```

## Setting Up Cron Jobs

To set up the daily log rotation, you can run the following script:

```bash
chmod +x scripts/setup_crontab.sh
./scripts/setup_crontab.sh
```

## How to Work with Web Server

```bash
node web-server/server.js
```

## How to get reports manually

```bash
node web-server/reports.js
```