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
    message.delete()
    db_config.findOne({ guildid: message.guild.id }, (err, result) => {
        if (result) {
            const canal_tickets = message.guild.channels.find(a => a.id === result.ticket_channel)
            if (canal_tickets) {
                const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
                if (args.slice(1).join(' ')) {
                    const pergunta = args.slice(1).join(' ')

                    const numeros = [
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9'
                    ]
                    const id1 = numeros[Math.floor(Math.random() * (numeros.length))]
                    const id2 = numeros[Math.floor(Math.random() * (numeros.length))]
                    const id3 = numeros[Math.floor(Math.random() * (numeros.length))]
                    const id4 = numeros[Math.floor(Math.random() * (numeros.length))]
                    const id5 = numeros[Math.floor(Math.random() * (numeros.length))]
                    const id6 = numeros[Math.floor(Math.random() * (numeros.length))]
                    const id_final = `${id1}${id2}${id3}${id4}${id5}${id6}`

                    const tickets = require("../models/tickets.js")

                    const embed_final = new Discord.RichEmbed()
                        .setColor('#FFD700')
                        .setTitle('Ticket')
                        .setDescription(`
                        Ticket aberto com sucesso!
                        
                        Quando alguem responder seu ticket eu lhe enviarei no seu dm a resposta!
                        
                        **===/Ticket Info/===**
                        **Id do ticket:** ${id_final}
                        Você pode ver seu ticket a qualquer momento utilizando o comando
                        ${'``'}${config.prefix}ticket-ver <id do ticket>${'``'}`)
                    message.channel.send(embed_final)

                    const embed_ticket = new Discord.RichEmbed()
                        .setColor('#FFD700')
                        .setTitle('Ticket - ❌')
                        .setDescription(`
                            ***===/Autor info/===***
                            Autor: ${message.author}
                            ID: ${message.author.id}
                            
                            ***===/Ticket/===***
                            **Ticket Status:** Não Respondido!
                            **Ticket ID:** ${id_final}
                            **Duvida:** ${'``'}${pergunta}${'``'}`)
                    canal_tickets.send(embed_ticket).then(msg => {
                        const newticket = new tickets({
                            guildid: message.guild.id,
                            userid: message.author.id,
                            msgid: msg.id,
                            status: 'Não respondido!',
                            id: id_final,
                            pergunta: pergunta,
                            resposta: '',
                            resposta_autor: ''
                        })
                        newticket.save()
                    })
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.member}**, Informe sua duvida!**`)
                    message.channel.send(embed_err)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Este servidor não configurou um canal de tickets! E por isso não posso criar tickets!**`)
                message.channel.send(embed_err)
            }
        }
    })
}

module.exports.help = {
    name: '/ticket-abrir/'
}