const Discord = require("discord.js");

const client = new Discord.Client();
let token = process.argv[2];
client.login(token);

const prefix = ["I'm", 'Im', 'im', "i'm", 'I’m'];
let commandBody;
client.on("message", function(message){
    if (message.author.bot) return;
    let startsWith = false;
    for (var i = 0; i < prefix.length; i++){
        if (message.content.startsWith(prefix[i])){
            startsWith = true;
        }
        if (startsWith) {
            commandBody = message.content.slice(prefix[i].length);
            break;
        }
    }
    if (startsWith){         
        if (commandBody.length < 32){
            message.member.setNickname(commandBody);
            message.reply(`Hi ${commandBody}, I'm a bot`);
        }
    } else {
        return;
    }
    
});