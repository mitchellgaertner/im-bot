const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//Discord set up
const Discord = require("discord.js");
const client = new Discord.Client();
let token = process.argv[2];

client.login(token);

let timedOut = [];


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

//Discord Bot
const prefix = ["I'm", 'Im', 'im', "i'm", 'I’m','iM', 'IM', "I'M", "i'M",'i’M','I’M'];
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
    if (startsWith && !timedOut.includes(message.member.id)){         
        if (commandBody.length < 32){
            message.member.setNickname(commandBody);
            message.reply(`Hi ${commandBody}, I'm a bot`);
            timedOut.push(message.member.id);
            setTimeout(function(){
                timedOut = timedOut.filter(id => value != message.member.id)
            }, 60000)
        }
    } else if (timedOut.includes(message.member.id)) {
        message.reply(`Hi ${commandBody}, I thought you were ${message.member.nickname}?`);
    } else {
        return;
    }
    
});
