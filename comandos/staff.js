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


const color = require('cli-color')

exports.run = (client, message) => {
    staff_list.find({ guildid: message.guild.id }, (err, list) => {
        if (list.length === 0) {
            const embed_nd = new Discord.RichEmbed()
                .setColor('#A52A2A')
                .setDescription(`${message.member}**,Nenhum __Administrador__ Configurou a lista de staff! '-'**`)
            message.channel.send(embed_nd)
        }
        if (list.length >= 1) {
            const embed = new Discord.RichEmbed()
                .setColor('#A52A2A')
                .setTitle(`Staffs ${message.guild.name}`)
                .setThumbnail(message.guild.iconURL)
            list.forEach((v, i) => {
                const cargo = message.guild.roles.find(role => role.id === v.roleid)
                if (cargo) {
                    const role_name = cargo.name
                    const members = cargo.members.map(m => m.user).join('\n')
                    embed.addField(role_name, members||'NINGUEM', false)
                } else {
                    staff_list.findOneAndDelete({ roleid: v.roleid }, (err, result) => { })
                }
            })
            message.channel.send(embed)
        }
    })
}

module.exports.help = {
    name: '/staff/'
}