import TeleBot from 'telebot';
import videoController from "./video.controller.js";

const bot = new TeleBot(process.env.BOT_TOKEN);
const chatId = process.env.BOT_CHAT_ID;

const sendMessage = async (req, res, bucket) => {
    try {
        const video = await videoController.getLastVideo()

        video.forEach(item => {
            return bot.sendMessage(chatId, `Link to video: [click](https://www.genesis-beige.vercel.app/api/v1/main/video/${item.fileId}/)`, { parseMode: 'Markdown' })
        })
        // bot.sendMessage(chatId, '1');

        res.send('Message sent to bot!');
    } catch (error) {
        res.status(500).json({ error: error })
    } finally {
        console.log(2)
    }
};

export default { sendMessage };
