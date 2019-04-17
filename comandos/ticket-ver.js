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
    const tickets = require("../models/tickets.js")
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    if (args.slice(1, 2).join(' ')) {
        const id = args.slice(1, 2).join(' ')
        tickets.findOne({ guildid: message.guild.id, id: id }, (err, result) => {
            if (result) {
                message.delete()
                const resposta = result.resposta !== '' ? `**Resposta:** ${'``'}${result.resposta}${'``'}\n**Respondido por:** ${message.guild.members.find(m => m.id === result.resposta_autor) || 'Este usuario saiu do servidor!'}` : ''
                const embed_ticket = new Discord.RichEmbed()
                    .setColor('#FFD700')
                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL)
                    .setTitle('Ticket - ' + id)
                    .setDescription(`
                        **Autor:** ${message.guild.members.find(m => m.id === result.userid) || 'Usuario saiu do servidor!'}
                        ***===/Ticket/===***
                        **Ticket Status:** ${result.status}
                        **Ticket ID:** ${result.id}
                        **Duvida:** ${'``'}${result.pergunta}${'``'}
                        ${resposta}`)
                message.channel.send(embed_ticket)
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Nenhum ticket com este id encontrado!**`)
                message.channel.send(embed_err)
            }
        })
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Informe o id do ticket!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/ticket-ver/'
}