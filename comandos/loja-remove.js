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
            loja_tags.findOne({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') }, (err, Rtag) => {
                if (Rtag) {
                    loja_tags.findOneAndDelete({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') }, (err, fdds) => { })

                    const embed_final = new Discord.RichEmbed()
                        .setColor('#00FF7F')
                        .setDescription(`${message.member} Cargo removido da loja com sucesso!`)
                    message.channel.send(embed_final)
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.member}**, Informe um ID valido!**`)
                    message.channel.send(embed_err)
                }
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o id do item da loja!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __Administrador__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/loja-remove/'
}