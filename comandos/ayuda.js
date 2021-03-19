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
        .setAuthor("Comandos De "+client.user.username, "(PON LA FOTO DEL BOT)") //(SOLO , GIF , JPG , PNG POR EJEMPLO , https://media3.giphy.com/media/ek2TRZpcD3W24/giphy.gif)
        .setColor("RANDOM") //(ESCOGE  UN COLOR , YO LO PUSE RANDOM)
        .setDescription(allcmds)
        .setFooter("Fecha:")
        .setTimestamp()
        .setThumbnail("(PON UNA LOGO O UNA FOTO CHICA)") //(SOLO , GIF , JPG , PNG POR EJEMPLO , https://media3.giphy.com/media/ek2TRZpcD3W24/giphy.gif)
        .setImage("(PON UNA FOTO , ESTA SALDRA EN GRANDE)") //(SOLO , GIF , JPG , PNG POR EJEMPLO , https://media3.giphy.com/media/ek2TRZpcD3W24/giphy.gif)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x = x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Comando Desconocido")
            let commandinfo = new MessageEmbed()
            .setTitle("Comando: "+command.info.name+" - informacion")
            .setColor("RANDOM") //(ESCOGE  UN COLOR , YO LO PUSE RANDOM)
            .setImage("") //(SOLO , GIF , JPG , PNG POR EJEMPLO , https://media3.giphy.com/media/ek2TRZpcD3W24/giphy.gif)
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

