//principais
const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")

//database
const mongoose = require("mongoose")
mongoose.connect('mongodb://maycon190:+m97466833@ds135714.mlab.com:35714/dark_bot', {
    useNewUrlParser: true
})

const eco = require("../models/eco.js")


const color = require('cli-color')

exports.run = (client, message, msg, maquinas) => {
    maquinas.findOne({ guildid: message.guild.id, userid: message.author.id }, async (err, maquina) => {
        const vips = require("../models/vips.js")
        vips.findOne({ userid: message.author.id }, (err, vip) => {
            eco.findOne({ guildid: message.guild.id, userid: message.author.id }, (err, rcoins) => {

                const maquina1_gera = 69
                const maquina1_inv = maquina.maquina1_inv
                const maquina1_gera_inv = vip ? ((maquina1_gera * vip.mult) * maquina1_inv).toFixed(0) : Math.floor(maquina1_gera * maquina1_inv)
                const maquina1_gera_und = vip ? (maquina1_gera * vip.mult).toFixed(0) : maquina1_gera

                const maquina2_gera = 239
                const maquina2_inv = maquina.maquina2_inv
                const maquina2_gera_inv = vip ? ((maquina2_gera * vip.mult) * maquina2_inv).toFixed(0) : Math.floor(maquina2_gera * maquina2_inv)
                const maquina2_gera_und = vip ? (maquina2_gera * vip.mult).toFixed(0) : maquina2_gera

                const maquina3_gera = 1388
                const maquina3_inv = maquina.maquina3_inv
                const maquina3_gera_inv = vip ? ((maquina3_gera * vip.mult) * maquina3_inv).toFixed(0) : Math.floor(maquina3_gera * maquina3_inv)
                const maquina3_gera_und = vip ? (maquina3_gera * vip.mult).toFixed(0) : maquina3_gera

                const maquina4_gera = 25000
                const maquina4_inv = maquina.maquina4_inv
                const maquina4_gera_inv = vip ? ((maquina4_gera * vip.mult) * maquina4_inv).toFixed(0) : Math.floor(maquina4_gera * maquina4_inv)
                const maquina4_gera_und = vip ? (maquina4_gera * vip.mult).toFixed(0) : maquina4_gera

                const maquina5_gera = 175e3
                const maquina5_inv = maquina.maquina5_inv
                const maquina5_gera_inv = vip ? ((maquina5_gera * vip.mult) * maquina5_inv).toFixed(0) : Math.floor(maquina5_gera * maquina5_inv)
                const maquina5_gera_und = vip ? (maquina5_gera * vip.mult).toFixed(0) : maquina5_gera

                const maquina6_gera = 1388888
                const maquina6_inv = maquina.maquina6_inv
                const maquina6_gera_inv = vip ? ((maquina6_gera * vip.mult) * maquina6_inv).toFixed(0) : Math.floor(maquina6_gera * maquina6_inv)
                const maquina6_gera_und = vip ? (maquina6_gera * vip.mult).toFixed(0) : maquina6_gera

                const maquina7_gera = 12.5e6
                const maquina7_inv = maquina.maquina7_inv
                const maquina7_gera_inv = vip ? ((maquina7_gera * vip.mult) * maquina7_inv).toFixed(0) : Math.floor(maquina7_gera * maquina7_inv)
                const maquina7_gera_und = vip ? (maquina7_gera * vip.mult).toFixed(0) : maquina7_gera

                const maquina8_gera = 125e6
                const maquina8_inv = maquina.maquina8_inv
                const maquina8_gera_inv = vip ? ((maquina8_gera * vip.mult) * maquina8_inv).toFixed(0) : Math.floor(maquina8_gera * maquina8_inv)
                const maquina8_gera_und = vip ? (maquina8_gera * vip.mult).toFixed(0) : maquina8_gera

                const maquina9_gera = 1388888888
                const maquina9_inv = maquina.maquina9_inv
                const maquina9_gera_inv = vip ? ((maquina9_gera * vip.mult) * maquina9_inv).toFixed(0) : Math.floor(maquina9_gera * maquina9_inv)
                const maquina9_gera_und = vip ? (maquina9_gera * vip.mult).toFixed(0) : maquina9_gera

                const totalg1 = Math.floor(maquina1_gera_inv)
                const totalg2 = Math.floor(maquina2_gera_inv)
                const totalg3 = Math.floor(maquina3_gera_inv)
                const totalg4 = Math.floor(maquina4_gera_inv)
                const totalg5 = Math.floor(maquina5_gera_inv)
                const totalg6 = Math.floor(maquina6_gera_inv)
                const totalg7 = Math.floor(maquina7_gera_inv)
                const totalg8 = Math.floor(maquina8_gera_inv)
                const totalg9 = Math.floor(maquina9_gera_inv)

                const embed = new Discord.RichEmbed()
                    .setTitle('Loja de maquinas - ' + message.guild.name)
                    .setColor('#FF8C00')
                    .setDescription(`
                                ***===/Seus Coins/===***
                                Coins: **__${rcoins.coins}__**
                                
                                *Maquinas irão produzir coins sem que você precise mandar mensagens!*

                                ***__Reaja com o emoji da maquina para compra-la!__***`)
                    .addBlankField(false)
                    .setFooter(`Maquinas de ${message.author.tag} | Gera um total de ${totalg1 + totalg2 + totalg3 + totalg4 + totalg5 + totalg6 + totalg7 + totalg8 + totalg9} coins por minuto`)

                    //v1
                    .addField(':one: Maquina V1', `
                                **===/Seu/===**
                                Você tem: ${maquina1_inv} maquinas
                                Gera: ${maquina1_gera_inv} coins/minuto

                                **===/Loja/===**
                                Valor: ${maquina.maquina1_valor} coins
                                Gera: ${maquina1_gera_und} coins/minuto
                                `, true)

                    //v2
                    .addField(':two: Maquina V2', `
                                **===/Seu/===**
                                Você tem: ${maquina2_inv} maquinas
                                Gera: ${maquina2_gera_inv} coins/minuto

                                **===/Loja/===**
                                Valor: ${maquina.maquina2_valor} coins
                                Gera: ${maquina2_gera_und} coins/minuto
                                `, true)

                    .addBlankField(false)

                    //v3
                    .addField(':three: Maquina V3', `
                                **===/Seu/===**
                                Você tem: ${maquina3_inv} maquinas
                                Gera: ${maquina3_gera_inv} coins/minuto

                                **===/Loja/===**
                                Valor: ${maquina.maquina3_valor} coins
                                Gera: ${maquina3_gera_und} coins/minuto
                                `, true)

                msg.edit(embed)
            })
        })

    })

}
module.exports.help = {
    name: 'embed_maquina_update'
}