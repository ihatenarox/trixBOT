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


const color = require('cli-color')

exports.run = (client, message) => {
    regras.findOne({ guildid: message.guild.id }, (err, g_regras) => {
        if (!g_regras || g_regras.regras === 'null') {
            const embed_no = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Este servidor não configurou as regras para este comando!**`)
            message.channel.send(embed_no)
        } else {
            const embed_regras = new Discord.RichEmbed()
                .setColor('00FF7F')
                .setTitle(`Regras ${message.guild.name}`)
                .setDescription(g_regras.regras)
            message.channel.send(embed_regras)
        }
    })
}

module.exports.help = {
    name: '/regras/'
}