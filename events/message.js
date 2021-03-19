module.exports = async (client, message) => {
  if (message.author.bot) return;

  //Los Prefix también tienen coincidencia de mención
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : client.config.prefix;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  //Haciendo el comando lowerCase porque nuestro nombre de archivo estará en lowerCase
  const command = args.shift().toLowerCase();

  //Buscando un comando
  const cmd = client.commands.get(command);
  //Buscando un alias de comando
  const aliases = client.commands.find(x => x.info.aliases.includes(command))

process.on("unhandledRejection", (reason, promise) => {
    try {
        console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
    } catch {
        console.error(reason);
    }
});
require('events').EventEmitter.defaultMaxListeners = 25


  //Ejecutando los códigos cuando obtenemos el comando o alias
  if(cmd){
    cmd.run(client, message, args);
  }else if(aliases){
    aliases.run(client, message, args);
  }else return
};
