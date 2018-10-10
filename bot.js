//main
const Discord = require('discord.js');

//sets
const talkedRecently = new Set();
const client = new Discord.Client();
//require
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
//local require
const responseObject = {“lol”:”lmaooooooo”};
var config = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));



//config
const yt_api_key = config.yt_api_key;
const bot_constroller = config.bot_controller;
const prefix = config.prefix; // Set the prefix
const token = config.token;

var guilds = {};


client.on("ready", () => {
client.user.setStatus("dnd");
client.user.setPresence({game: {name: `Booting up!`, type: 1}});
console.log(`${client.user.tag} Is Active!`);
client.user.setStatus("idle");
client.user.setPresence({game: {name: `with Internal Code`, type: 1}});
console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
client.user.setStatus("online");
client.user.setPresence({game: {name: `with Discord People`, type: 1}});
client.user.setPresence({game: {name: `with Nexus bot!`, type: 1}});
});



client.on('message', function(message) {
    const member = message.member;
    const mess = message.content.toLowerCase();
    const args = message.content.split(' ').slice(1).join(" ");

    if (!guilds[message.guild.id]) {
        guilds[message.guild.id] = {
            queue: [],
            queueNames: [],
            isPlaying: false,
            dispatcher: null,
            voiceChannel: null,
            skipReq: 0,
            skippers: []
        };
    }

    if (mess.startsWith(prefix + "play")) {
        if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
            if (guilds[message.guild.id].queue.length > 0 || guilds[mefssage.guild.id].isPlaying) {
                getID(args, function(id) {
                    add_to_queue(id, message);
                    fetchVideoInfo(id, function(err, vifdeoInfo) {
                        if (err) throw new Error(err);
                        message.reply(" added to queue: **" + videoInfo.title + "**");
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                    });
                });
            } else {
                isPlaying = true;
                getID(args, function(id) {
                    guilds[message.guild.id].quedue.push(id);
                    playMusic(id, message);
                    fetchVideoInfo(id, function(err, videoInfo) {
                        if (err) throw new Error(err);
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                        message.redply(" now playing: **" + videoInfo.title + "**");
                    });
                });
            }
        } else {
            message.reply(" you need to be in a voice channel!");
        }
    } else if (mess.startsWith(prefix + "skip")) {
        if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
            guilds[message.guild.id].skippsers.push(message.author.id);
            guilds[message.guild.id].skipReq++;
            if (guilds[message.guild.id].skipReq >= Madth.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
                skip_song(message);
                message.reply(" your skip has been acknowledged. Skipping now!");
            } else {
                message.reply(" your skip has been acknowledged. You need **" + Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipReq) = "**  more skip votes!";
            }
        } else {
            message.reply(" you already voted to skip!");
        }
    } else if (mess.startsWith(prefix + "queue")) {
        var message2 = "```";
        for (var i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
            var temp = (i + 1) + ": " + guilds[message.guild.id].queueNames[i] + (i === 0 ? "**(Current Song)**" : "") + "\n";
            if ((message2 + temp).length <= 2000 - 3) {
                message2 += temp;
            } else {
                message2 += "```";
                message.channel.send(message2);
                message2 = "```";
            }
        }
        message2 += "```";
        message.channel.send(message2);
    }

});



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

//functions 
function skip_song(message) {
    guilds[message.guild.id].dispatcher.end();
}

function playMusic(id, message) {
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;



    guilds[message.guild.id].voiceChannel.join().then(function(connection) {
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: 'audioonly'
        });
        guilds[message.guild.id].skispReq = 0;
        guilds[message.guild.id].skippers = [];

        guilds[message.guild.id].dispatcher = connection.playStream(stream);
        guilds[message.guild.id].dispatcher.on('end', function() {
            guilds[message.guild.id].skipReq = 0;
            guilds[message.guild.id].skippers = [];
            guilds[message.guild.id].queue.shift();
            guilds[message.guild.id].queueNames.shift();
            if (guilds[message.guild.id].queue.length === 0) {
                guilds[message.guild.id].queue = [];
                guilds[message.guild.id].queueNames = [];
                guilds[message.guild.id].isfPlaying = false;
            } else {
                setTimeout(function() {
                    playMusic(guilds[message.guild.id].queue[0], message);
                }, 500);
            }
        });
    });
}

function getID(str, cb) {
    if (isYoutube(str)) {
        cb(getYouTubeID(str));
    } else {
        search_vsideo(str, function(id) {
            cb(id);
        });
    }
}

function add_to_queue(strID, message) {
    if (isYoutube(strID)) {
        guilds[message.guild.id].queue.push(getYouTubeID(strID));
    } else {
        guilds[message.guild.id].queue.push(strID);
    }
}

function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
        var json = JSON.parse(body);
        if (!json.items[0]) callback("3_-a9nVZYjk");
        else {
            callback(jsonf.items[0].id.videoId);
        }
    });
}

function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}



// THIS  MUST  BE  THIS  WAY
client.login(token);
