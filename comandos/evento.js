//principais
const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")

//database
const mongoose = require("mongoose")
mongoose.connect(config.mongolink, {
    useNewUrlParser: true
})
const db_config = require("../models/config.js")
const staff_list = require("../models/staff-list.js")
const regras = require("../models/regras.js")
const mute = require("../models/mute.js")
const userinfo = require("../models/userinfo.js")
const warns = require("../models/warns.js")
const loja_tags = require("../models/loja-tags.js")
const eco = require("../models/eco.js")

const color = require('cli-color')

exports.run = (client, message) => {
    const eventos = require("../models/eventos.js")
    eventos.find({}, (err, result) => {
        if (result.length > 0) {
            const embed = new Discord.RichEmbed()
                .setColor('#FFD700')
                .setTitle('Eventos')
                .setDescription(`***Como funciona o evento:\n\nSempre que alguem mandar uma mensagem eu retiro 1 ponto da meta, quando alguem mandar a mensagem que fazer chegar a 0 pontos essa pessoa é o vencedor!***`)
            result.forEach((v1, i1) => {
                if (i1 < 1) {
                    embed.addField(`🔰Evento`, `***Faltam ${v1.msgs} mensagens para ser concluido!***`)
                }
            })
            if(result.length>1){
                embed.setFooter(`Tem mais ${result.length-1} eventos programados para acontecer depois deste!`, client.user.displayAvatarURL)
            }
            message.channel.send(embed)
        } else {
            const embed = new Discord.RichEmbed()
                .setColor('#FFD700')
                .setTitle('Eventos')
                .setDescription(`${message.member}**, Não temos eventos no momento!**`)
            message.channel.send(embed)
        }
    })
}

module.exports.help = {
    name: '/evento/'
}