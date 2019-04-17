const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")
exports.run = (client, message) => {
    const moment = require("moment")
    moment.locale('pt-BR')
    const uptime = Math.floor(client.uptime)
    const horas = Math.floor(uptime / 3600000)
    const temp_a = Math.floor(uptime - (horas * 3600000))
    const minutos = Math.floor(temp_a / 60000)
    const temp_b = Math.floor(temp_a - (minutos * 60000))
    const segundos = Math.floor(temp_b / 1000)

    const emoji_js = client.emojis.find(a => a.name === 'nodejs')

    const aa = '``'
    fs.readdir("./comandos/", (err, files) => {
        const comandos = files.filter(a => a.split('.').pop() === 'js').length

        const embed = new Discord.RichEmbed(client, message)
            .setTimestamp(message.createdAt)
            .setColor('#00FF7F')
            .setDescription(`
            ***__SOBRE__***
            O meu prefixo é **${config.prefix}**
            **Eu possuo ${comandos} comandos**

            ***__Desenvolvedor:__***
            **VacuousPatter#4993**

            **Linguagem: ${emoji_js}**
            **Versão: 9.0 [changelog](https://pastebin.com/raw/ERJ4PrAp)**

            **Pacotes usados:**
            **__discord.js:__ 11.4.2**
            **__moment:__ 2.23.0**
            **__Mongoose:__ 5.4.2**

            **Links Uteis:**
            [Convite do bot](https://discordapp.com/oauth2/authorize?client_id=523614773091500054&scope=bot&permissions=2146958847)
            [Changelog](https://pastebin.com/raw/ERJ4PrAp)
            [Servidor De Suporte](https://discord.gg/BaYKZh)

            **Estou online ${moment(client.readyTimestamp, 'x').fromNow()}**`)
            .setThumbnail(client.user.avatarURL)
            .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
            .setTimestamp(message.createdAt)
        message.channel.send(embed)
    })
}

module.exports.help = {
    name: '/sobre/'
}