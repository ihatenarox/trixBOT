//principais
const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")

//database
const mongoose = require("mongoose")
mongoose.connect('mongodb://maycon190:+m97466833@ds135714.mlab.com:35714/dark_bot', {
    useNewUrlParser: true
})
const db_config = require("../models/config.js")
const eco = require("../models/eco.js")

const color = require('cli-color')

exports.run = (client, member) => {
    db_config.findOne({ guildid: member.guild.id }, (err, guild) => {
        if (guild) {


            //saida msg
            if (member.guild.channels.find(canal => canal.id === guild.saida_channel)) {
                const canal = member.guild.channels.find(canal => canal.id === guild.saida_channel)
                const embed = new Discord.RichEmbed()
                    .setColor('#B22222')
                    .setAuthor(`ATE-MAIS ${member.user.tag}`, member.user.avatarURL || member.user.defaultAvatarURL)
                    .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
                if (guild.saida_msg !== 'null') {
                    embed.setDescription(guild.saida_msg)
                }
                const emoji_trix_saiu = client.emojis.find(a => a.name === 'trix_saiu')
                if (guild.saida_msg === 'null') {
                    embed.setDescription(`
                        **${emoji_trix_saiu}|${member.user.tag} Até mais :(
                        Nos vemos por aí!**
                    
                        ***Agora o servidor tem ${member.guild.memberCount} membros***`)
                }
                canal.send(embed)
            }else{
                guild.saida_channel='0'
                guild.save()
            }


            //contador
            if (member.guild.channels.find(canal => canal.id === guild.contador_de_membros_channel)) {
                const canal = member.guild.channels.find(canal => canal.id === guild.contador_de_membros_channel)
                const edit = `${member.guild.memberCount}`
                    .replace(/0/g, ':one:')
                    .replace(/1/g, ':one:')
                    .replace(/2/g, ':two:')
                    .replace(/3/g, ':three:')
                    .replace(/4/g, ':four:')
                    .replace(/5/g, ':five:')
                    .replace(/6/g, ':six:')
                    .replace(/7/g, ':seven:')
                    .replace(/8/g, ':eight:')
                    .replace(/9/g, ':nine:')
                canal.setTopic(`${edit} ***MEMBROS***`)
            }else{
                guild.contador_de_membros_channel='0'
                guild.save
            }

        }
    })

    eco.findOne({ guildid: member.guild.id, userid: member.id }, (err, result) => {
        if (result) {
            eco.findOneAndDelete({ guildid: member.guild.id, userid: member.id }, (err, result) => { })
        }
    })

    const maquinas = require('../models/maquinas.js')
    maquinas.findOneAndDelete({guildid: member.guild.id,userid: member.id},(err,sdhs)=>{})
}

module.exports.help = {
    name: 'guild-member-remove'
}