const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.BOT_TOKEN;
const prefix = "!"; // Set the prefix

client.on("ready", () => {	
client.user.setStatus("dnd");
    console.log(`${client.user.tag} Is Active!`);
client.user.setStatus("idle");
    client.user.setPresence({game: {name: `with you!`, type: 1}});
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
   client.user.setStatus("online");

});



const responseObject = {
  "ayy": "Ayy, lmao!",
  "wat": "Say what?",
  "lol": "roflmaotntpmp",
  "!Invite":"http://www.tinyurl.com/PokemonGoAITrainer",
  "!invite":"http://www.tinyurl.com/PokemonGoAITrainer",
  "+cash":"Stop it your not rich!"
};
const talkedRecently = new Set();


//adding new code to replace the current command system
  client.on("message", message => {
	  
  // This is where we'll put our code.

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

	if (message.content.startsWith(prefix + "profile")||message.content === "+profile") {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }else
  if(responseObject[message.content]) {
    message.channel.send(responseObject[message.content]);
  }else
   if(message.content.startsWith(prefix + "daily")||message.content === "+daily"){

       if (talkedRecently.has(message.author.id)) {
         message.channel.send(message.author + " Wait the cool down to claim again!");
    
       }else{
           // the user can type the command ... your command code goes here :)
           message.reply("you claimed your Daily come back after the cooldown to claim again! I will send you a message when you can collect!");
        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
	message.author.send(message.author + " you may collect your daily now!");


        }, 72000000);
    }     
 }else       
  if(message.content===null){
    message.channel.send("Unknown Command");
  }
  });

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
