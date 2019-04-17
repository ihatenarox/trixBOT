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
    const embed = new Discord.RichEmbed()
        .setColor('#00FF7F')
        .setDescription(`
            **Ola ${message.member.displayName}, Me chamo trix meu objetivo é te ajudar a organizar seu servidor
            e tambem levar diverssão com o sistema de economia.**

            ***__Caso tenha gostado de minhas funcionalidades e me quizer em seu servidor
            Me adicione em seu servidor utilizando o link abaixo__***
            
            https://discordapp.com/oauth2/authorize?client_id=523614773091500054&scope=bot&permissions=2146958847`)
    message.channel.send(embed)
}

module.exports.help = {
    name: '/invite/'
}