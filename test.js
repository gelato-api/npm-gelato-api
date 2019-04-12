const printApi = require("print-api")
const print = printApi('EFLDjI7hR6833ZSrLe8psZyFh5j6QKE2nWAkWOC3', { test: true });

/*

 Let's get example quote data
 Contains:
 - ReferenceIDs and currency
 - Product id, file and quantity
 - Destination and recipient information

*/
let example = print.example();
console.log('EXAMPLE REQUEST → ', example);

// Then we get a print quote for that data
print.quote(example).then((a)=>{
	// Service responds with possible shipments
    console.log('QUOTE RESPONSE', a.body);    
    // To place the order
    // Select one of the delivery promises from the quote shipments
    print.order(a.body.production.shipments[0].promiseUid).then((a)=>{
    	// If order is accepted it responds OK
        console.log('ORDER RESPONSE', a.body);
    });
    
}).catch(console.error)