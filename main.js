require('http').createServer().listen(3000)
//principais
const Discord = require('discord.js')
const client = new Discord.Client({
    'messageCacheMaxSize': 100,
    'messageCacheLifetime': 3600,
    'messageSweepInterval': 60,
    'fetchAllMembers': false,
})
const fs = require('fs')
const config = require("./config.json")

//database
const mongoose = require("mongoose")
mongoose.connect('mongodb://maycon190:+m97466833@ds135714.mlab.com:35714/dark_bot', {
    useNewUrlParser: true
})

const db_config = require("./models/config.js")
const staff_list = require("./models/staff-list.js")
const regras = require("./models/regras.js")
const mute = require("./models/mute.js")
const userinfo = require("./models/userinfo.js")
const warns = require("./models/warns.js")
const loja_tags = require("./models/loja-tags.js")
const eco = require("./models/eco.js")

const color = require('cli-color')
//https://discordapp.com/oauth2/authorize?client_id=523614773091500054&scope=bot&permissions=2146958847

//ready
client.on('ready', () => {
    console.log(color.yellow(`${client.user.tag} ONLINE`))

    const music = require("./models/music.js")
    music.find({}, (err, result) => {
        result.forEach((v1, i1) => {
            music.findOneAndDelete({ _id: v1._id }, (err, ssjs) => { })
        })
    })

    client.user.setPresence({ status: 'idle', game: { type: 'WATCHING', name: 'REINICIANDO' } })
    function change(gg) {
        //PLAYING
        //STREAMING
        //LISTENING
        //WATCHING
        const sn = [
            { game: 'Meus Comandos t!ajuda', type: 'STREAMING' },
            { game: `Estou em ${client.guilds.size} servidores`, type: 'PLAYING' },
            { game: `Conheço ${client.users.size} pessoas`, type: 'PLAYING' }
        ]
        const rand = sn[Math.floor(Math.random() * (sn.length))]

        client.user.setPresence({ status: 'online', game: { name: rand.game, type: rand.type, url: 'https://www.twitch.tv/kazinoboy__11' } })
    }
    const aa = client.setInterval(change, 7500, '')
})


//handler comandos
client.comando = new Discord.Collection();
fs.readdir("./comandos/", (err, files) => {

    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./comandos/${f}`);
        console.log(`${f}, CARREGADO!`)
        client.comando.set(props.help.name, props);
    });
});


//handler execs
client.exec = new Discord.Collection();
fs.readdir("./execs/", (err, files) => {

    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./execs/${f}`);
        console.log(`${f}, CARREGADO!`)
        client.exec.set(props.help.name, props);
    });
});

//handler owner coamndos
client.owcmd = new Discord.Collection();
fs.readdir("./owner_cmds/", (err, files) => {

    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./owner_cmds/${f}`);
        console.log(`${f}, CARREGADO!`)
        client.owcmd.set(props.help.name, props);
    });
});

//handler musica
client.music = new Discord.Collection();
fs.readdir("./music_cmds/", (err, files) => {

    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./music_cmds/${f}`);
        console.log(`${f}, CARREGADO!`)
        client.music.set(props.help.name, props);
    });
});

