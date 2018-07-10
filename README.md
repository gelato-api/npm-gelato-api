# npm-gelato-api

Promise wrapper for interacting with Gelato Print API

```
const gelato = require('print-api')('<YOUR API KEY>');

```

## Example Usage
```
gelato.quote({
	order: {...}, product: {...}, recipient: {...}
}).then(r=>{
	console.log(r.body);
}).catch(console.error)

```

## Methods

### Example
Get an example request body for a quote request

```
gelato.example()
```

### Quote
Get a price and delivery quote for the specified product

```
gelato.quote(<options>)
```

### Order
Place an order with a specific price and delivery promise
```
gelato.order(<promiseUid>)
```

### Status
Check status of an order
```
gelato.status(<orderReferenceId>)
```

### Cancel
Cancel an order, available until the Job is sent for printing
```
gelato.cancel(<orderReferenceId>)
```
