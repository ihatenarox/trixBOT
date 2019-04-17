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


const color = require('cli-color')

exports.run = (client) => {
    mute.find({}, (err, mutes) => {
        mutes.forEach((v1, i1) => {
            const tempo_atual = client.uptime + client.readyTimestamp
            if (v1.tempo <= tempo_atual) {
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (guild) {
                    const user = guild.members.find(user => user.id === v1.userid)
                    if (user) {
                        const canaist = guild.channels.filter(a => a.type === 'text').array()
                        const canaisv = guild.channels.filter(a => a.type === 'voice').array()
                        canaist.forEach((v, i) => {
                            v.overwritePermissions(user, {
                                'SEND_MESSAGES': null
                            })
                        })
                        canaisv.forEach((v, i) => {
                            v.overwritePermissions(user, {
                                'SPEAK': null
                            })
                        })

                        const cargo = guild.roles.find(role => role.name === 'Mutado')
                        if (cargo) {
                            if (user.roles.find(role => role.name === 'Mutado')) {
                                user.removeRole(cargo)
                            }
                        }

                        db_config.findOne({ guildid: v1.guildid }, (err, guild2) => {
                            mute.findOneAndDelete({ guildid: v1.guildid, userid: v1.userid }, (err, final) => { })
                            if (guild2) {
                                if (guild2.punicoes_channel !== '0') {
                                    const canal = guild.channels.find(canal => canal.id === guild2.punicoes_channel)
                                    if (canal) {
                                        const embed = new Discord.RichEmbed()
                                            .setColor('#008B8B')
                                            .setDescription(`O usuario ${user} foi desmutado pois o tempo acabou!`)
                                        canal.send(embed)
                                    } else {
                                        guild2.punicoes_channel = '0'
                                        guild2.save()
                                    }
                                }
                            }
                        })
                    } else {
                        mute.findOneAndDelete({ guildid: v1.guildid, userid: v1.userid }, (err, final) => { })
                    }
                } else {
                    mute.findOneAndDelete({ guildid: v1.guildid, userid: v1.userid }, (err, final) => { })
                }
            }
        })
    })
}

module.exports.help = {
    name: 'tempmute'
}