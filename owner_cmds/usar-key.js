const Discord = require('discord.js')
const moment = require('moment')
const mongoose = require('mongoose')

const config = require("../config.json")

mongoose.connect(config.mongolink, {
    useNewUrlParser: true
})

exports.run = (client, message) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    if (args.slice(1, 2).join(' ')) {
        const keys = require("../models/keys.js")
        const vips = require("../models/vips.js")
        keys.findOne({ key: args.slice(1, 2).join(' ') }, (err, result) => {
            if (result) {
                keys.findOneAndDelete({ key: args.slice(1, 2).join(' ') }, (err, uhdu) => { })
                vips.findOne({ userid: message.author.id }, async (err, Rvip) => {
                    if (Rvip) {
                        Rvip.mult = (Rvip.mult + 0.1).toFixed(1)
                        await Rvip.save()
                        const embed_final = new Discord.RichEmbed()
                            .setColor('#FFD700')
                            .setTitle('Vip')
                            .setFooter(`VIP ATIVADO POR ${message.author.tag}`, message.author.displayAvatarURL)
                            .setDescription(`**Parabens ${message.author.tag} você acabou de ativar mais um vip na sua conta!\n\nCoins por mensagem ${((Rvip.mult) * 100)}\nBonus nas Maquinas: ${(Rvip.mult-1)*100}%**`)
                        message.channel.send(embed_final)
                    }
                    if (!Rvip) {
                        const newvip = new vips({
                            userid: message.author.id,
                            mult: (1.1).toFixed(1)
                        })
                        newvip.save()
                        const embed_final = new Discord.RichEmbed()
                            .setColor('#FFD700')
                            .setTitle('Vip')
                            .setFooter(`VIP ATIVADO POR ${message.author.tag}`, message.author.displayAvatarURL)
                            .setDescription(`**Parabens ${message.author.tag} você acabou de ativar seu primeiro vip na conta!\n\nCoins por mensagem ${(1.1 * 100).toFixed(0)}\nBonus nas Maquinas: ${(1.1 - 1) * 100}%**`)
                        message.channel.send(embed_final)
                    }
                })
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.author}**, Key invalida!**`)
                message.channel.send(embed_err)
            }
        })
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.author}**, Informe a key!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: 'usar-key'
}