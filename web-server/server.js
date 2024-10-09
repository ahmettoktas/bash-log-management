const http = require('http');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const getLogFilePath = () => {
    const today = format(new Date(), 'yyyy-MM-dd'); // Format: YYYY-MM-DD
    const logDir = path.join(__dirname, 'logs');

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    return path.join(logDir, `server-${today}.log`);
};

const logToFile = (data) => {
    const logFilePath = getLogFilePath();

    fs.appendFileSync(logFilePath, `${data}\n`, (err) => {
        if (err) throw err;
    });
};

const logRequest = (req) => {
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';
    const acceptLanguage = req.headers['accept-language'] || 'Unknown Language';
    const deviceInfo = {
        method: req.method,
        url: req.url,
        userAgent: userAgent,
        acceptLanguage: acceptLanguage,
        device: req.headers['sec-ch-ua-platform'] || 'Unknown Device',
        mobile: req.headers['sec-ch-ua-mobile'] || 'Unknown Mobile Status',
        browser: req.headers['sec-ch-ua'] || 'Unknown Browser',
    };

    const logEntry = `[${new Date().toISOString()}] ${deviceInfo.method} request to ${deviceInfo.url}, ` +
        `Browser: ${deviceInfo.browser}, Device: ${deviceInfo.device}, ` +
        `Mobile: ${deviceInfo.mobile}, Language: ${deviceInfo.acceptLanguage}, ` +
        `User-Agent: ${deviceInfo.userAgent}`;

    logToFile(logEntry);
};

const server = http.createServer((req, res) => {
    logRequest(req);

    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
      <form action="/submit" method="POST">
        Name: <input type="text" name="name"><br>
        Surname: <input type="text" name="surname"><br>
        Birthday: <input type="date" name="birthday"><br>
        <input type="submit" value="Submit">
      </form>
    `);
        res.end();
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedData = new URLSearchParams(body);
            const name = parsedData.get('name');
            const surname = parsedData.get('surname');
            const birthday = parsedData.get('birthday');

            const logEntry = `[${new Date().toISOString()}] Form Submission - Name: ${name}, Surname: ${surname}, Birthday: ${birthday}, ` +
                `User-Agent: ${req.headers['user-agent']}`;
            logToFile(logEntry);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Thank you for submitting your data!');
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('Page not found');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
