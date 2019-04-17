//principais
const Discord = require('discord.js')
const fs = require('fs')
const configa = require("../config.json")

//database
const mongoose = require("mongoose")
mongoose.connect('mongodb://maycon190:+m97466833@ds135714.mlab.com:35714/dark_bot', {
    useNewUrlParser: true
})


const config = require("../models/config.js")
const eco = require("../models/eco.js")
const kit_daily = require("../models/kit_daily.js")
const loja_tags = require("../models/loja-tags.js")
const mute = require("../models/mute.js")
const regras = require("../models/regras.js")
const sorteio = require("../models/sorteio.js")
const staff_list = require("../models/staff-list.js")
const time_hack = require("../models/time_hack.js")
const userinfo = require("../models/userinfo.js")
const votacao = require("../models/votacao.js")
const warns = require("../models/warns.js")

const color = require('cli-color')

exports.run = (client, guild) => {
    config.find({guildid: guild.id}, (err,result)=>{
        if(result.length>0){
            result.forEach((v1,i1)=>{
                config.findOneAndDelete({guildid: guild.id})
            })
        }
    })

    eco.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                eco.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    kit_daily.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                kit_daily.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    loja_tags.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                loja_tags.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    mute.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                mute.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    regras.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                regras.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    sorteio.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                sorteio.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    staff_list.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                staff_list.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    time_hack.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                time_hack.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    userinfo.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                userinfo.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    votacao.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                votacao.findOneAndDelete({ guildid: guild.id })
            })
        }
    })

    warns.find({ guildid: guild.id }, (err, result) => {
        if (result.length > 0) {
            result.forEach((v1, i1) => {
                warns.findOneAndDelete({ guildid: guild.id })
            })
        }
    })
}

module.exports.help = {
    name: 'db-saida'
}