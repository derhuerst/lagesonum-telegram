// index.js

var	config = require('config'),
	TelegramBot = require('node-telegram-bot-api'),
	token = config.telegramToken,
	request = {};

var bot = new TelegramBot(token, {
	polling: true
});

bot.onText(/\/.*/, function(msg) {
	var regex = /\/([^ ]+) (.*)/;
		commandwithVariable = msg.text.match(regex),
		console.log(commandwithVariable);
		command = commandwithVariable[1],
		string = commandwithVariable[2];
	console.log("message received: " + msg.text);
	console.log("command received: " + command);
	switch (command) {
		case "unsubscribe":
			return bot.sendMessage(msg.from.id, "unsubscribed: \"" + string + "\"");
			break;
		default:
			return bot.sendMessage(msg.from.id, "command: " + command);
			break;
	}
});

console.log("Bot is running");
