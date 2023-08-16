const express = require('express');
const mysql = require('mysql');
const openai = require('openai');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',     // Replace with your database host
    user: 'root', // Replace with your database username
    password: '123456', // Replace with your database password
    database: 'RatingSystem'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database.');
});

const apiKey = 'your_openai_api_key';
openai.apiKey = apiKey;

app.post('/submit-feedback', (req, res) => {
	console.log('Bhaiya call hua h .');
    const { rating, feedback,resturantName } = req.body;
    const sql = 'INSERT INTO ratings (rating, feedback,resturantName) VALUES (?, ?,?)';
    db.query(sql, [rating, feedback,resturantName], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error storing feedback data.' });
        } else {
            console.log('Feedback data stored successfully.');
            res.status(200).json({ message: 'Feedback data stored successfully.' });
        }
    });
    
    // // Analyze feedback using GPT-3
    // openai.Completion.create({
        // prompt: feedback,
        // max_tokens: 50
    // })
    // .then(response => {
        // const chatbotResponse = response.choices[0].text;
        // console.log('Chatbot Response:', chatbotResponse);
        // // Display the chatbot response on the page
        // res.status(200).json({ message: 'Feedback data stored successfully.', chatbotResponse });
    // })
    // .catch(error => {
        // console.error('Error:', error);
    // });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}); chek it and fix it