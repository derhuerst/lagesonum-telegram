// index.js

var	config = require('config'),
	TelegramBot = require('node-telegram-bot-api'),
	token = config.get('telegramToken');

var bot = new TelegramBot(token, {
	polling: true
});

bot.onText(/.*/, function(msg) {
	console.log(msg);
	return bot.sendMessage(post.userid post.text);
});

bot.onText(/STOP B123/, function(msg) {
	console.log(msg);
	server.send('stop')
	return bot.sendMessage(post.userid post.text);
});

console.log("Server is running");