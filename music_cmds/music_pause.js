//principais
const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")

//database
const mongoose = require("mongoose")
mongoose.connect('mongodb://maycon190:+m97466833@ds135714.mlab.com:35714/dark_bot', {
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

const ytld = require("ytdl-core")
exports.run = (client, message, play) => {
    if (message.member.roles.find(r => r.name === 'Dj') || message.member.hasPermission('ADMINISTRATOR')) {
        if (message.member.voiceChannel) {
            if (message.member.voiceChannel.members.find(a => a.id === client.user.id)) {
                if (message.guild.voiceConnection.dispatcher.paused) {
                    message.guild.voiceConnection.dispatcher.resume()
                    const embed = new Discord.RichEmbed()
                        .setColor('#00FF7F')
                        .setDescription(`${message.member}**,▶️-Musica despausada!**`)
                    message.channel.send(embed)
                } else {
                    message.guild.voiceConnection.dispatcher.pause()
                    const embed = new Discord.RichEmbed()
                        .setColor('#00FF7F')
                        .setDescription(`${message.member}**,⏸-Musica pausada!**`)
                    message.channel.send(embed)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Você precisa estar no mesmo canal que o bot!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Você precisa estar em uma canal de voz!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você precisa ter o cargo ${'``'}Dj${'``'} para poder executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/pause/'
}