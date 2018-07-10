const printApi = require("print-api")
const print = printApi('EFLDjI7hR6833ZSrLe8psZyFh5j6QKE2nWAkWOC3', { test: true });
let example = print.example();
console.log(example);
// Get a print quote
print.quote(example).then((a)=>{
    console.log(a.headers, a.body)
}).catch(console.error)
