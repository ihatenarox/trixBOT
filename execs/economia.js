const Discord = require("discord.js")
const mongoose = require("mongoose")

const eco = require("../models/eco.js")
const vips = require("../models/vips.js")

exports.run = (client, message) => {
    //economia
    eco.findOne({ guildid: message.guild.id, userid: message.author.id }, async (err, Reco) => {
        if (!Reco) {
            const NewEco = new eco({
                guildid: message.guild.id,
                userid: message.author.id,
                coins: Math.floor(100),
            })
            NewEco.save()
        }
        if (Reco) {
            await vips.findOne({ userid: message.author.id }, (err, Rvip) => {
                if (Rvip) {
                    const coinsextra = (Rvip.mult * 100)
                    Reco.coins = Reco.coins + coinsextra
                    Reco.save()
                }
                if (!Rvip) {
                    const coins = Math.floor(Reco.coins)
                    Reco.coins = coins + 100
                    Reco.save()
                }
            })
        }
    })
}

module.exports.help = {
    name: 'economia'
}