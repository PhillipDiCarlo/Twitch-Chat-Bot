console.log("Twitch Bot Starting");

require("dotenv").config();
// csv = require('jquery-csv');


const tmi = require('tmi.js');
const fs = require('fs');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	},
	channels: [ 'italiandogs' ]
});


client.connect();

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

function randomIntFromInterval(min, max) { // min and max included 
	x = Math.floor(Math.random() * (max - min + 1) + min)
	return x * 1000

  }


  client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

    //tell chat gn
	if(message.toLowerCase() !== "") {
		// wait(4000);

		//write input to JSON file
		let input = {in: message};
		let data = JSON.stringify(input);
		fs.writeFileSync("inputText.json", data);

		//read from JSON file
		console.log("---reading from file---");
		wait(4000);
		let rawdata = fs.readFileSync('inputText.json'); //change file name
		let output = JSON.parse(rawdata);
		console.log(output['in']);
		client.say(channel, output['in']);

	 }
 
});





















// client.on('message', (channel, tags, message, self) => {
// 	// Ignore echoed messages.
// 	if(self) return;

//     //tell chat gn
// 	if(process.env.GN_MESSAGES.includes(message.toLowerCase())) {
// 		// wait(4000);
// 		const rndInt = randomIntFromInterval(5, 20)
// 		console.log(rndInt)
// 		//wait(rndInt)
// 		client.say(channel, `gn ${tags.username} pepeL`);
// 	 }

//     //i miss ockie
//     if(message.toLowerCase() === "ockie") {
// 		const rndInt = randomIntFromInterval(5, 20)
// 		console.log(rndInt)
// 		//wait(rndInt)
// 		client.say(channel, `I miss Ockie peepoSad`);
// 	 }

// 	 //rickroll
// 	 if(message.toLowerCase() === "cringe") {
// 		const rndInt = randomIntFromInterval(5, 20)
// 		console.log(rndInt)
// 		//wait(rndInt)
// 		client.say(channel, `https://www.youtube.com/watch?v=dQw4w9WgXcQ
// 		`);
// 	 }
// 	 //kekw
// 	 if(message.toLowerCase() === "kekw") {
// 		const rndInt = randomIntFromInterval(5, 20)
// 		console.log(rndInt)
// 		//wait(rndInt)
// 		client.say(channel, `@${tags.username} https://www.youtube.com/watch?v=mKue4WuagL8
// 		`);
// 	 }

	 
// });