const debug = require('debug')('gelato');
const request = require('superagent');
let gelato = (key, options)=>{
	let opt = Object.assign(
		{}, 
		{url: process.env.NODE_ENV == 'production' ? 'https://api.gelato.com/v1/' : 'https://api-test.gelato.com/v1/'}, 
		options ? options: {}
	);
	let wrapRequest = (type, endpoint)=>{
		return request[type](opt.url + endpoint).set({
			'Content-Type': 'application/json',
			'X-API-KEY': key
		});
	}
	debug('Init options', opt);
	return {
		quote: (options) =>{
			debug('create quote promise with ', options);
			return wrapRequest('post', 'quote').send(options);
		},
		order: (id) =>{
			debug('create order promise with ', options);
			return wrapRequest('post', 'order/create').send({
				"promiseUid": id
			});
		},
		cancel: (id) =>{
			debug('create cancel promise with ', options);
			return wrapRequest('post', 'order/cancel').send({
				'orderReferenceId': id
			});
		},
		status: (id)=>{
			debug('create status promise with ', options);
			return wrapRequest('get', 'order/status/'+id);
		}
	}
};
module.exports = gelato;