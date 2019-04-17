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

const color = require('cli-color')

exports.run = async (client, message) => {
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const count = parseInt(args.slice(1, 2).join(' '), 10)
        if (count >= 2 && count <= 100) {
            const msgs = await message.channel.fetchMessages({ limit: count })
            message.channel.bulkDelete(msgs).catch(err => message.channel.send(`Não foi possivel deletar as mensagens devido ao erro: ${err}`))
            const embed = new Discord.RichEmbed()
                .setColor('#008B8B')
                .setDescription(`${count} mensagens deletadas por ${message.member}`)
            message.channel.send(embed).then(m1 => {
                m1.delete(5000).catch(err => { })
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe um numero entre 2 e 100 de mensagens que deseja deletar!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __GERENCIAR_MENSAGENS__ Para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/limpar/'
}