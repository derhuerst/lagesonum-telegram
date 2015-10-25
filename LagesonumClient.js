var url =			require('url');
var request =		require('request-promise');





module.exports = {



	lagesonum:	null,



	init: function (lagesonum) {
		this.lagesonum = url.format({
			hostname:		lagesonum.hostname,
			port:			lagesonum.port,
			pathname:		lagesonum.pathname,
		});

		return this;
	},



	subscriptions: function (user) {
		return request({
			method:			'POST',
			uri:			this.lagesonum,
			json:			true,
			body: {
				userid:		user,
				list:		true
			}
		});
	},

	subscribe: function (user, ticket) {
		return request({
			method:			'POST',
			uri:			this.lagesonum,
			json:			true,
			body: {
				userid:		user,
				ticket:		ticket,
				subscribe:	true,
				language:	'en_US'
			}
		});
	},

	unsubscribe: function (user, ticket) {
		return request({
			method:			'POST',
			uri:			this.lagesonum,
			json:			true,
			body: {
				userid:		user,
				ticket:		ticket,
				subscribe:	false
			}
		});
	},

	unsubscribeAll: function (user) {
		return request({
			method:			'POST',
			uri:			this.lagesonum,
			json:			true,
			body: {
				userid:		user,
				subscribe:	false
			}
		});
	}



};
