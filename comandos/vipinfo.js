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

const moment = require('moment')
moment.locale('pt-BR')

exports.run = (client, message) => {
    const vips = require("../models/vips.js")
    vips.findOne({ userid: message.author.id }, (err, result) => {
        if (result) {
            eco.findOne({ userid: message.author.id, guildid: message.guild.id }, (err, Reco) => {
                if (Reco) {
                    const embed_menu = new Discord.RichEmbed()
                        .setColor('#4682B4')
                        .setTitle('Vip Info ' + message.author.tag)
                        .setDescription(`
                                ***__Informações__***
                                <-+-> **Você possui ${((result.mult-1)*10).toFixed(0)} vips ativados na sua conta!**

                                <-+-> **${result.mult * 100} coins** por mensagem
                                <-+-> **${Math.floor((result.mult-1)*100)}%** de bonus na geração de coins das maquinas`)
                    message.channel.send(embed_menu)

                }
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Somente vips conseguem acessar este menu!\n\nFormas de ganhar vip:**${'```'}fix\n1- Quando o bot reagir alguma mensagem com 💎 seja o primeiro a reagir!\n2- Em eventos feito pelo bot em ocasiões especiais!${'```'}`)
            message.channel.send(embed_err)
        }
    })
}

module.exports.help = {
    name: '/vipinfo/'
}