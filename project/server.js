const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data from forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., CSS, JS, HTML)
app.use(express.static('public'));

// Endpoint to handle survey form submissions
app.post('/submit-survey', (req, res) => {
    const feedback = req.body;

    // Save feedback to a file
    fs.readFile('feedback.json', 'utf8', (err, data) => {
        let feedbacks = [];
        if (!err && data) {
            feedbacks = JSON.parse(data);
        }
        feedbacks.push(feedback);

        fs.writeFile('feedback.json', JSON.stringify(feedbacks, null, 2), (err) => {
            if (err) {
                console.error('Error saving feedback:', err);
                return res.status(500).send('Error saving feedback.');
            }
            res.status(200).send('Feedback submitted successfully!');
        });
    });
});

// Endpoint to get all feedback
app.get('/api/feedback', (req, res) => {
    fs.readFile('feedback.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading feedback:', err);
            return res.status(500).send('Error retrieving feedback.');
        }
        const feedbacks = JSON.parse(data || '[]');
        res.status(200).json(feedbacks);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});