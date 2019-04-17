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


const color = require('cli-color')

exports.run = (client, message) => {
    const db_create = client.exec.get('db-new')
    db_create.run(client, message.guild)

    const aaa = '```'
    const embed_home = new Discord.RichEmbed()
        .setColor('#4169E1')
        .setTitle(`CONFIGURAR ${client.user.tag}`)
        .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
        .setTimestamp(message.createdAt)
        .setDescription(`
            ***__CONFIG ${client.user.username.toUpperCase()}__***
            __Reaja com a categoria que deseja ver__
            
            🏠=**__ESTA JANELA__**
            :one:= **__ENTRADA/AUTOROLE__**
            :two:= **__SAIDA__**
            :three: = **__CONTADOR DE MEMBROS__**
            :four: = **__LISTA DE STAFFS__**
            :five: = **__REGRAS/ANTI-LINK__**
            :six: = **__CANAL DE PUNIÇÕES__**
            :seven: = **__SISTEMA DE TICKETS__**
            :eight: = **__MUSICA__**
            :nine:= n/d
            
            **Para ver quais configurações estão habilitadas ou desativadas utilize __${config.prefix}stats__**`)
    message.channel.send(embed_home).then(home => {
        function emoji1(gg) {
            home.react('🏠')
            const aa = client.setTimeout(emoji2, 400, '')
        }
        function emoji2(gg) {
            home.react('1%E2%83%A3')
            const aa = client.setTimeout(emoji3, 300, '')
        }
        function emoji3(gg) {
            home.react('2%E2%83%A3')
            const aa = client.setTimeout(emoji4, 300, '')
        }
        function emoji4(gg) {
            home.react('3%E2%83%A3')
            const aa = client.setTimeout(emoji5, 300, '')
        }
        function emoji5(gg) {
            home.react('4%E2%83%A3')
            const aa = client.setTimeout(emoji6, 300, '')
        }
        function emoji6(gg) {
            home.react('5%E2%83%A3')
            const aa = client.setTimeout(emoji7, 300, '')
        }
        function emoji7(gg) {
            home.react('6%E2%83%A3')
            const aa = client.setTimeout(emoji8, 300, '')
        }
        function emoji8(gg) {
            home.react('7%E2%83%A3')
            const aa = client.setTimeout(emoji9, 300, '')
        }
        function emoji9(gg) {
            home.react('8%E2%83%A3')
            const aa = client.setTimeout(emoji10, 300, '')
        }
        function emoji10(gg) {
            home.react('9%E2%83%A3')
        }
        const aa = client.setTimeout(emoji1, 300, '')
        const collector1 = home.createReactionCollector((reaction, user) => user.id === message.author.id, { time: 90000 })
        collector1.on('collect', col1 => {
            col1.remove(message.member)
            //home
            if (col1.emoji.name === '🏠') {
                home.edit(embed_home)
            }

            //bem_vindo/AUTOROLE
            if (col1.emoji.identifier === '1%E2%83%A3') {
                const embed_1 = new Discord.RichEmbed()
                    .setColor('#4169E1')
                    .setTitle(`CONFIGURAR ${client.user.tag}`)
                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                    .setTimestamp(message.createdAt)
                    .setDescription(`
                        ***__BEM-VINDO/ENTRADA__***

                        __Obs: Este comando por padrão ja vem desativado para ativar use **${config.prefix}bem-vindo-set-canal**__

                        ${aaa}fix\n${config.prefix}bem-vindo-set-canal <mencione o canal> = Para configurar um canal para o bot mandar mensagens de bem-vindo${aaa}
                        ${aaa}fix\n${config.prefix}bem-vindo-set-msg <mensagem> = Mudar a mensagem de bem-vindo${aaa}
                        ${aaa}fix\n${config.prefix}bem-vindo-autorole-set <cargo> = Selecionar um cargo para ser adionado á todos quando entrarem no servidor${aaa}
                        ${aaa}fix\n${config.prefix}bem-vindo-reset = Voltar as configurações padrao do bot!${aaa}`)
                home.edit(embed_1)
            }


            //saida
            if (col1.emoji.identifier === '2%E2%83%A3') {
                const embed_1 = new Discord.RichEmbed()
                    .setColor('#4169E1')
                    .setTitle(`CONFIGURAR ${client.user.tag}`)
                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                    .setTimestamp(message.createdAt)
                    .setDescription(`
                        ***__SAIDA__***

                        __Obs: Este comando por padrão ja vem desativado para ativar use **${config.prefix}saida-set-canal**__

                        ${aaa}fix\n${config.prefix}saida-set-canal <mencione o canal> = Para configurar um canal para o bot mandar mensagens de bem-vindo${aaa}
                        ${aaa}fix\n${config.prefix}saida-set-msg <mensagem> = Mudar a mensagem de bem-vindo${aaa}
                        ${aaa}fix\n${config.prefix}saida-reset = Voltar as configurações padrao do bot${aaa}`)
                home.edit(embed_1)
            }


            //contador de mebros
            if (col1.emoji.identifier === '3%E2%83%A3') {
                const embed_1 = new Discord.RichEmbed()
                    .setColor('#4169E1')
                    .setTitle(`CONFIGURAR ${client.user.tag}`)
                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                    .setTimestamp(message.createdAt)
                    .setDescription(`
                        ***__CONTADOR DE MEMBROS__***

                        __Obs: Este comando por padrão ja vem desativado para ativar use **${config.prefix}contador-set-canal**__

                        ${aaa}fix\n${config.prefix}contador-set-canal <mencione o canal> = Para configurar um canal para o bot mandar mensagens de bem-vindo${aaa}
                        ${aaa}fix\n${config.prefix}contador-reset = Voltar as configurações padrao do bot${aaa}`)
                home.edit(embed_1)
            }


            //staff list
            if (col1.emoji.identifier === '4%E2%83%A3') {
                const embed_1 = new Discord.RichEmbed()
                    .setColor('#4169E1')
                    .setTitle(`CONFIGURAR ${client.user.tag}`)
                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                    .setTimestamp(message.createdAt)
                    .setDescription(`
                        ***__LISTA DE STAFFS__***

                        ${aaa}fix\n${config.prefix}staff-add <cargo> = Para adicionar uma cargo na lista de staffs${aaa}
                        ${aaa}fix\n${config.prefix}staff-remove <cargo> = Para retirar um cargo da lista de staffs${aaa}
                        
                        ***<cargo>*** Você tem que mencionar um cargo

                        ***Utilize __${config.prefix}staff__ para ver a lista de staffs!***`)
                home.edit(embed_1)
            }


            //regras / anti link
            if (col1.emoji.identifier === '5%E2%83%A3') {
                const embed_1 = new Discord.RichEmbed()
                    .setColor('#4169E1')
                    .setTitle(`CONFIGURAR ${client.user.tag}`)
                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                    .setTimestamp(message.createdAt)
                    .setDescription(`
                        ***__REGRAS__***
                        
                        ${aaa}fix\n${config.prefix}regras-set <regras> = Colocar as regras do servidor no comando <${config.prefix}regras>!${aaa}
                        ${aaa}fix\n${config.prefix}regras-reset = Voltar as configurações padrao do bot!${aaa}
                        
                        ***__ANTI-LINK__***
                        ${aaa}fix\n${config.prefix}antilink-level-set <level> = Habilitar ou desabilitar o anti-link${aaa}
                        
                        Leveis Do anti-link:
                        0 = Desabilitado
                        1 = Bloquear somente convites de servidores
                        2 = Bloquear convites de servidores e links externos
                        3 = Somentes administradores podem enviar invites e links`)
                home.edit(embed_1)
            }


            //punições
            if (col1.emoji.identifier === '6%E2%83%A3') {
                const embed_1 = new Discord.RichEmbed()
                    .setColor('#4169E1')
                    .setTitle(`CONFIGURAR ${client.user.tag}`)
                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                    .setTimestamp(message.createdAt)
                    .setDescription(`
                        ***__PUNIÇÕES__***
                        
                        ${aaa}fix\n${config.prefix}punicoes-set-canal <mencione o canal> = Configurar um canal para enviar mensagens de Bans,Kicks,mutes,unmutes,warns,etc!${aaa}
                        ${aaa}fix\n${config.prefix}punicoes-reset = Voltar as configurações padrao do bot!${aaa}`)
                home.edit(embed_1)
            }


            //tickets
            if (col1.emoji.identifier === '7%E2%83%A3') {
                const embed_1 = new Discord.RichEmbed()
                    .setColor('#4169E1')
                    .setTitle(`CONFIGURAR ${client.user.tag}`)
                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                    .setTimestamp(message.createdAt)
                    .setDescription(`
                        ***__TICKETS__***
                        
                        ${aaa}fix\n${config.prefix}ticket-set-canal <mencione o canal> = Configurar um canal para enviar os tickets das pessoas!${aaa}
                        ${aaa}fix\n${config.prefix}ticket-reset = Voltar as configurações padrao do bot!${aaa}`)
                home.edit(embed_1)
            }


            //musica
            if (col1.emoji.identifier === '8%E2%83%A3') {
                const embed_1 = new Discord.RichEmbed()
                    .setColor('#4169E1')
                    .setTitle(`CONFIGURAR ${client.user.tag}`)
                    .setFooter(`Comando executado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                    .setTimestamp(message.createdAt)
                    .setDescription(`
                        ***__MUSICA__***
                        
                        ${aaa}fix\n${config.prefix}musica-set-canais <canal de texto 1> <Canal de texto 2> = Configurar os canais de pedir musicas ,log de musica e reproduzir musicas!${aaa}
                        Como usar: Entre no canal de voz que você deseja que o bot reproduza as musicas
                        e mencione 2 canais de texto
                        Canal 1 = Canal para pedir musicas!
                        canal 2 = Canal para a logs de musica (Onde eu enviarei a musica que esta tocando no momento)
                        
                        ${aaa}fix\n${config.prefix}musica-playlist <true ou false> = Habilitar ou desabilitar a possobilidade de colocar playlists na fila de musica\n(true = Pode colocar)\n(false = Não pode colocar)${aaa}
                        ${aaa}fix\n${config.prefix}musica-tempo <tempo em segundos> = Definir um tempo maximo para as musicas!${aaa}
                        
                        ${aaa}fix\n${config.prefix}musica-reset = Voltar as configurações padrão do bot!${aaa}`)
                home.edit(embed_1)
            }


        })
    })
}

module.exports.help = {
    name: '/config/'
}