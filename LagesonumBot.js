// LagesonumBot.js

var redis = require('redis');

module.exports = {
	redis: null,
	init: function() {
		return this.redis = redis.createClient();
	},
	addSubscriber: function(ticket, userid) {

	},
	removeSubscriber: function(ticket, userid) {

	},
	notify: function(ticket) {

	}
};