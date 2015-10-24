// index.js

var	config = require('config'),
	TelegramBot = require('node-telegram-bot-api'),
	token = config.get('telegramToken');

var bot = new TelegramBot(token, {
	polling: true
});

bot.onText(/.*/, function(msg) {
	console.log(msg);
	return bot.sendMessage(msg.from.id, 'bla');
});

console.log("Server is running");