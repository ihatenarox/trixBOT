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
            staff_list.findOne({ roleid: cargo.id }, (err, result) => {
                if (result) {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('ff0000')
                        .setDescription(`${message.author.tag},**Este cargo ja esta na lista de staffs**`)
                    message.channel.send(embed_err)
                }

                if (!result) {
                    staff_list.find({ guildid: message.guild.id }, (err, Rlist2) => {
                        if (Rlist2.length < 15) {
                            const newStaff_list = new staff_list({
                                guildid: message.guild.id,
                                roleid: cargo.id
                            })
                            newStaff_list.save()

                            const embed_final = new Discord.RichEmbed()
                                .setColor('#00FF7F')
                                .setDescription(`${message.member}, ${cargo} colocado com sucesso na lista de staff. Para ver a lista utilize ${config.prefix}staff`)
                            message.channel.send(embed_final)
                        }else{
                            const embed_err = new Discord.RichEmbed()
                                .setColor('#ff0000')
                                .setDescription(`${message.member}**, Eu so consigo colocar 15 cargos na lista de staffs! Para remover algum cargo utilize __${config.prefix}staff-remove <cargo>**__`)
                            message.channel.send(embed_err)
                        }
                    })
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
    name: '/staff-add/'
}