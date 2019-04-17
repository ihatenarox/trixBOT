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
const loja_tags = require("../models/loja-tags.js")
const eco = require("../models/eco.js")

const color = require('cli-color')

exports.run = (client, message) => {
    function compararNumeros(a, b) {
        return a - b;
    }
    loja_tags.find({ guildid: message.guild.id }).sort([['valor', 'descending']]).exec((err, Rloja) => {
        const embed_loja = new Discord.RichEmbed()
            .setColor('#20B2AA')
            .setTitle('Loja - ' + message.guild.name)
        if (Rloja.length === 0) {
            embed_loja.setDescription(`Nenhum __Administrador__ colocou cargos na loja do servidor. Para colocar um cargo na loja utilize:
                **${config.prefix}loja-add <cargo> <valor> <descrição>**`)
            message.channel.send(embed_loja)
        }
        if (Rloja.length > 0) {
            embed_loja.setDescription(`${message.member}**,Utilize __${config.prefix}loja-comprar <id>__ Para comprar algo**`)
            Rloja.forEach((v1, i1) => {
                embed_loja.addField(`Cargo ${i1 + 1}`, `
                    ${message.guild.roles.find(a => a.id === v1.roleid) || 'Cargo não encontado!\nPEÇA A UM STAFF PARA REMOVER-O'}
                    Valor: ${v1.valor}
                    Id: ${v1.id}
                    Descrição: ${v1.desc}`, true)
            })
            message.channel.send(embed_loja)
        }
    })
}

module.exports.help = {
    name: '/loja/'
}