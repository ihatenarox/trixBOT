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
const staff_list = require("../models/staff-list.js")
const regras = require("../models/regras.js")
const mute = require("../models/mute.js")
const userinfo = require("../models/userinfo.js")
const warns = require("../models/warns.js")
const loja_tags = require("../models/loja-tags.js")
const eco = require("../models/eco.js")

const color = require('cli-color')

exports.run = async (client, message, play) => {
    const ids = require("../models/inv_musicas")
    const music_vol = require("../models/music_volume.js")
    music_vol.findOne({ guildid: message.guild.id }, (err, music_config) => {
        if (music_config) {
            if (message.member.voiceChannel) {
                if (music_config.music_channel !== '0' && music_config.pedir_channel !== '0') {
                    if (client.channels.find(c => c.id === music_config.music_channel) && client.channels.find(c => c.id === music_config.pedir_channel)) {
                        if (message.member.voiceChannelID === music_config.music_channel) {
                            if (message.channel.id === music_config.pedir_channel) {
                                passo2()
                            } else {
                                const embed_err = new Discord.RichEmbed()
                                    .setColor('#ff0000')
                                    .setDescription(`${message.member}**, Você so pode pedir musicas no canal ${client.channels.find(c => c.id === music_config.pedir_channel)}!**`)
                                message.channel.send(embed_err)
                            }
                        } else {
                            const embed_err = new Discord.RichEmbed()
                                .setColor('#ff0000')
                                .setDescription(`${message.member}**, Você precisa estar no canal de voz ${client.channels.find(c => c.id === music_config.music_channel)}!**`)
                            message.channel.send(embed_err)
                        }
                    } else {
                        music_config.pedir_channel = '0'
                        music_config.music_channel = '0'
                        music_config.save()
                        passo2()
                    }
                } else {
                    passo2()
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Você precisa estar em um canal de voz!**`)
                message.channel.send(embed_err)
            }
        } else {
            const newmusicconfig = new music_vol({
                guildid: message.guild.id,
                volume: 0.3,
                pedir_channel: '0',
                log_channel: '0',
                music_channel: '0',
                playlist: true,
                tempo: 420
            })
            newmusicconfig.save()
            passo2()
        }
    })



    function passo2() {
        ids.findOne({ find: 'id' }, async (err, id) => {
            const music_config = require("../models/music_volume.js")
            music_config.findOne({ guildid: message.guild.id }, async (err, music_c) => {
                ido = id.numero
                const ytld = require("ytdl-core")
                if (message.member.voiceChannel) {
                    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
                    const link = ytld.validateURL(args.slice(1, 2).join(' '))
                    if (link) {
                        await ytld.getInfo(args.slice(1, 2).join(' '), async (err, infoprevia) => {
                            if (infoprevia) {
                                if (infoprevia.player_response.videoDetails.lengthSeconds <= music_c.tempo) {
                                    const music = require("../models/music.js")
                                    const newmusic = new music({
                                        guildid: message.guild.id,
                                        link: args.slice(1, 2).join(' '),
                                        autor: `${message.author.tag}`,
                                        id: id.numero
                                    })
                                    id.numero = id.numero + 1
                                    await id.save()
                                    await newmusic.save()
                                    music.find({ guildid: message.guild.id }, (err, result) => {
                                        if (result.length < 2) {
                                            message.member.voiceChannel.join().then(conexao => {
                                                play(message, conexao)
                                            })
                                        }
                                    })

                                    const duracao = infoprevia.player_response.videoDetails.lengthSeconds
                                    const minutos = Math.floor(duracao / 60)
                                    const temp1 = Math.floor(duracao - (minutos * 60))
                                    const segundos = temp1
                                    const embed = new Discord.RichEmbed()
                                        .setColor('#FFD700')
                                        .setTitle('⏱-Musica Adicionada na fila')
                                        .setDescription(`Titulo: **[${infoprevia.title}](${infoprevia.video_url})**\nCanal: **[${infoprevia.author.name}](${infoprevia.author.channel_url})**\nDuração: **${minutos}:${segundos}**`)
                                        .setFooter(`Musica pedida por: ${message.author.tag}`, message.author.displayAvatarURL)
                                        .setThumbnail(infoprevia.thumbnail_url)
                                    message.channel.send(embed)

                                } else {
                                    const embed_err = new Discord.RichEmbed()
                                        .setColor('#ff0000')
                                        .setDescription(`${message.member}**, A musica deve ser menor que ${music_c.tempo} segundos!**`)
                                    message.channel.send(embed_err)
                                }
                            } else {
                                const embed_err = new Discord.RichEmbed()
                                    .setColor('#ff0000')
                                    .setDescription(`${message.member}**, Erro ao pegar informações do video! Tente novamente mais tarde!**`)
                                message.channel.send(embed_err)
                            }
                        })
                    }


                    else {
                        const yts = require("youtube-search")
                        if (args.slice(1).join(' ').startsWith('https://www.youtube.com/playlist')) {
                            const music_config = require("../models/music_volume.js")
                            music_config.findOne({ guildid: message.guild.id }, (err, result) => {
                                if (result) {
                                    if (result.playlist === true) {
                                        passo3()
                                    } else {
                                        const embed_err = new Discord.RichEmbed()
                                            .setColor('#ff0000')
                                            .setDescription(`${message.member}**, As playlists estão bloqueadas neste servidor!**`)
                                        message.channel.send(embed_err)
                                    }
                                } else {
                                    const newc = new music_config({
                                        guildid: message.guild.id,
                                        volume: 0.3,
                                        pedir_channel: '0',
                                        log_channel: '0',
                                        music_channel: '0',
                                        playlist: true,
                                        tempo: 420
                                    })
                                    newc.save()
                                    passo3()
                                }
                                function passo3() {
                                    const yt_pl = require("youtube-playlist")
                                    yt_pl(args.slice(1).join(' '), 'url').then(async playlist_ids => {
                                        const music = require("../models/music.js")
                                        music.find({ guildid: message.guild.id }, (err, resulta) => {
                                            if (resulta.length < 2) {
                                                message.member.voiceChannel.join().then(conexao => {
                                                    client.setTimeout(play, 0, message, conexao)
                                                })
                                            }
                                        })
                                        playlist_ids.data.playlist.forEach(async (v1, i1) => {
                                            const link2 = `${v1}`

                                            const newmusic = new music({
                                                guildid: message.guild.id,
                                                link: link2,
                                                autor: `${message.author.tag}`,
                                                id: ido
                                            })
                                            ido = ido + 1
                                            await newmusic.save()

                                        })
                                        id.numero = ido
                                        await id.save()

                                        const embed_err = new Discord.RichEmbed()
                                            .setColor('#00FF7F')
                                            .setDescription(`${message.member}**,⏱-${playlist_ids.data.playlist.length} Musicas adicionadas na fila!!**`)
                                        message.channel.send(embed_err)
                                    })
                                }
                            })
                        } else {
                            message.channel.send(`Procurando no **Youtube** ${'``'}${args.slice(1).join(' ')}${'``'}`)
                            yts(args.slice(1).join(' '), { maxResults: 1, key: 'AIzaSyASmn-hJfE_kze-DiQBlBYAgSMT7eR29sA', type: 'video', 'videoCategoryId': '10' }, (err, video) => {
                                if (video.length > 0) {
                                    const link2 = `${video[0].link}`
                                    const inv_musicas = require("../models/inv_musicas.js")

                                    const vl = ytld.validateURL(link2)
                                    if (vl) {
                                        ytld.getInfo(link2, async (err, infoprevia) => {
                                            if (infoprevia) {
                                                if (infoprevia.player_response.videoDetails.lengthSeconds <= music_c.tempo) {

                                                    const music = require("../models/music.js")
                                                    const newmusic = new music({
                                                        guildid: message.guild.id,
                                                        link: link2,
                                                        autor: `${message.author.tag}`,
                                                        id: id.numero
                                                    })
                                                    id.numero = id.numero + 1
                                                    await id.save()
                                                    await newmusic.save()
                                                    music.find({ guildid: message.guild.id }, async (err, result) => {
                                                        if (result.length < 2) {
                                                            message.member.voiceChannel.join().then(conexao => {
                                                                client.setTimeout(play, 0, message, conexao)
                                                            })
                                                        }
                                                    })

                                                    const duracao = infoprevia.player_response.videoDetails.lengthSeconds
                                                    const minutos = Math.floor(duracao / 60)
                                                    const temp1 = Math.floor(duracao - (minutos * 60))
                                                    const segundos = temp1
                                                    const embed = new Discord.RichEmbed()
                                                        .setColor('#FFD700')
                                                        .setTitle('⏱-Musica Adicionada na fila')
                                                        .setDescription(`Titulo: **[${infoprevia.title}](${infoprevia.video_url})**\nCanal: **[${infoprevia.author.name}](${infoprevia.author.channel_url})**\nDuração: **${minutos}:${segundos}**`)
                                                        .setFooter(`Musica pedida por: ${message.author.tag}`, message.author.displayAvatarURL)
                                                        .setThumbnail(infoprevia.thumbnail_url)
                                                    message.channel.send(embed).then(async msg => {
                                                        music.find({ guildid: message.guild.id }, async (err, lista) => {
                                                            if (lista.length > 1) {
                                                                const emoji_excluir = client.emojis.find(e => e.name === 'trix_errado')
                                                                await msg.react(emoji_excluir)

                                                                const coletor = msg.createReactionCollector(((reaction, user) => reaction.emoji.name === 'trix_errado' &&
                                                                    message.guild.members.find(m => m.id === user.id).hasPermission('ADMINISTRATOR') &&
                                                                    client.user.id !== user.id), { 'time': 120000 })

                                                                const coletor2 = msg.createReactionCollector(((reaction, user) => reaction.emoji.name === 'trix_errado' &&
                                                                    user.id === message.author.id &&
                                                                    client.user.id !== user.id), { 'time': 120000 })

                                                                const coletor3 = msg.createReactionCollector(((reaction, user) => reaction.emoji.name === 'trix_errado' &&
                                                                    message.guild.members.find(m => m.id === user.id).roles.find(r => r.name === 'Dj') &&
                                                                    client.user.id !== user.id), { 'time': 120000 })

                                                                coletor.on('collect', col => {
                                                                    coletor.stop()
                                                                    music.find({ guildid: message.guild.id }, (err, lista2) => {
                                                                        if (lista2.length > 0) {
                                                                            const id_exc = id.numero-1
                                                                            if (lista2[0].id !== id_exc) {
                                                                                music.findOneAndDelete({ id: id_exc }, (err, dsdsds) => {
                                                                                    if (dsdsds) {
                                                                                        msg.delete()
                                                                                        message.delete()
                                                                                    }
                                                                                })
                                                                            }
                                                                        }
                                                                    })
                                                                })


                                                                coletor2.on('collect', col => {
                                                                    coletor.stop()
                                                                    music.find({ guildid: message.guild.id }, (err, lista2) => {
                                                                        if (lista2.length > 0) {
                                                                            const id_exc = id.numero - 1
                                                                            if (lista2[0].id !== id_exc) {
                                                                                music.findOneAndDelete({ id: id_exc }, (err, dsdsds) => {
                                                                                    if (dsdsds) {
                                                                                        msg.delete()
                                                                                        message.delete()
                                                                                    }
                                                                                })
                                                                            }
                                                                        }
                                                                    })
                                                                })


                                                                coletor3.on('collect', col => {
                                                                    coletor.stop()
                                                                    music.find({ guildid: message.guild.id }, (err, lista2) => {
                                                                        if (lista2.length > 0) {
                                                                            const id_exc = id.numero - 1
                                                                            if (lista2[0].id !== id_exc) {
                                                                                music.findOneAndDelete({ id: id_exc }, (err, dsdsds) => {
                                                                                    if (dsdsds) {
                                                                                        msg.delete()
                                                                                        message.delete()
                                                                                    }
                                                                                })
                                                                            }
                                                                        }
                                                                    })
                                                                })


                                                            }
                                                        })
                                                    })

                                                } else {
                                                    const embed_err = new Discord.RichEmbed()
                                                        .setColor('#ff0000')
                                                        .setDescription(`${message.member}**, A musica deve ser menor que ${music_c.tempo} segundos!**`)
                                                    message.channel.send(embed_err)
                                                }
                                            } else {
                                                const embed_err = new Discord.RichEmbed()
                                                    .setColor('#ff0000')
                                                    .setDescription(`${message.member}**, Erro ao pegar informações do video! Tente novamente mais tarde!**`)
                                                message.channel.send(embed_err)
                                            }
                                        })
                                    } else {
                                        const embed_err = new Discord.RichEmbed()
                                            .setColor('#ff0000')
                                            .setDescription(`${message.member}**, Não Encontrei nenhuma musica com este nome!**`)
                                        message.channel.send(embed_err)
                                    }
                                } else {
                                    const embed_err = new Discord.RichEmbed()
                                        .setColor('#ff0000')
                                        .setDescription(`${message.member}**, Não Encontrei nenhuma musica com este nome!**`)
                                    message.channel.send(embed_err)
                                }
                            })
                        }
                    }
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.member}**, Você não está em um canal de voz!**`)
                    message.channel.send(embed_err)
                }
            })
        })
    }
}

module.exports.help = {
    name: '/play/'
}