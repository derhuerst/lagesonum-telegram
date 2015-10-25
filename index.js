// index.js

var	config = require('config'),
	shortid = require('shortid'),
	requester = require('request'),
	TelegramBot = require('node-telegram-bot-api'),
	token = config.telegramToken;

var bot = new TelegramBot(token, {
	polling: true
});

bot.onText(/\/subscribe (.+)/, function(msg, match) {
	var ticket = match[1];

	if (checkTicket(ticket)) {
		var request = {
			"userid": msg.from.id,
			"ticket": ticket,
			"subscribe": true,
			"language": "en_US"
		};
		if (sendRequest(request) !== false) {
			return bot.sendMessage(msg.from.id, "Successfully subscribed to ticket: \"" + ticket + "\"");
		} else {
			return bot.sendMessage(msg.from.id, "There was an error.");
		}
	} else {
		return bot.sendMessage(msg.from.id, "Wrong ticket format. Tickets have this format: B123");
	}
});

bot.onText(/\/unsubscribe (.+)/, function(msg, match) {
	var ticket = match[1];

	if (checkTicket(ticket)) {
		var request = {
			"userid": msg.from.id,
			"ticket": ticket,
			"subscribe": false
		};
		if (sendRequest(request) !== false) {
			return bot.sendMessage(msg.from.id, "Successfully unsubscribed from ticket: \"" + ticket + "\"");
		} else {
			return bot.sendMessage(msg.from.id, "There was an error.");
		}
	} else {
		return bot.sendMessage(msg.from.id, "Wrong ticket format. Tickets have this format: B123");
	}
});

bot.onText(/\/stop/, function(msg) {
	var request = {
		"userid": msg.from.id,
		"subscribe": false
	};
	if (sendRequest(request) !== false) {
		return bot.sendMessage(msg.from.id, "Successfully unsubscribed from all tickets.");
	} else {
		return bot.sendMessage(msg.from.id, "There was an error.");
	}
});

bot.onText(/\/tickets/, function(msg) {
	var request = {
		"userid": msg.from.id,
		"list": true
	};
	var tickets = sendRequest(request);
	if (tickets !== false) {
		return bot.sendMessage(msg.from.id, "You are currently subscribed to these tickets: \n" + tickets.join("\n"));
	} else {
		return bot.sendMessage(msg.from.id, "There was an error.");
	}
});

bot.onText(/\/(?!subscribe|unsubscribe|stop|tickets)[a-z0-9]+/, function(msg) {
	return bot.sendMessage(msg.from.id, "unknown command!"); // + usage
});

function checkTicket(ticket) {
	if (ticket.match(/[A-Za-z][0-9]{3}/)) {
		var request = {
			"search": true,
			"ticket": ticket
		};
		if (sendRequest(request) !== false) {
			return true;
		}
	} else {
		return false;
	}
}

function sendRequest(request) {
	request.requestid = shortid.generate();
	console.log(request);
	requester.post({
		json: true,
		url: 'localhost:1234',
		body: request
	}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				if (body.requestid === request.requestid && body.success === true) {
					console.log(body);
					return body.data;
				} else {
					// send a message to the developer
					console.log(body);
					return false;
				}
			} else {
				console.log(response);
				return false;
			}
		}
	);
}

console.log("Bot is running");
