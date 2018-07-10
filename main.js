const debug = require('debug')('gelato');
const request = require('superagent');
let gelato = (key, options)=>{
	let opt = Object.assign(
		{}, 
		{url: options.test ? 'https://api-test.gelato.com/v1/' : 'https://api.gelato.com/v1/'}, 
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
		example: (type)=>{
			if(type == 'quote'){
				let dummyReference = new Date().valueOf();
				return {
				    "order": {
				        "orderReferenceId": dummyReference,
				        "customerReferenceId": dummyReference+'21',
				        "currencyIsoCode": "USD"
				    },
				    "recipient": {
				        "countryIsoCode": "NO",
				        "firstName": "Vitalii",
				        "lastName": "Nilsen",
				        "addressLine1": "Sunlia 22A",
				        "addressLine2": "",
				        "city": "Nesoya",
				        "postcode": "1397",
				        "email": "email@company.com",
				        "phone": "+47132113321"
				    },
				    "product": {
				        "itemReferenceId": dummyReference+'332221',
				        "productUid": "cards_pf_a5_pt_350-gsm-coated-silk_cl_4-4_ver",
				        "pdfUrl": "http://developers.gelato.com/documentation/v1/images/products/cards_a5_4-4.pdf",
				        "quantity": 100
				    }
				}
			}
		},
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