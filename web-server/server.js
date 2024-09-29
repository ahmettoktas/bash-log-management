const http = require('http');
const fs = require('fs');
const path = require('path');

// Define log file path
const logFilePath = path.join(__dirname, 'logs', 'server.log');

// Create server
const server = http.createServer((req, res) => {
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

    // Append the log message to the log file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
