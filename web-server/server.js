const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring'); // To parse form data

// Define log file path
const logFilePath = path.join(__dirname, 'logs', 'server.log');

// Create server
const server = http.createServer((req, res) => {
    const startTime = process.hrtime(); // Start timing the request
    const logData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        headers: req.headers,
    };

    if (req.method === 'GET') {
        // Serve the HTML form
        const htmlForm = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Data Collection Form</title>
            </head>
            <body>
                <h1>Enter Your Details</h1>
                <form method="POST" action="/submit">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required><br><br>
                    <label for="surname">Surname:</label>
                    <input type="text" id="surname" name="surname" required><br><br>
                    <label for="birthday">Birthday:</label>
                    <input type="date" id="birthday" name="birthday" required><br><br>
                    <input type="submit" value="Submit">
                </form>
            </body>
            </html>
        `;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(htmlForm);
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        // Collect the data from the form
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', () => {
            const parsedData = parse(body); // Parse the form data

            // Create a meaningful log entry
            const elapsedTime = process.hrtime(startTime); // Calculate elapsed time
            const responseTime = (elapsedTime[0] * 1e9 + elapsedTime[1]) / 1e6; // Convert to milliseconds

            const logMessage = `${logData.timestamp} - ${logData.method} ${logData.url} - Status: 200 - Response Time: ${responseTime.toFixed(3)}ms - User Agent: ${logData.headers['user-agent']} - Name: ${parsedData.name} - Surname: ${parsedData.surname} - Birthday: ${parsedData.birthday}\n`;

            // Append the log message to the log file
            fs.appendFile(logFilePath, logMessage, (err) => {
                if (err) {
                    console.error('Error writing to log file:', err);
                }
            });

            // Send a response back to the user
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Thank you for submitting your details!');
        });
    } else {
        // Handle 404 Not Found
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
