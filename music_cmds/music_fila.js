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

const ytld = require("ytdl-core")
exports.run = (client, message, play) => {
    message.channel.send('Aguarde... Estou dando uma olhada na lista de musicas!')
    const musics = require("../models/music.js")
    musics.find({ guildid: message.guild.id }).sort([['id', 'ascending']]).exec((err, result) => {
        const embed = new Discord.RichEmbed()
            .setColor('#00FF7F')
            .setTitle(result.length >= 10 ? `Proximas 10 Musicas` : `Proxima(s) ${result.length} Musica(s)`)
            .setFooter(`Total de ${result.length} musicas na fila`)
        descricao = '\n'
        a1()
        async function a1() {
            const n = 0
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n**Musica Atual: [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    a2()
                })

            } else {
                msg()
            }
        }

        async function a2() {
            const n = 1
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n\n**2. [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    a3()
                })

            } else {
                msg()
            }
        }

        async function a3() {
            const n = 2
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n\n**3. [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    a4()
                })

            } else {
                msg()
            }
        }

        async function a4() {
            const n = 3
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n\n**4. [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    a5()
                })

            } else {
                msg()
            }
        }

        async function a5() {
            const n = 4
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n\n**5. [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    a6()
                })

            } else {
                msg()
            }
        }

        async function a6() {
            const n = 5
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n\n**6. [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    a7()
                })

            } else {
                msg()
            }
        }

        async function a7() {
            const n = 6
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n\n**7. [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    a8()
                })

            } else {
                msg()
            }
        }

        async function a8() {
            const n = 7
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n\n**8. [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    a9()
                })

            } else {
                msg()
            }
        }

        async function a9() {
            const n = 8
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n\n**9. [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    a10()
                })

            } else {
                msg()
            }
        }

        async function a10() {
            const n = 9
            if (result[n]) {
                await ytld.getBasicInfo(result[n].link, async (err, info) => {
                    if (info) {
                        descricao = `${descricao}\n\n**10. [${info.title}](${info.video_url})\n(Pedido por: ${'``'}${result[n].autor}${'``'})**`
                    }
                    msg()
                })

            } else {
                msg()
            }
        }

        function msg() {
            embed.setDescription(descricao)
            message.channel.send(embed)
        }
    })
}

module.exports.help = {
    name: '/fila/'
}