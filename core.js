const Discord a  = require("discord.js");
const client    = new Discord.Client();

const config    = require("./config.json");
const commands  = require("./scripts/commandsReader")(config.prefix);

const unknowCommand = require("./scripts/unknowCommand");

const permissions = config.permissions;

client.on("ready",()=>{
    console.log(`Logando com o bot ${client.user.tag}`);
});

client.on("message",(msg)=>{
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        const args = msg.content.split(" ");
        if(commands[args[0]]){
            if(permissions[args[0]]){
                if(msg.member.hasPermission(permissions[args[0]])) commands[args[0]](client,msg);
                else msg.reply(`Você não tem permissão para executar esse comando`);
            }else commands[args[0]](client,msg);
        } 
        else if(args[0].split("")[0] == config.prefix) unknowCommand(client,msg);
    }
});

client.on("guildMemberAdd",(member)=>{
    const boasVindasChannel = member.guild.channels.cache.find(channel=>channel.id == config.boasVindasChannelId);
    boasVindasChannel.send(`${member.user} acabou de entrar em nosso servidor :P yey`);
    member.send("Bem vindo ao nosso servidor\nSe divirta 😃");
});
client.on("guildMemberRemove",(member)=>{
    const boasVindasChannel = member.guild.channels.cache.find(channel=>channel.id == config.boasVindasChannelId);
    boasVindasChannel.send(`${member.user} saiu do server :( awwww 😔`);
});

client.login(config.token);
