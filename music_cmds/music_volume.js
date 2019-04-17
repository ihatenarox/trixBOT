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
        const args = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
        const music_volume = require("../models/music_volume.js")
        music_volume.findOne({ guildid: message.guild.id }, (err, result) => {
            const vol = Math.floor(args.slice(1, 2)) / 10
            const vols = `${vol}`
            if (vols !== 'NaN') {
                if (vol * 10 <= 10 && vol * 10 >= 0) {
                    if (result) {
                        result.volume = vol
                        result.save()
                    } else {
                        const newvolume = new music_volume({
                            guildid: message.guild.id,
                            volume: vol
                        })
                        newvolume.save()
                    }
                    if (message.guild.voiceConnection) {
                        message.guild.voiceConnection.dispatcher.setVolumeLogarithmic(vol)
                    }
                    const embed = new Discord.RichEmbed()
                        .setColor('#00FF7F')
                        .setDescription(`${message.member}**, Volume __${vol * 10}__ configurado com sucesso!!**`)
                    message.channel.send(embed)
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.member}**, Informe um numero entre 0 e 10!**`)
                    message.channel.send(embed_err)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Informe um numero entre 0 e 10!**`)
                message.channel.send(embed_err)
            }
        })
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você precisa ter o cargo ${'``'}Dj${'``'} para poder executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/volume/'
}