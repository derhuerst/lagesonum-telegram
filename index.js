// index.js

var	config = require('config'),
	shortid = require('shortid'),
	request = require('request'),
	TelegramBot = require('node-telegram-bot-api'),
	token = config.telegramToken;

var request = {
		"requestid": "",
		"language": "de_DE",
		"tickets": [],
		"subscribe": false
	};

var bot = new TelegramBot(token, {
	polling: true
});

bot.onText(/\/subscribe (.+)/, function(msg, match) {
	var arg = match[1];

	if (checkTicket(arg)) {
		request.requestid = shortid.generate();
		request.subscribe = true;
		request.tickets.push(arg);
		console.log(request);
		// send request
		return bot.sendMessage(msg.from.id, "Successfully subscribed to ticket: \"" + arg + "\"");
	} else {
		return bot.sendMessage(msg.from.id, "Wrong ticket format. Tickets have this format: B123");
	}
});

bot.onText(/\/unsubscribe (.+)/, function(msg, match) {
	var arg = match[1];

	if (checkTicket(arg)) {
		request.requestid = shortid.generate();
		request.tickets.push(arg);
		console.log(request);
		// send request
		return bot.sendMessage(msg.from.id, "Successfully unsubscribed from ticket: \"" + arg + "\"");
	} else {
		return bot.sendMessage(msg.from.id, "Wrong ticket format. Tickets have this format: B123");
	}
});

bot.onText(/\/(?!subscribe|unsubscribe)[a-z0-9]+/, function(msg, match) {
	return bot.sendMessage(msg.from.id, "unknown command!"); // + usage
});

function checkTicket(arg) {
	return arg.match(/[A-Za-z][0-9]{3}/);
}

console.log("Bot is running");
