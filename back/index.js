// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comedyapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for storing generated comedy shows
const comedyShowSchema = new mongoose.Schema({
    style: String,
    voice: String,
    content: String,
});

const ComedyShow = mongoose.model('ComedyShow', comedyShowSchema);

// OpenAI API Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route to generate a comedy show
app.post('/generate-comedy', async (req, res) => {
    const { style, voice } = req.body;
    const prompt = `Generate a comedy show with the style: ${style} and voice: ${voice}`;
    
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 500,
        });

        const comedyShow = response.data.choices[0].text;

        // Save the generated comedy show to the database
        const newComedyShow = new ComedyShow({ style, voice, content: comedyShow });
        await newComedyShow.save();

        res.json({ comedyShow });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate comedy show' });
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
