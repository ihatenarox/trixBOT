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
    if (message.member.hasPermission('ADMINISTRATOR')) {
        regras.findOne({ guildid: message.guild.id }, (err, g_regras) => {
            if (regras) {
                g_regras.regras = 'null'
                g_regras.save()

                const embed_final = new Discord.RichEmbed()
                    .setColor('#00FF7F')
                    .setDescription(`${message.member}**, __REGRAS__ resetadas com sucesso!**`)
                message.channel.send(embed_final)
            }
        })
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __ADMINISTRADOR__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/regras-reset/'
}