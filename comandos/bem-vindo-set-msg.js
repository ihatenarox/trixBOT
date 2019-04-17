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


const color = require('cli-color')

exports.run = (client, message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        if (args.slice(1).join(' ')) {
            db_config.findOne({ guildid: message.guild.id }, (err, guild) => {
                if (guild) {
                    guild.bem_vindo_msg = args.slice(1).join(' ')
                    guild.save()

                    const embed_final = new Discord.RichEmbed()
                        .setColor('#00FA9A')
                        .setDescription('***Agora sua mensagem de bem vindo é:***\n➡️' + guild.bem_vindo_msg + '\n\n**ABAIXO ESTA UMA PREVIA DE COMO SERA A MENSAGEM DE BEM-VINDO!**')
                    message.channel.send(embed_final)
                    const embed_previa = new Discord.RichEmbed()
                        .setColor('#66CDAA')
                        .setAuthor(`BEM-VINDO ${message.author.tag}`, message.member.user.avatarURL || message.member.user.defaultAvatarURL)
                        .setThumbnail(message.member.user.avatarURL || message.member.user.defaultAvatarURL)
                        .setDescription(guild.bem_vindo_msg)
                    message.channel.send(embed_previa)
                }
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setTitle('SINTAXE INCORRETA')
                .setDescription(`${message.member}, Forma correta __${config.prefix}bem-vindo-set-msg <mensagem>__ !`)
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
    name: '/bem-vindo-set-msg/'
}