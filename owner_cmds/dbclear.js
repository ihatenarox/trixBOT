const Discord = require('discord.js')
const moment = require('moment')
const mongoose = require('mongoose')

const config = require("../config.json")

mongoose.connect(config.mongolink, {
    useNewUrlParser: true
})

exports.run = (client, message) => {
    passo1()
    function passo1() {
        //config
        const c_config = require("../models/config.js")
        c_config.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_config.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })
            
            passo2()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __config.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)



        })
    }

    function passo2() {
        //eco
        const c_eco = require("../models/eco.js")
        c_eco.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_eco.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo3()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __eco.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo3() {
        //kit diario
        const c_daily = require("../models/kit_daily.js")
        c_daily.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_daily.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo4()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __kit_daily.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo4() {
        //loja tags
        const c_loja_tags = require("../models/loja-tags.js")
        c_loja_tags.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_loja_tags.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo5()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __loja-tags.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo5() {
        //mutes
        const c_mute = require("../models/mute.js")
        c_mute.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_mute.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo6()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __mute.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo6() {
        //regras
        const c_regras = require("../models/regras.js")
        c_regras.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_regras.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo7()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __regras.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }


    function passo7() {
        //sorteio
        const c_sorteio = require("../models/sorteio.js")
        c_sorteio.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_sorteio.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo8()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __sorteio.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo8() {
        //stafflist
        const c_staff_list = require("../models/staff-list.js")
        c_staff_list.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_staff_list.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo9()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __staff-list.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo9() {
        //timehack
        const c_time_hack = require("../models/time_hack.js")
        c_time_hack.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_time_hack.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo10()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __time_hack.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo10() {
        //stafflist
        const c_userinfo = require("../models/userinfo.js")
        c_userinfo.find({}, (err, result) => {
            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_userinfo.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo11()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __userinfo.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo11() {
        //stafflist
        const c_votacao = require("../models/votacao.js")
        c_votacao.find({}, (err, result) => {
            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_votacao.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo12()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __votacao.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo12() {
        //stafflist
        const c_warns = require("../models/warns.js")
        c_warns.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(guild => guild.id === v1.guildid)
                if (!guild) {
                    c_warns.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo13()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __warns.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }

    function passo13() {
        //vips
        const c_vips = require("../models/vips.js")
        c_vips.find({}, (err, result) => {
            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const user = client.users.find(u => u.id === v1.userid)
                if (!user) {
                    c_vips.findByIdAndDelete(v1._id, (err, gyds) => { })
                }

            })

            passo14()
            
            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __vips.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }


    function passo14() {
        //tickets
        const c_tickets = require("../models/tickets.js")
        c_tickets.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(g => g.id === v1.guildid)
                if (!guild) {
                    c_tickets.findByIdAndDelete(v1._id, (err, gyds) => { })
                }
            })

            passo15()

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __tickets.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }


    function passo15() {
        //maquinas
        const c_maquinas = require("../models/maquinas.js")
        c_maquinas.find({}, (err, result) => {

            result.forEach((v1, i1) => {
                console.log(`${i1 + 1} de ${result.length} verificados!`)
                const guild = client.guilds.find(g => g.id === v1.guildid)
                if (!guild) {
                    c_maquinas.findByIdAndDelete(v1._id, (err, gyds) => { })
                }
            })

            const embed = new Discord.RichEmbed()
                .setColor('#8A2BE2')
                .setDescription(`Model __maquinas.js__ => Deletei todos os indexes inuteis!`)
            message.channel.send(embed)


        })
    }


}

module.exports.help = {
    name: '/dbclear/'
}