import TeleBot from "node-telegram-bot-api";
import videoController from "./video.controller.js";

const sendStartMessage = async (req, res) => {
    try {
        const bot = new TeleBot(process.env.BOT_TOKEN);
        const chatId = process.env.BOT_CHAT_ID;

        bot.sendMessage(chatId, `\t<b>Вітаємо в Genesis!</b> 🤖
        \nЦе cистема захисту в екстрених ситуаціях. Вона автоматично записує відео у випадку виникнення екстрених обставин та надсилає його на безпечний сервер. Ви можете бути спокійні, оскільки відео буде відправлено вам у Telegram лише раз на 24 години, якщо воно існує. 📹
        \nМи сподіваємося, що вам ніколи не доведеться бачити жодного відео. Бот надішле відео у цей чат, в разі виникнення критичної ситуації. Будь ласка, використайте відео з максимальною ефективністю і донесіть правду до суспільства. 🛡️
        \nНехай ваша безпека завжди буде на першому місці! Щасливого користування! 🚀`, { parse_mode: "HTML" })
        res.send("Message sent to bot!");
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const sendMessage = async (req, res) => {
    try {
        const bot = new TeleBot(process.env.BOT_TOKEN);
        const chatId = process.env.BOT_CHAT_ID;

        const videos = await videoController.getLastVideo();

        if (!videos.length) {
            res.send("No video");
            return;
        }

        videos?.forEach((item) => {
            return bot.sendMessage(
                chatId,
                `Link to video: <a href="https://www.genesis-beige.vercel.app/api/v1/main/video/${item.fileId}">Click</a>`,
                { parse_mode: "HTML" }
            );
        });

        res.send("Message sent to bot!");
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export default { sendMessage, sendStartMessage };
