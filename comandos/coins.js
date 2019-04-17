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
    if (!message.mentions.members.array()[0]) {
        eco.findOne({ guildid: message.guild.id, userid: message.author.id }, (err, Reco) => {
            if (Reco) {
                const emoji_trix_money = client.emojis.find(a => a.name === 'trix_money')
                const embed = new Discord.RichEmbed()
                    .setColor('#66CDAA')
                    .setTitle(`Coins - ${message.author.tag}`)
                    .setDescription(`**${emoji_trix_money}Coins: ${Reco.coins}**`)
                message.channel.send(embed)
            }else{
                const emoji_trix_money = client.emojis.find(a => a.name === 'trix_money')
                const embed = new Discord.RichEmbed()
                    .setColor('#66CDAA')
                    .setTitle(`Coins - ${message.author.tag}`)
                    .setDescription(`**${emoji_trix_money}Coins: 100**`)
                message.channel.send(embed)
            }

        })
    }
    if (message.mentions.members.array()[0]) {
        const user = message.mentions.members.array()[0]
        eco.findOne({ guildid: message.guild.id, userid: user.id }, async (err, Reco) => {
            if (Reco) {
                const emoji_trix_money = client.emojis.find(a => a.name === 'trix_money')
                const embed = new Discord.RichEmbed()
                    .setColor('#66CDAA')
                    .setTitle(`Coins - ${user.user.tag}`)
                    .setDescription(`**${emoji_trix_money}Coins: ${Reco.coins}**`)
                message.channel.send(embed)
            }
            if (!Reco) {
                const neweco = new eco({
                    guildid: message.guild.id,
                    userid: user.id,
                    coins: 100
                })
                neweco.save()
                const emoji_trix_money = client.emojis.find(a => a.name === 'trix_money')
                const embed = new Discord.RichEmbed()
                    .setColor('#66CDAA')
                    .setTitle(`Coins - ${user.user.tag}`)
                    .setDescription(`**${emoji_trix_money}Coins: 100**`)
                message.channel.send(embed)
            }
        })
    }
}

module.exports.help = {
    name: '/coins/'
}