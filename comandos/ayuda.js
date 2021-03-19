const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "ayuda",
        description: "Muestra Todos Los Comandos\n\n",
        usage: "[comando]",
        aliases: ["comandos"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="`"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("Comandos De "+client.user.username, "https://media3.giphy.com/media/ek2TRZpcD3W24/giphy.gif")
        .setColor("RANDOM")
        .setDescription(allcmds)
        .setFooter("\n\nPara obtener información de cada comando puedes hacer c! help -Comando- | Creador - 黄泉月るな ♡#0008 \n\n Fecha:")
        .setTimestamp()
        .setThumbnail("https://media.tenor.com/images/b69984838d6cfce97830c75fb84b2a90/tenor.gif")
        .setImage("https://media4.giphy.com/media/8fvUo27LObB7i/giphy.gif")

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Comando Desconocido")
            let commandinfo = new MessageEmbed()
            .setTitle("Comando: "+command.info.name+" - informacion")
            .setColor("RANDOM")
            .setImage("https://i.pinimg.com/originals/cb/ef/3b/cbef3bc669f1dffdcc87fb091b64c62e.gif")
						.setDescription(`
Nombre: ${command.info.name}\n\n
Descripcion: ${command.info.description}\n\n
Uso: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\` \n\n
Otros Nombres: ${command.info.aliases.join(", ")}\n\n
`)
            message.channel.send(commandinfo)
        }
    }
}
