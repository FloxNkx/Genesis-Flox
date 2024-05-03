const express = require("express");

const app = express();
const port = 3000;

const TelegramBot = require('node-telegram-bot-api');
const token = '7027328313:AAHHm3ecQfr9FAxogo58K1-AumAsQ4-_xmw';
const bot = new TelegramBot(token, {polling: true});

// Endpoint to handle video upload
app.post("/sendMessage", async (req, res) => {
    try {
        bot.sendMessage('-1002119484659', 'Aga');

        res.status(200).send("Video uploaded successfully.");
    } catch (err) {
        console.error("Error uploading video:", err);
        res.status(500).send("Error uploading video.");
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
