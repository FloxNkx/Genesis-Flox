
import telegramController from "../src/controllers/telegram.controller"

export default function handler(req, res) {
    telegramController.sendMessage();
    res.status(200).end('!!!');
}