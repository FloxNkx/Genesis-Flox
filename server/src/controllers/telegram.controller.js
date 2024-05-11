import TeleBot from 'node-telegram-bot-api';
import videoController from "./video.controller.js";

const sendMessage = async (req, res) => {
    try {      
        const bot = new TeleBot(process.env.BOT_TOKEN);
        const chatId = process.env.BOT_CHAT_ID;

        const videos = await videoController.getLastVideo()

        if(!videos.length) {
            res.send('No video');
            return;
        }

        videos?.forEach(item => {
            return bot.sendMessage(chatId, `Link to video: <a href="https://www.genesis-beige.vercel.app/api/v1/main/video/${item.fileId}">Click</a>`,{ parse_mode : "HTML" })
        })

        res.send('Message sent to bot!');
    } catch (error) {
        res.status(500).json({ error: error })
    }
};

export default { sendMessage };
