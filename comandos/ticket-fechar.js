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
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const ticket_id = args.slice(1, 2).join(' ')
        const resposta = args.slice(2).join(' ')
        if (ticket_id) {
            if (resposta) {
                const tickets = require("../models/tickets.js")
                tickets.findOne({ guildid: message.guild.id, id: ticket_id }, (err, ticket) => {
                    if (ticket) {
                        message.channel.fetchMessages({}).then(msgs => {
                            const msg = msgs.array()
                            const msg1 = msg.find(a => a.id === ticket.msgid)
                            if (msg1) {

                                const embed_ticket = new Discord.RichEmbed()
                                    .setColor('#FFD700')
                                    .setTitle('Ticket - ✅')
                                    .setDescription(`
                                        ***===/Autor info/===***
                                        Autor: ${message.guild.members.find(m => m.id === ticket.userid) || 'Saiu do Servidor!'}
                                        ID: ${ticket.userid}
                                        
                                        ***===/Ticket/===***
                                        **Ticket Status:** Respondido!
                                        **Ticket ID:** ${ticket.id}
                                        **Duvida:** ${'``'}${ticket.pergunta}${'``'}
                                        **Resposta:** ${'``'}${resposta}${'``'}`)
                                    .setFooter(`Respondido por: ${message.author.tag}`, message.author.displayAvatarURL)
                                    .setTimestamp(message.createdAt)
                                msg1.edit(embed_ticket)

                                ticket.status = 'Respondido'
                                ticket.resposta = resposta
                                ticket.resposta_autor = message.author.id
                                ticket.save()

                                const user = message.guild.members.find(m => m.id === ticket.userid)
                                if (user) {
                                    const embed_user = new Discord.RichEmbed()
                                        .setColor('#4682B4')
                                        .setTitle('Ticket Respondido')
                                        .setDescription(`
                                            ***===/O seu ticket foi respondido!/===***
                                            **Servidor: ${message.guild.name}**

                                            ***__Duvida:__***
                                            ${'```'}${ticket.pergunta}${'```'}
                                            
                                            ***__Resposta:__***
                                            ${'```'}${resposta}${'```'}`)
                                        .setFooter(`Respondido por: ${message.author.tag}`, message.author.displayAvatarURL)
                                        .setTimestamp(message.createdAt)
                                    user.send(embed_user)
                                }
                            } else {
                                const embed_err = new Discord.RichEmbed()
                                    .setColor('#ff0000')
                                    .setDescription(`${message.member}**, A mensagem deste ticket foi deletada!**`)
                                message.channel.send(embed_err)
                            }
                        })
                    } else {
                        const embed_err = new Discord.RichEmbed()
                            .setColor('#ff0000')
                            .setDescription(`${message.member}**, Ticket não encontrado com este id!**`)
                        message.channel.send(embed_err)
                    }
                })
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Informe a resposta para o ticket!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o id do ticket que deseja fechar!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __Gerenciar Mensagens__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/ticket-fechar/'
}