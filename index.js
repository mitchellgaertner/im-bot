const Discord = require("discord.js");

const client = new Discord.Client();
let token = process.argv[2];
client.login(token);

const prefix = ["I'm", 'Im', 'im', "i'm"];

client.on("message", function(message){
    if (message.author.bot) return;
    let startsWith = false;
    for (var i = 0; i < prefix.length; i++){
        startsWith = message.content.startsWith(prefix[i]);
        if (startsWith) break;
    }
    if (startsWith){
        const commandBody = message.content.slice(prefix.length);
        if (commandBody.length < 32){
            message.member.setNickname(commandBody);        
        }
    } else {
        return;
    }
    
});

