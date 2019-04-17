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

const color = require('cli-color')

const moment = require('moment')
moment.locale('pr-BR')
exports.run = async (client, message) => {
    if (message.mentions.members.array()[0]) {
        const user = message.mentions.members.array()[0]
        userinfo.findOne({ guildid: message.guild.id, userid: user.id }, async (err, rUserinfo) => {
            if (!rUserinfo) {
                const newUserInfo = new userinfo({
                    guildid: message.guild.id,
                    userid: user.id,
                    mutes: '0',
                    warns: '0'
                })
                await newUserInfo.save()
                const aaab = client.setTimeout(aaaa, 100)
            }
            if (rUserinfo) {
                const aaab = client.setTimeout(aaaa, 100)
            }
            function aaaa() {
                userinfo.findOne({ guildid: message.guild.id, userid: user.id }, async (err, rUserinfoATT) => {
                    const status = `${user.user.presence.status}`
                        .replace(/offline/g, client.emojis.find(e => e.name === 'trix_offline'))
                        .replace(/online/g, client.emojis.find(e => e.name === 'trix_online'))
                        .replace(/idle/g, client.emojis.find(e => e.name === 'trix_idle'))
                        .replace(/dnd/g, client.emojis.find(e => e.name === 'trix_dnd'))
                    const embed = new Discord.RichEmbed()
                        .setColor('#4682B4')
                        .setTitle(`Userinfo ${user.user.tag} - Geral`)
                        .setAuthor(user.user.tag, user.user.displayAvatarURL)
                        .setThumbnail(user.user.displayAvatarURL)
                        .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL)
                        .addField('Display name:', `${status}${user.displayName}`, true)
                        .addField('Id', `${user.id}`, true)
                        .addField('Criado em', moment(user.user.createdTimestamp, 'x').utc().format('LLL'),true)
                        .addBlankField(true)
                        .addField('Mutes', `${rUserinfoATT.mutes} Mutes`, true)
                        .addField('Warns', `${rUserinfoATT.warns} Avisos`, true)
                    message.channel.send(embed).then(async home =>{
                        await home.react('%E2%97%80')
                        await home.react('%E2%96%B6')
                        const coletor = home.createReactionCollector(((reaction, user) => user.id === message.author.id), { time: 60000 })
                        coletor.on('collect', col => {
                            col.remove(message.author.id)
                            //antes
                            if (col.emoji.identifier === '%E2%97%80') {
                                home.edit(embed)
                            }

                            //depois
                            if (col.emoji.identifier === '%E2%96%B6') {
                                const embed_b = new Discord.RichEmbed()
                                    .setColor('#4682B4')
                                    .setTitle(`Userinfo ${user.user.tag} - Avisos`)
                                    .setAuthor(user.user.tag, user.user.displayAvatarURL)
                                    .setThumbnail(user.user.displayAvatarURL)
                                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL)
                                warns.find({guildid: message.guild.id,userid: user.id},(err,Rwarns)=>{
                                    if(Rwarns.length===0){
                                        embed_b.setDescription(`***ESTE MEMBRO NÃO POSSUI NENHUM AVISO!***`)
                                        home.edit(embed_b)
                                    }
                                    if(Rwarns.length>0){
                                        const aaa = '```'
                                        embed_b.addBlankField(false)
                                        Rwarns.forEach((v1,i1)=>{
                                            embed_b.addField(`Aviso ${i1+1}`,`${aaa}diff\n-Autor: ${v1.autor}\n-Data: ${v1.data}>\n!Aviso: ${v1.aviso}${aaa}`)
                                        })
                                        home.edit(embed_b)
                                    }
                                })
                            }
                        })
                    })
                })
            }
        })
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Mencione alguem para ver as informações!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/userinfo/'
}