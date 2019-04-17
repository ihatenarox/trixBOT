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
    if (args.slice(1, 2).join(' ')) {
        loja_tags.findOne({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') }, (err, Rtag) => {
            if (Rtag) {
                const valor = Math.floor(Rtag.valor)
                const cargo = message.guild.roles.find(r => r.id === Rtag.roleid)
                if (cargo) {
                    if (!message.member.roles.find(r => r.id === cargo.id)) {
                        eco.findOne({ guildid: message.guild.id, userid: message.author.id }, (err, Reco) => {
                            if (Reco) {
                                const Ucoins = Math.floor(Reco.coins)
                                if (Ucoins >= valor) {
                                    Reco.coins = Math.floor(Ucoins - valor)
                                    message.member.addRole(cargo)
                                    Reco.save()
                                    const embed = new Discord.RichEmbed()
                                        .setColor('#00FF7F')
                                        .setDescription(`${message.member}**, Compra efetuada com sucesso!
                                        Abaixo estão algumas informações sobre sua compra!**
                                        
                                        Cargo: **${cargo}**
                                        Valor: **${valor} Coins**
                                        Membros com este cargo: **${cargo.members.size + 1} Membros**`)
                                    message.channel.send(embed)
                                } else {
                                    const emoji_trix_money = client.emojis.find(e => e.name === 'trix_money')
                                    const embed_err = new Discord.RichEmbed()
                                        .setColor('#ff0000')
                                        .setDescription(`${message.member}**, Você não tem coins o suficiente para esta compra!**`)
                                        .addField('Seus Coins', `${emoji_trix_money}Coins: ${Ucoins}\nJunte mais ${valor - Ucoins} para poder comprar!`)
                                    message.channel.send(embed_err)
                                }
                            }
                        })
                    } else {
                        const embed_err = new Discord.RichEmbed()
                            .setColor('#ff0000')
                            .setDescription(`${message.member}**, Você não pode comprar um cargo que você ja tem!**`)
                        message.channel.send(embed_err)
                    }
                } else {
                    loja_tags.findOneAndDelete({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') })
                    message.channel.send('Este cargo foi deletado do servidor! mas não se preocupe você não perdeu coins :)')
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Informe um id valido!**`)
                message.channel.send(embed_err)
            }
        })
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Informe o id do item que deseja comprar!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/loja-comprar/'
}