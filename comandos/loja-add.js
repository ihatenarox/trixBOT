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
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.mentions.roles.array()[0]) {
            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
            const cargo = message.mentions.roles.array()[0]
            if (args.slice(2, 3).join(' ')) {
                const valor = Math.floor(args.slice(2, 3).join(' '))
                const valors = `${valor}`
                if (valors !== 'NaN') {
                    if (valor <= 1e10) {
                        if (cargo.position < message.guild.members.find(a => a.id === client.user.id).highestRole.position) {
                            loja_tags.findOne({ roleid: cargo.id }, (err, Rtags) => {
                                if (!Rtags) {
                                    loja_tags.find({ guildid: message.guild.id }, (err, Rtags2) => {
                                        if (Rtags2.length < 15) {

                                            //gen id
                                            const id1 = Math.floor(Math.random() * 10)
                                            const id2 = Math.floor(Math.random() * 10)
                                            const id3 = Math.floor(Math.random() * 10)
                                            const id4 = Math.floor(Math.random() * 10)
                                            const id5 = Math.floor(Math.random() * 10)
                                            const id_final = `${id1}${id2}${id3}${id4}${id5}`


                                            const newLoja_Tag = new loja_tags({
                                                guildid: message.guild.id,
                                                id: id_final,
                                                roleid: cargo.id,
                                                valor: valor,
                                                desc: args.slice(3).join(' ') || 'Sem descrição'
                                            })
                                            newLoja_Tag.save()

                                            const embed_final = new Discord.RichEmbed()
                                                .setColor('#4169E1')
                                                .setDescription(`O cargo ${cargo} foi adicionado na loja por ${valor} coins com sucesso!`)
                                                .addField('Descrição', args.slice(3).join(' ') || 'Sem descrição')
                                            message.channel.send(embed_final)
                                        } else {
                                            const embed_err = new Discord.RichEmbed()
                                                .setColor('#ff0000')
                                                .setDescription(`${message.member}**, Eu so consigo colocar 15 cargos na loja! Para remover alguma tag da loja utilize __${config.prefix}loja-remove <id>**__`)
                                            message.channel.send(embed_err)
                                        }
                                    })
                                } else {
                                    const embed_err = new Discord.RichEmbed()
                                        .setColor('#ff0000')
                                        .setDescription(`${message.member}**, Este cargo ja esta na loja para remover-lo use __${config.prefix}loja-remove ${Rtags.id}__!**`)
                                    message.channel.send(embed_err)
                                }
                            })
                        } else {
                            const embed_err = new Discord.RichEmbed()
                                .setColor('#ff0000')
                                .setDescription(`${message.member}**, O cargo que eu vou vender não pode ser superior a min!**`)
                            message.channel.send(embed_err)
                        }
                    } else {
                        const embed_err = new Discord.RichEmbed()
                            .setColor("#ff0000")
                            .setDescription(`${message.member}**, Informe um valor menor que 1e10 (10.000.000.000)!**`)
                        message.channel.send(embed_err)
                    }
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.member}**, Informe um valor valido!**`)
                    message.channel.send(embed_err)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Informe o valor do item!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Mencione um cargo!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão de administrador para colocar itens na loja!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/loja-add/'
}