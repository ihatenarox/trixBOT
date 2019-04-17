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
    const kit_daily = require("../models/kit_daily.js")
    kit_daily.findOne({ guildid: message.guild.id, userid: message.author.id }, async (err, Rdaily) => {
        if (!Rdaily) {
            const newRdaile = new kit_daily({
                guildid: message.guild.id,
                userid: message.author.id,
                tempo: '0'
            })
            newRdaile.save()
            message.channel.send('Mande a mensagem novamente para min verificar que você não um bot!')
        }
        if (Rdaily) {
            const step1time = client.setTimeout(step1, 100, '')
        }
        function step1() {
            if (Math.floor(Rdaily.tempo) <= Math.floor(client.uptime + client.readyTimestamp)) {
                Rdaily.tempo = Math.floor((client.uptime + client.readyTimestamp) + 86400000)
                Rdaily.save()

                eco.findOne({ userid: message.author.id, guildid: message.guild.id }, (err, Reco) => {
                    if (Reco) {
                        const coins = Math.floor(Reco.coins)
                        Reco.coins = Math.floor(coins + 1000)
                        Reco.save()

                        const embed_final = new Discord.RichEmbed()
                            .setColor('#00FF7F')
                            .setDescription(`${message.member}**, Você coletou 1000 coins do seu premio diario!**`)
                        message.channel.send(embed_final)
                    }
                })
            } else {
                const aaa = Math.floor(Rdaily.tempo)
                const uptime = Math.floor(aaa - (client.uptime + client.readyTimestamp))
                const horas = Math.floor(uptime / 3600000)
                const temp_a = Math.floor(uptime - (horas * 3600000))
                const minutos = Math.floor(temp_a / 60000)
                const temp_b = Math.floor(temp_a - (minutos * 60000))
                const segundos = Math.floor(temp_b / 1000)
                
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**,Faltan ainda ${horas} horas, ${minutos} minutos e ${segundos} segundos para pegar seu proximo premio diario!**`)
                message.channel.send(embed_err)
            }
        }
    })
}

module.exports.help = {
    name: '/daily/'
}