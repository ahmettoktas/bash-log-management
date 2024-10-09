const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, 'logs');
const REPORTS_DIR = path.join(__dirname, 'reports');

const today = new Date();
const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD

const logFilePath = path.join(LOG_DIR, `server-${dateString}.log`);

const reportFilePath = path.join(REPORTS_DIR, `report-${dateString}.txt`);

const generateReport = () => {
    fs.access(logFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Log file for ${dateString} not found. Please ensure the log rotation script has run.`);
            return;
        }

        fs.readFile(logFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading log file: ${err.message}`);
                return;
            }

            const logEntries = data.trim().split('\n');
            const totalVisits = logEntries.length;
            const users = new Set();
            const browserStats = {};
            const visitTimes = [];
            const formSubmissions = [];

            logEntries.forEach((entry) => {
                const timestampMatch = entry.match(/\[(.*?)\]/);
                const userAgentMatch = entry.match(/User-Agent: (.*?)(?:,|$)/);
                const nameMatch = entry.match(/Name: (.*?)(?:,|$)/);
                const surnameMatch = entry.match(/Surname: (.*?)(?:,|$)/);
                const birthdayMatch = entry.match(/Birthday: (.*?)(?:,|$)/);

                if (timestampMatch) {
                    visitTimes.push(timestampMatch[1]);
                }

                if (nameMatch && surnameMatch && birthdayMatch) {
                    const userInfo = {
                        name: nameMatch[1].trim(),
                        surname: surnameMatch[1].trim(),
                        birthday: birthdayMatch[1].trim(),
                        userAgent: userAgentMatch ? userAgentMatch[1].trim() : 'Unknown'
                    };
                    users.add(userInfo.name);
                    formSubmissions.push(userInfo);
                }

                if (userAgentMatch) {
                    const userAgent = userAgentMatch[1].trim();
                    const browserMatch = userAgent.match(/(Firefox|Chrome|Safari|MSIE|Trident|Opera)[\/\s]?([\d.]+)/);
                    const browserKey = browserMatch ? `${browserMatch[1]} (${browserMatch[2]})` : 'Unknown Browser';
                    browserStats[browserKey] = (browserStats[browserKey] || 0) + 1;
                }
            });

            const uniqueUsers = users.size;

            let report = `Daily Report for ${dateString}\n\n`;
            report += `Total Visitors: ${totalVisits}\n`;
            report += `Unique Visitors: ${uniqueUsers}\n\n`;

            report += `Form Submissions:\n`;
            formSubmissions.forEach((submission, index) => {
                report += `${index + 1}. Name: ${submission.name}, Surname: ${submission.surname}, Birthday: ${submission.birthday}, User-Agent: ${submission.userAgent}\n`;
            });
            report += `\n`;

            report += `Browser Statistics:\n`;
            for (const [key, count] of Object.entries(browserStats)) {
                report += `${key}: ${count}\n`;
            }
            report += `\n`;

            if (visitTimes.length > 0) {
                report += `Visit Timestamps:\n`;
                visitTimes.forEach((time, index) => {
                    report += `${index + 1}. ${time}\n`;
                });
            } else {
                report += `No visit timestamps available.\n`;
            }

            fs.writeFile(reportFilePath, report, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing report file: ${err.message}`);
                } else {
                    console.log(`Report saved to: ${reportFilePath}`);
                }
            });
        });
    });
};

generateReport();
