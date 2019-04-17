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


const color = require('cli-color')

exports.run = (client, member) => {
    db_config.findOne({ guildid: member.guild.id }, (err, guild) => {
        if (guild) {

            //msg
            if (member.guild.channels.find(canal => canal.id === guild.bem_vindo_channel)) {
                const canal = member.guild.channels.find(canal => canal.id === guild.bem_vindo_channel)
                const embed = new Discord.RichEmbed()
                    .setColor('#66CDAA')
                    .setAuthor(`BEM-VINDO ${member.user.tag}`, member.user.avatarURL || member.user.defaultAvatarURL)
                    .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
                if (guild.bem_vindo_msg !== 'null') {
                    embed.setDescription(guild.bem_vindo_msg)
                }
                const emoji_trix_entrou = client.emojis.find(a => a.name === 'trix_entrou')
                if (guild.bem_vindo_msg === 'null') {
                    embed.setDescription(`
                    **${emoji_trix_entrou}|${member} Bem-Vindo ao servidor __${member.guild.name}__. Divirta-se!**
                    
                    ***Com você o servidor tem ${member.guild.memberCount} membros***`)
                }
                canal.send(embed).then(m => {
                    m.edit(`- ${member}`)
                })
            }else{
                guild.bem_vindo_channel='0'
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
            }
            
            //autorole
            const roleid = guild.autorole_id
            if(roleid !== '0'){
                const cargo = member.guild.roles.find(a => a.id === roleid)
                if(cargo){
                    member.addRole(cargo)
                }else{
                    guild.autorole_id='0'
                }
            }
            guild.save()
        }
    })
}

module.exports.help = {
    name: 'guild-member-add'
}