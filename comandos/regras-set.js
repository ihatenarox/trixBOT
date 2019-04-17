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


const color = require('cli-color')

exports.run = (client, message) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.slice(1).join(' ')) {
            regras.findOne({ guildid: message.guild.id }, (err, g_regras) => {
                if (!g_regras) {
                    const NewRegras = new regras({
                        guildid: message.guild.id,
                        regras: args.slice(1).join(' ')
                    })
                    NewRegras.save()
                    const timeout = client.setTimeout(msg_final, 200, '')
                }
                if (g_regras) {
                    g_regras.regras = args.slice(1).join(' ')
                    g_regras.save()
                    const timeout = client.setTimeout(msg_final, 200, '')
                }
                function msg_final(sdj) {
                    const aa = '``'
                    const embed_final = new Discord.RichEmbed()
                        .setColor('#00FA9A')
                        .setDescription(`${message.member}**, Regras do servidor configuradas com sucesso!**\n${aa}Veja as regras abaixo:${aa}\n${args.slice(1).join(' ')}`)
                    message.channel.send(embed_final)
                }
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe as regras!**`)
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
    name: '/regras-set/'
}