//executar comandos
client.on('message', async message => {
    if (message.author.bot) return;
    const msg = `${message.content}`
        .replace(/[áàâã]/g, 'a')
        .replace(/[éèê]/g, 'e')
        .replace(/[íìî]/g, 'i')
        .replace(/[òóôõ]/g, 'o')
        .replace(/[úùû]/g, 'u')
        .replace(/[ç]/g, 'c')
    const args = msg.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
    //cmds
    if (message.channel.type === 'text') {
        if (message.content.toLowerCase().startsWith(config.prefix)) {
            const cmd = `/${args.slice(0, 1).join(' ')}/`
            const get_cmd = client.comando.get(cmd)


            if (['unmutar', 'desmutar'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/unmute/')
                get_cmd1.run(client, message)
            }
            if (['mutar'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/mute/')
                get_cmd1.run(client, message)
            }
            if (['help'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/ajuda/')
                get_cmd1.run(client, message)
            }
            if (['configurar', 'configs'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/config/')
                get_cmd1.run(client, message)
            }
            if (['clear', 'clean'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/limpar/')
                get_cmd1.run(client, message)
            }
            if (['banir'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/ban/')
                get_cmd1.run(client, message)
            }
            if (['kickar'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/kick/')
                get_cmd1.run(client, message)
            }
            if (['staff-adicionar'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/staff-add/')
                get_cmd1.run(client, message)
            }
            if (['staff-remover'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/staff-remove/')
                get_cmd1.run(client, message)
            }
            if (['loja-adicionar'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/loja-add/')
                get_cmd1.run(client, message)
            }
            if (['loja-remover'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.comando.get('/loja-remove/')
                get_cmd1.run(client, message)
            }
            if (['usar-key'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
                const get_cmd1 = client.owcmd.get('usar-key')
                get_cmd1.run(client, message)
            }


            if (get_cmd) {
                get_cmd.run(client, message)
            }
        }

        const economia = client.exec.get('economia')
        economia.run(client, message)

        const antilink = client.exec.get('antilink')
        antilink.run(client, message)

        const vips_and_evento = client.exec.get('vips_evento_msg')
        vips_and_evento.run(client, message)

    } else {
        if (['usar-key'].some(a => message.content.startsWith(`${config.prefix}${a}`))) {
            const get_cmd1 = client.owcmd.get('usar-key')
            get_cmd1.run(client, message)
        } else {
            message.channel.send(`***${message.author.tag} Meus comandos so funcionam em servidores***`)
        }
    }
})


client.on('message', async message => {
    if (message.content.toLowerCase().startsWith('owner!')) {
        const args = message.content.toLowerCase().slice(6).trim().split(/ +/g);
        const getcmd = client.owcmd.get(`/${args.slice(0, 1)}/`)
        if (getcmd) {
            if (message.author.id === '532334423656497172') {
                getcmd.run(client, message)
            } else {
                message.reply('Somente meu criador consegue executar este comando!')
            }
        }
    }
})

//bem vindo
client.on('guildMemberAdd', (member) => {
    const get_exec = client.exec.get('guild-member-add')
    get_exec.run(client, member)
})

//saida
client.on('guildMemberRemove', (member) => {
    const get_exec = client.exec.get('guild-member-remove')
    get_exec.run(client, member)
})

//verificador de mute
function tempmute_Verificador(ff) {
    const get_exec = client.exec.get('tempmute')
    get_exec.run(client)
}
const abc = client.setInterval(tempmute_Verificador, 3000, '')

//entrou na guild
client.on('guildCreate', (guild) => {
    const get_exec = client.exec.get('db-new')
    get_exec.run(client, guild)
})

//saiu da guild
client.on('guildDelete', (guild) => {
    const get_exec = client.exec.get('db-saida')
    get_exec.run(client, guild)
})

function gerar_maquinas() {
    const vips = require("./models/vips.js")
    const maquinas = require("./models/maquinas.js")
    maquinas.find({}, (err, maqs) => {
        maqs.forEach((v1, i1) => {
            vips.findOne({ userid: v1.userid }, (err, vip) => {
                const maq = maqs[i1]

                const maquina1_gera = vip ? Math.floor(((69 * vip.mult) * maq.maquina1_inv)) : Math.floor(69 * maq.maquina1_inv)
                const maquina2_gera = vip ? Math.floor(((239 * vip.mult) * maq.maquina2_inv)) : Math.floor(239 * maq.maquina1_inv)
                const maquina3_gera = vip ? Math.floor(((1388 * vip.mult) * maq.maquina3_inv)) : Math.floor(1388 * maq.maquina1_inv)
                const total = Math.floor(maquina1_gera + maquina2_gera + maquina3_gera)
                eco.findOne({ guildid: v1.guildid, userid: v1.userid }, (err, rcoins) => {

                    rcoins.coins = Math.floor(rcoins.coins + total)
                    rcoins.save()
                })
            })
        })
    })
}
const time_gerar_maquinas = client.setInterval(gerar_maquinas, 60000)


const ytld = require('ytdl-core')
async function play(message, conexao) {
    const music = require("./models/music.js")
    const music_volume = require("./models/music_volume.js")
    if (message.guild.voiceConnection.channel.members.size > 1) {
        music.find({ guildid: message.guild.id }).sort([['id', 'ascending']]).exec(async (err, result) => {
            if (result.length > 0) {
                conexao.dispatcher = conexao.playStream(ytld(result[0].link, { filter: 'audioonly', 'quality': 'lowest' }))
                music_volume.findOne({ guildid: message.guild.id }, (err, volume_guild) => {
                    conexao.dispatcher.setVolumeLogarithmic(volume_guild.volume)

                    const canal_log = volume_guild.log_channel !== '0' ? client.channels.find(a => a.id === volume_guild.log_channel) : message.channel
                    const canal_log2 = `${canal_log}` === 'null' ? message.channel : canal_log
                    ytld.getBasicInfo(result[0].link, async (err, infoprevia) => {
                        if (infoprevia) {
                            if (infoprevia.player_response.videoDetails.lengthSeconds <= volume_guild.tempo) {

                                const duracao = infoprevia.player_response.videoDetails.lengthSeconds
                                const minutos = Math.floor(duracao / 60)
                                const temp1 = Math.floor(duracao - (minutos * 60))
                                const segundos = temp1
                                const embed = new Discord.RichEmbed()
                                    .setColor('#FFD700')
                                    .setTitle('📀-Tocando Agora')
                                    .setDescription(`Titulo: **[${infoprevia.title}](${infoprevia.video_url})**\nCanal: **[${infoprevia.author.name}](${infoprevia.author.channel_url})**\nDuração: **${minutos}:${segundos}**`)
                                    .setFooter(`Musica pedida por: ${result[0].autor}${result.length - 1 > 0 ? ` | Tem mais ${result.length - 1} musica(s) na fila` : ''}`, message.guild.iconURL)
                                    .setThumbnail(infoprevia.thumbnail_url)
                                canal_log2.send(embed).then(async msg => {
                                    await msg.react('%E2%8F%AF')
                                    await msg.react('%E2%8F%B9')
                                    await msg.react('%E2%8F%AD')

                                    const coletor = msg.createReactionCollector(((reaction, user) =>
                                        message.guild.members.find(m => m.id === user.id).hasPermission('ADMINISTRATOR') &&
                                        !message.guild.members.find(m => m.id === user.id).roles.find(r => r.name === 'Dj') &&
                                        user.id !== client.user.id), {})


                                    const coletor2 = msg.createReactionCollector(((reaction, user) =>
                                        result[0].autor === user.tag &&
                                        user.id !== client.user.id &&
                                        !message.guild.members.find(m => m.id === user.id).hasPermission('ADMINISTRATOR') &&
                                        !message.guild.members.find(m => m.id === user.id).roles.find(r => r.name === 'Dj')), {})


                                    const coletor3 = msg.createReactionCollector(((reaction, user) =>
                                        message.guild.members.find(m => m.id === user.id).roles.find(r => r.name === 'Dj') &&
                                        !message.guild.members.find(m => m.id === user.id).hasPermission('ADMINISTRATOR') &&
                                        user.id !== client.user.id), {})

                                    const coletor4 = msg.createReactionCollector(((reaction, user) =>
                                        message.guild.members.find(m => m.id === user.id).hasPermission('ADMINISTRATOR') &&
                                        message.guild.members.find(m => m.id === user.id).roles.find(r => r.name === 'Dj') &&
                                        user.id !== client.user.id), {})

                                    await conexao.dispatcher.on('end', async () => {
                                        await music.findOneAndDelete({ guildid: message.guild.id, _id: result[0]._id }, (err, idsi) => { })
                                        play(message, conexao)
                                        coletor.stop()
                                        coletor2.stop()
                                        coletor3.stop()
                                        coletor4.stop()
                                    })

                                    coletor.on('collect', async col => {
                                        //play pause
                                        if (col.emoji.identifier === '%E2%8F%AF') {
                                            if (message.guild.voiceConnection.dispatcher.paused) {
                                                message.guild.voiceConnection.dispatcher.resume()
                                                const embed = new Discord.RichEmbed()
                                                    .setColor('#00FF7F')
                                                    .setDescription(`**▶️-Musica despausada!**`)
                                                canal_log2.send(embed)
                                            } else {
                                                message.guild.voiceConnection.dispatcher.pause()
                                                const embed = new Discord.RichEmbed()
                                                    .setColor('#00FF7F')
                                                    .setDescription(`**⏸-Musica pausada!**`)
                                                canal_log2.send(embed)
                                            }
                                        }

                                        //stop
                                        if (col.emoji.identifier === '%E2%8F%B9') {
                                            const music = require("./models/music.js")
                                            await music.find({ guildid: message.guild.id }, (err, musics) => {
                                                musics.forEach((v1, i1) => {
                                                    music.findOneAndDelete({ _id: v1._id }, (err, ddhb) => { })
                                                })
                                            })
                                            message.guild.voiceConnection.dispatcher.end()
                                            const embed_err = new Discord.RichEmbed()
                                                .setColor('#FF4500')
                                                .setDescription(`**⏹-Musica parada e a fila de musicas limpa!**`)
                                            canal_log2.send(embed_err)
                                        }

                                        //proximo
                                        if (col.emoji.identifier === '%E2%8F%AD') {
                                            message.guild.voiceConnection.dispatcher.end()
                                        }
                                    })


                                    coletor2.on('collect', async col => {
                                        //proximo
                                        if (col.emoji.identifier === '%E2%8F%AD') {
                                            message.guild.voiceConnection.dispatcher.end()
                                        }
                                    })


                                    coletor3.on('collect', async col => {
                                        //play pause
                                        if (col.emoji.identifier === '%E2%8F%AF') {
                                            if (message.guild.voiceConnection.dispatcher.paused) {
                                                message.guild.voiceConnection.dispatcher.resume()
                                                const embed = new Discord.RichEmbed()
                                                    .setColor('#00FF7F')
                                                    .setDescription(`**▶️-Musica despausada!**`)
                                                canal_log2.send(embed)
                                            } else {
                                                message.guild.voiceConnection.dispatcher.pause()
                                                const embed = new Discord.RichEmbed()
                                                    .setColor('#00FF7F')
                                                    .setDescription(`**⏸-Musica pausada!**`)
                                                canal_log2.send(embed)
                                            }
                                        }

                                        //stop
                                        if (col.emoji.identifier === '%E2%8F%B9') {
                                            const music = require("./models/music.js")
                                            await music.find({ guildid: message.guild.id }, (err, musics) => {
                                                musics.forEach((v1, i1) => {
                                                    music.findOneAndDelete({ _id: v1._id }, (err, ddhb) => { })
                                                })
                                            })
                                            message.guild.voiceConnection.dispatcher.end()
                                            const embed_err = new Discord.RichEmbed()
                                                .setColor('#FF4500')
                                                .setDescription(`**⏹-Musica parada e a fila de musicas limpa!**`)
                                            canal_log2.send(embed_err)
                                        }

                                        //proximo
                                        if (col.emoji.identifier === '%E2%8F%AD') {
                                            message.guild.voiceConnection.dispatcher.end()
                                        }
                                    })


                                    coletor4.on('collect', async col => {
                                        //play pause
                                        if (col.emoji.identifier === '%E2%8F%AF') {
                                            if (message.guild.voiceConnection.dispatcher.paused) {
                                                message.guild.voiceConnection.dispatcher.resume()
                                                const embed = new Discord.RichEmbed()
                                                    .setColor('#00FF7F')
                                                    .setDescription(`**▶️-Musica despausada!**`)
                                                canal_log2.send(embed)
                                            } else {
                                                message.guild.voiceConnection.dispatcher.pause()
                                                const embed = new Discord.RichEmbed()
                                                    .setColor('#00FF7F')
                                                    .setDescription(`**⏸-Musica pausada!**`)
                                                canal_log2.send(embed)
                                            }
                                        }

                                        //stop
                                        if (col.emoji.identifier === '%E2%8F%B9') {
                                            const music = require("./models/music.js")
                                            await music.find({ guildid: message.guild.id }, (err, musics) => {
                                                musics.forEach((v1, i1) => {
                                                    music.findOneAndDelete({ _id: v1._id }, (err, ddhb) => { })
                                                })
                                            })
                                            message.guild.voiceConnection.dispatcher.end()
                                            const embed_err = new Discord.RichEmbed()
                                                .setColor('#FF4500')
                                                .setDescription(`**⏹-Musica parada e a fila de musicas limpa!**`)
                                            canal_log2.send(embed_err)
                                        }

                                        //proximo
                                        if (col.emoji.identifier === '%E2%8F%AD') {
                                            message.guild.voiceConnection.dispatcher.end()
                                        }
                                    })


                                })
                            } else {
                                const duracao = infoprevia.player_response.videoDetails.lengthSeconds
                                const minutos = Math.floor(duracao / 60)
                                const temp1 = Math.floor(duracao - (minutos * 60))
                                const segundos = temp1
                                const embed = new Discord.RichEmbed()
                                    .setColor('#FFD700')
                                    .setTitle(`⏭Musica pulada; Motivo: Excede o tempo de ${volume_guild.tempo} segundos;`)
                                    .setDescription(`Titulo: **[${infoprevia.title}](${infoprevia.video_url})**\nCanal: **[${infoprevia.author.name}](${infoprevia.author.channel_url})**\nDuração: **${minutos}:${segundos}**`)
                                    .setFooter(`Musica pedida por: ${result[0].autor}`, message.guild.iconURL)
                                    .setThumbnail(infoprevia.thumbnail_url)
                                canal_log2.send(embed)
                                await music.findOneAndDelete({ _id: result[0]._id }, (err, sauhys) => { })
                                play(message, conexao)
                            }
                        } else {
                            await music.findOneAndDelete({ _id: result[0]._id }, (err, idsi) => { })
                            const embed = new Discord.RichEmbed()
                                .setColor('#FFD700')
                                .setTitle('⏭Musica pulada; Motivo: Erro ao pegar informações do video! Tente novamente mais tarde!;')
                                .setDescription(`Link: ${result[0].link}`)
                                .setFooter(`Musica pedida por: ${result[0].autor}`)
                            canal_log2.send(embed)
                            await music.findOneAndDelete({ _id: result[0]._id }, (err, sauhys) => { })
                            play(message, conexao)
                        }
                    })
                })
            } else {
                conexao.disconnect()
                const embed = new Discord.RichEmbed()
                    .setColor('#FFD700')
                    .setTitle('⏹-Acabou a festa')
                    .setDescription(`A minha lista de musicas acabou!`)
                message.channel.send(embed)
            }
        })
    } else {
        const music = require("./models/music.js")
        await music.find({ guildid: message.guild.id }, (err, musics) => {
            musics.forEach((v1, i1) => {
                music.findOneAndDelete({ _id: v1._id }, (err, ddhb) => { })
            })
        })
        message.guild.voiceConnection.disconnect()
    }
}


client.on('message', async message => {
    if (message.content.toLowerCase().startsWith(config.prefix)) {
        const args = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
        const getcmd = client.music.get(`/${args.slice(0, 1)}/`)
        if (getcmd) {
            getcmd.run(client, message, play)
        }
    }
})
client.login(config.token)