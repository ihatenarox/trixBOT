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
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.mentions.roles.array()[0]) {
            const cargo = message.mentions.roles.array()[0]
            staff_list.findOneAndDelete({ roleid: cargo.id }, (err, result) => {
                if (result) {
                    const embed_final = new Discord.RichEmbed()
                        .setColor('00FF7F')
                        .setDescription(`${message.member}**,Cargo __${cargo.name}__ foi deletado da lista de staffs!**`)
                    message.channel.send(embed_final)
                }
                if (!result) {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('ff0000')
                        .setDescription(`${message.member}**,Cargo __${cargo.name}__ não foi encontrado na lista de staffs!**`)
                    message.channel.send(embed_err)
                }
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Mencione um cargo para ser colocado na lista de staffs!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __ADMINISTRADOR__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/staff-remove/'
}