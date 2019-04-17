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
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.slice(1, 2).join(' ')) {
            const db_vote = require("../models/votacao.js")
            db_vote.findOne({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') }, (err, Rvote) => {
                if (Rvote) {
                    message.channel.fetchMessages({ limit: 100 }).then(msgs => {
                        const find = msgs.find(m => m.id === Rvote.messageid)
                        if (find) {
                            const sim = find.reactions.array().filter(e => e.emoji.name === 'trix_certo').map(r => r.count)
                            const nao = find.reactions.array().filter(e => e.emoji.name === 'trix_errado').map(r => r.count)

                            const emoji_trix_certo = client.emojis.find(e => e.name === 'trix_certo')
                            const emoji_trix_errado = client.emojis.find(e => e.name === 'trix_errado')
                            const simc = Math.floor(sim)
                            const naoc = Math.floor(nao)
                            const smn = Math.floor(simc + naoc)
                            const porcento = (100 / smn).toFixed(2)
                            const embed = new Discord.RichEmbed()
                                .setColor('#FFD700')
                                .setTitle('Votação Finalizada- ' + message.guild.name)
                                .setDescription(`${Rvote.desc}\n\n${emoji_trix_certo} = ${sim} votos = ${porcento * sim}%\n${emoji_trix_errado} = ${nao} votos = ${porcento * nao}%`)

                            find.edit(embed)

                            db_vote.findOneAndDelete({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') }, (err, sdjuh) => { })
                        }else{
                            db_vote.findOneAndDelete({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') }, (err, sdjuh) => { })
                            const embed_err = new Discord.RichEmbed()
                                .setColor('#ff0000')
                                .setDescription(`${message.member}**, Eu achei no meu banco de dados uma votação com este id mas alguem deletou a mensagem da votação então eu não consigo contabilizar os resultados!**`)
                            message.channel.send(embed_err)
                        }
                    })
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.member}**, Não encontrei nenhuma votação com este id!**`)
                    message.channel.send(embed_err)
                }
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o id da votação!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão de __Administrador__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/votacao-encerrar/'
}