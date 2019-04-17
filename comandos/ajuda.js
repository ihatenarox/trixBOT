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


const color = require('cli-color')

exports.run = (client, message) => {
    const eventos = require("../models/eventos.js")
    eventos.find({}, (err, events) => {
        const evento = events.length > 0 ? `${'```'}md\n#EVENTO\n<Informações: Possui um evento no bot ocorrendo no momento, utilize ${config.prefix}evento para obter mais informações!>${'```'}\n` : ''
        const embed_home = new Discord.RichEmbed()
            .setColor('#FFD700')
            .setTitle('AJUDA')
            .setDescription(`
            ${evento}**===//===**

            Reaja com a cetegoria que deseja ver
            
            🏠 = Volta para este menu
            🔧 = Geral
            🚔 = Moderação
            🔣 = Utilidades
            💰 = Economia
            🎶 = Musica
            ${client.emojis.find(a => a.name === 'trix_changelog')} = ChangeLog e links uteis!
            
            **===//===**`)
        message.channel.send(embed_home).then(async ajuda => {
            await ajuda.react('🏠')
            await ajuda.react('%F0%9F%94%A7')//geral
            await ajuda.react('%F0%9F%9A%94')//mod
            await ajuda.react('%F0%9F%94%A3')//utilidades
            await ajuda.react('%F0%9F%92%B0')//economia
            await ajuda.react('%F0%9F%8E%B6')//musica
            await ajuda.react(client.emojis.find(a => a.name === 'trix_changelog'))//changlog

            const collector = ajuda.createReactionCollector(((reaction, user) => user.id === message.author.id), { 'time': 60000 })
            collector.on('collect', col1 => {
                col1.remove(message.author.id)
                //home
                if (col1.emoji.name === '🏠') {
                    ajuda.edit(embed_home)
                }

                //Geral
                if (col1.emoji.identifier === '%F0%9F%94%A7') {
                    const embed_edit = new Discord.RichEmbed()
                        .setColor('#FFD700')
                        .setTitle('AJUDA - Geral')
                        .setDescription(`
                        **===//===**

                        **${config.prefix}config** = Configurar o bot
                        **${config.prefix}staff** = Ver lista de staffs do servidor
                        **${config.prefix}regras** = Ver regras do servidor
                        **${config.prefix}vipinfo** = Para ver informações do seu vip e utilizar os beneficios vip!
                        
                        **===//===**
                        
                        **${config.prefix}Sobre** = Ver algumas informações sobre o bot
                        **${config.prefix}sugestao <Segestão>** = Mandar alguma sugestão para ser adicionada no bot
                        ${'```'}fix\nComo sonseguir vip\n1- Quando o bot reagir alguma mensagem com 💎 seja o primeiro a reagir!\n2- Em eventos feito pelo bot em ocasiões especiais!${'```'}
                        
                        **===//===**
                        `)
                    ajuda.edit(embed_edit)
                }

                //moderação
                if (col1.emoji.identifier === '%F0%9F%9A%94') {
                    const embed_edit = new Discord.RichEmbed()
                        .setColor('#FFD700')
                        .setTitle('AJUDA - Moderação')
                        .setDescription(`
                        **${config.prefix}mute <user> <motivo opcional>** = Mutar alguem
                        **${config.prefix}unmute <user> <motivo opcional>** = Desmutar alguem
                        **${config.prefix}tempmute <user> <tempo> <motivo opcional>** = Mutar alguem por algum tempo
                        **${config.prefix}anunciar <mensagem>** = Fazer um anuncio para todo o servidor
                        **${config.prefix}kick <user>** = kickar alguem
                        **${config.prefix}ban <user>** = banir alguem
                        **${config.prefix}warn <user> <motivo>** = avisar um usuario sobre algo que ele fez

                        ***===//===***

                        **Exemplos de tempo:**
                        **10s** = 10 Segundos
                        **3m** = 3 Minutos
                        **5h** = 5 Horas
                        **1d** = 1 Dia
                        
                        ***===//===***`)
                    ajuda.edit(embed_edit)
                }


                //utilidades
                if (col1.emoji.identifier === '%F0%9F%94%A3') {
                    const embed_edit = new Discord.RichEmbed()
                        .setColor('#FFD700')
                        .setTitle('AJUDA - Utilidades')
                        .setDescription(`
                        ***===//===***

                        **${config.prefix}ping** = Ver o ping do bot

                        **${config.prefix}votacao-criar <fale sobre a votaçao>** = Fazer uma votação no servidor
                        **${config.prefix}votacao-encerrar <id da votação>** = Encerrar uma votação e mostrar os resultados

                        **${config.prefix}sorteio-criar <Premio>** = Criar um sorteio
                        **${config.prefix}sorteio-encerrar <id do sorteio>** = Finalizar um sorteio

                        **${config.prefix}userinfo <user>** = Para ver informações de um usuario
                        **${config.prefix}limpar <numero entre 2 e 100>** = Limpar uma quantidade especifica de mensagens do chat

                        **${config.prefix}ticket-abrir <duvida>** = Para abrir um ticket para alguem da staff responder
                        **${config.prefix}ticket-fechar <ticket id> <resposta>** = Para responder um ticket
                        **${config.prefix}ticket-ver <ticket id>** = Para ver algumas informações sobre algum ticket!

                        ***===//===***`)
                    ajuda.edit(embed_edit)
                }


                //economia
                if (col1.emoji.identifier === '%F0%9F%92%B0') {
                    const embed_edit = new Discord.RichEmbed()
                        .setColor('#FFD700')
                        .setTitle('AJUDA - Economia')
                        .setDescription(`
                    **===/Membros/===**
                    **${config.prefix}coins <user opcional>** = Para ver seus coins ou de outra pessoa
                    **${config.prefix}coins-top** = Para ver os 10 mais ricos do servidor
                    **${config.prefix}loja** = Ver a loja de caegos do servidor
                    **${config.prefix}loja-comprar <id>** = Comprar algum cargo da loja
                    **${config.prefix}coins-transferir <user> <quantia>** = Transferir coins para alguem
                    **${config.prefix}daily** = para pegar seus coins diarios!
                    **${config.prefix}hackear** = Para simular um ataque hacker e conseguir alguns coins, ${'``'}obs: Não retira coins de ninguem${'``'}
                    **${config.prefix}roleta <valor>** = Você ira girar uma roleta e tera a chance de duplicar seu money ou ate mesmo triplicar
                    **${config.prefix}maquinas** = Abrirá um menu para você ver sua maquinas e/ou comprar uma maquina

                    **===/Administradores/===**
                    **${config.prefix}coins-set <user> <valor>** = Para definir um valor para os coins de alguem
                    **${config.prefix}coins-add <user> <valor>** = Adicionar coins no conta de alguem
                    **${config.prefix}coins-remove <user> <valor>** = Retirar coins da conta de alguem
                    **${config.prefix}corrida <valor>** = Para fazer um evento corrida valendo coins
                    **${config.prefix}loja-adicionar <cargo> <preço> <descrição>** = Colocar um cargo na loja
                    **${config.prefix}loja-remove <id>** = Remover um cargo da loja`)
                    ajuda.edit(embed_edit)
                }


                //changelog
                if (col1.emoji.identifier === '%F0%9F%8E%B6') {
                    const embed_edit = new Discord.RichEmbed()
                        .setColor('#FFD700')
                        .setTitle('AJUDA - Musica')
                        .setThumbnail(client.user.avatarURL)
                        .setDescription(`
                        ***===/Musica/===***
                        **${config.prefix}play <Link youtube | Playlist Youtube | Ou digite algo que o bot pesquisa>** = Para iniciar uma reprodução ou colocar colocar uma musica na fila!
                        **${config.prefix}fila** = Ver as proximas musicas da fila
                        
                        ***===/Dj-Administrador/===***
                        **Os comandos abaixo so funcionam em quem é administrador ou tem o cargo com o nome de ${'``'}Dj${'``'}**
                        
                        **${config.prefix}skip** = Pular para a proxima musica
                        **${config.prefix}pause** = Pausar ou Continuar a musica pausada
                        **${config.prefix}stop** = Limpar toda a fila de musicas e parar a reprodução
                        **${config.prefix}volume <Numero entre 0 e 10>** = Definir o volume das musicas`)
                        ajuda.edit(embed_edit)
                }


                //changelog
                if (col1.emoji.name === 'trix_changelog') {
                    const embed_edit = new Discord.RichEmbed()
                        .setColor('#FFD700')
                        .setTitle('CHANGLOG')
                        .setThumbnail(client.user.avatarURL)
                        .setDescription(`
                        ***===/ChangeLog/===***
                        [Clique para ver](https://pastebin.com/raw/ERJ4PrAp)
                        
                        ***===/Invite/===***
                        Coloque o meu bot em seu servidor utilizando o link abaixo
                        [clique para convidar](https://discordapp.com/oauth2/authorize?client_id=523614773091500054&scope=bot&permissions=2146958847)`)
                    ajuda.edit(embed_edit)
                }



            })
        })
    })
}

module.exports.help = {
    name: '/ajuda/'
}