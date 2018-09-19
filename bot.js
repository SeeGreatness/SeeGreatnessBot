const config = require('./config.Json');
const Discord = require('discord.js');
const client = new Discord.Client();
const token = config.token,
const prefix = config.prefix; // Set the prefix
client.on("ready", () => {	
    console.log(`${client.user.tag} Is Active!`);
    client.user.setPresence({game: {name: `with you!`, type: 1}});
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setStatus("idle");

});

//Constants 
const DailyRecently = new Set();
const talkedRecently = new Set();
//talkedRecently is the cooldown for all commands plz implement this shit and dont fuck it up :( lmao


//variables
var TalkIntetrval=60000;
var DailyIntetrval=60000;
//move these to the config.Json

//objects
const responseObject = {
  "ayy": "Ayy, lmao!",
  "wat": "Say what?",
  "lol": "roflmaotntpmp",
  "prefix":"the prefi is !"
};
//move this to its own file... call it hmm responseObject.Json



//commands

//this is the new command system DONT FUCK IT UP AGAIN!
  client.on("message", message => {
  // This is where we put our gay commands please make them not so gay.

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //only get the messages with the prefix
  const command = args.shift().toLowerCase();
  //change the command toLowerCase

	if (message.content.startsWith(prefix + "profile")||message.content === "+profile") {
  //if the message contains the prefix and the command is "profile"
    message.reply(message.author.avatarURL);
    // Send the user's avatar URL and Discord will automaticaly put a preview of the image in chat
    //upgrade this to embed the Object so we dont have to show the URL like we dont know how to do shit....

  }else
  //else if the message does not contains the prefix and the command is "profile"
  if(responseObject[message.content]) {
    //if the message does not contain the prefix but contains anything in the Json Array "responseObject" 
    message.channel.send(responseObject[message.content]);
    //send the result stored in the Json Array
  }else
  //else if that was not entered
   if(message.content.startsWith(prefix + "daily")||message.content === "+daily"){
  //check to see if the message contains the prefix and the command is "daily" OR if it contains "+daily"
       if (DailyRecently.has(message.author.id)) {
         //if the user ID is in the Array "DailyRecently"
         message.channel.send(message.author + " Wait 1 minute to claim again!");
    
       }else{
         // else if the user is not in the Array "DailyRecently"
           message.reply("you claimed your Daily come back in one minute to claim again!");
          //ping them a response
        DailyRecently.add(message.author.id);
          // Adds the user to the set so that they can't talk for a minute

        setTimeout(() => {
          // Removes the user from the set after a the set time interval
          DailyRecently.delete(message.author.id);
          //also send them a direct message letting them know they can daily again
        	message.author.send(message.author + " you may collect your daily now!");


        }, DailyIntetrval);
        //DailyIntetrval is a variable PLZ move this to the config file
        //also this might not work and cause errors :(
    }     
 }else
    if(message.content.startsWith(prefix + "cash")||message.content === "+cash"){
  //check to see if the message contains the prefix and the command is "cash" OR if it contains "+cash"
       if (talkedRecently.has(message.author.id)) {
         //if the user ID is in the Array "talkedRecently"
         message.channel.send(message.author + "you just checked your balance come back in one minute to check again!");
    
       }else{
         // else if the user is not in the Array "talkedRecently"
           message.reply("you have a million dollars :lmfao: ");
          //ping them a response
        talkedRecently.add(message.author.id);
          // Adds the user to the set so that they can't talk for a minute

        setTimeout(() => {
          // Removes the user from the set after a the set time interval
          talkedRecently.delete(message.author.id);

        }, TalkIntetrval);
        //TalkIntetrval is a variable PLZ move this to the config file
        //also this might not work and cause errors :(
    }     
 }else
  

 //else if the user used the prefix or basicaly sent any kind of message the bot can see \
 //exit
 //if it somehow causes an error then send a message saing so instead of crashing like a bitch
  if(message.content===null){
    message.channel.send("Unknown Command");
  }
  });

// THIS  MUST  BE  THIS  WAY 
client.login(process.env.BOT_TOKEN);
//dont reveal your token in your fucking code that public *facepalms*

