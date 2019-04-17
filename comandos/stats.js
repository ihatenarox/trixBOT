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
const music_c = require("../models/music_volume.js")

const color = require('cli-color')

exports.run = (client, message) => {
    db_config.findOne({ guildid: message.guild.id }, (err, guild) => {
        staff_list.find({ guildid: message.guild.id }, (err, lista_staff) => {
            regras.findOne({ guildid: message.guild.id }, (err, g_regras) => {
                music_c.findOne({ guildid: message.guild.id }, (err, music_c) => {
                    const embed = new Discord.RichEmbed()
                        .setFooter('-', message.guild.iconURL)
                        .setTimestamp(message.createdAt)
                        .setColor('#FFD700')
                        .setTitle(`${message.guild.name} Configurações`)
                        .setDescription(`***Utilize o comando __${config.prefix}config__ para ver os comando de como me configurar!***`)
                        .setThumbnail(message.guild.iconURL)


                    //bem vindo
                    const channel_bem_vindo = message.guild.channels.find(a => a.id === guild.bem_vindo_channel)
                    embed.addField('BEM-VINDO', `
                    Canal: ${channel_bem_vindo}
                    Mensagem personalizada: ${guild.bem_vindo_msg !== 'null'}
                    AutoRole: ${message.guild.roles.find(role => role.id === guild.autorole_id)}`
                        .replace(/true/g, '✅')
                        .replace(/false/g, '❌')
                        .replace(/null/g, '❌'))


                    //saida
                    const saida_channel = message.guild.channels.find(a => a.id === guild.saida_channel)
                    embed.addField('SAIDA', `
                    Canal: ${saida_channel}
                    Mensagem personalizada: ${guild.saida_msg !== 'null'}`
                        .replace(/true/g, '✅')
                        .replace(/false/g, '❌')
                        .replace(/null/g, '❌'))


                    //staff list
                    if (lista_staff.length > 0) {
                        embed.addField('LISTA DE STAFFS', `Cargos na lista: ${lista_staff.length}`)
                    } else {
                        embed.addField('LISTA DE STAFFS', `Configurada: ❌`)
                    }


                    //regras
                    const req_regras = g_regras.regras !== 'null'
                    embed.addField(`REGRAS`, `Regras Configuradas: ${req_regras}`
                        .replace(/true/g, '✅')
                        .replace(/false/g, '❌'))

                    //contador de membros
                    const contador_de_membros = message.guild.channels.find(canal => canal.id === guild.contador_de_membros_channel) || false
                    embed.addField('CONTADOR DE MEMBROS', `Canal: ${contador_de_membros}`
                        .replace(/true/g, '✅')
                        .replace(/false/g, '❌'))

                    //canal de punicoes
                    const canal_punicoes = message.guild.channels.find(canal => canal.id === guild.punicoes_channel) || false
                    embed.addField('CANAL DE PUNIÇÕES', `Canal: ${canal_punicoes}`
                        .replace(/true/g, '✅')
                        .replace(/false/g, '❌'))

                    embed.addField('ANTI-LINK e INVITE', `Level: ${guild.antilink}`)

                    const canal_tickets = message.guild.channels.find(c => c.id === guild.ticket_channel) || false
                    embed.addField('CANAL DE TICKETS', `Canal: ${canal_tickets}`
                        .replace(/true/g, '✅')
                        .replace(/false/g, '❌'))

                    const musica = music_c? music_c:false
                    const musica2 = musica===false? false:music_c.volume*10
                    const musica3 = musica === false ? false : client.channels.find(c => c.id === music_c.pedir_channel)
                    const musica4 = musica === false ? false : client.channels.find(c => c.id === music_c.log_channel)
                    const musica5 = musica === false ? false : client.channels.find(c => c.id === music_c.music_channel)
                    const musica6 = musica === false ? false : music_c.playlist
                    const musica7 = musica === false ? false : music_c.tempo
                    embed.addField('MUSICA', musica!==false? `
                    Canal pedir musicas: ${musica3}
                    Canal log de musica (Onde eu enviarei a musica que esta tocando no momento): ${musica4}
                    
                    Canal reproduzir musica: ${musica5}
                    Volume: ${musica2}
                    Playlist: ${musica6}
                    Tempo maximo das musicas: ${musica7} segundos`
                        .replace(/true/g, '✅')
                        .replace(/false/g, '❌')
                        .replace(/null/g, '❌'):`Configuração: Pode reproduzir e pedir musica em qualquer canal!`)

                    message.channel.send(embed)
                })
            })
        })
    })
}

module.exports.help = {
    name: '/stats/'
}