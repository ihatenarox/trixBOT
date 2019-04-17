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

exports.run = async (client, message, play) => {
    if (message.member.roles.find(r => r.name === 'Dj') || message.member.hasPermission('ADMINISTRATOR')) {
        const ytld = require("ytdl-core")
        if (message.member.voiceChannel) {
            if (message.guild.voiceConnection) {
                if (message.member.voiceChannel.members.find(a => a.id === client.user.id)) {
                    const music = require("../models/music.js")
                    await music.find({ guildid: message.guild.id }, (err, musics) => {
                        musics.forEach((v1, i1) => {
                            music.findOneAndDelete({ _id: v1._id }, (err, ddhb) => { })
                        })
                    })
                    message.guild.voiceConnection.dispatcher.end()
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#FF4500')
                        .setDescription(`${message.member}**,⏹-Musica parada e a fila de musicas limpa!**`)
                    message.channel.send(embed_err)
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.member}**, Você precisa estar no mesmo canal que o bot!**`)
                    message.channel.send(embed_err)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, O bot não esta tocando nada no momento!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**,Você precisa estar em uma canal de voz!**`)
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
    name: '/stop/'
}