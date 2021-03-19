require("dotenv").config();//ESTO CARGA EL .ENV
const fs = require("fs");
const Monitor = require('ping-monitor'); //este es para el 24/7
const keepAlive = require('./server'); //este es para el 24/7
const { Collection, Client } = require("discord.js");

const client = new Client();
client.commands = new Collection();

//VE A .ENV Y PON TU TOKEN/PREFIX RECOMIENDO DEJAR UN ESPACIO EN EL PREFIX ASI COMO ESTA SOLO CAMBIA EL SIGNO
client.login(process.env.TOKEN)

client.config = {
  prefix: process.env.PREFIX,
}

keepAlive();
const monitor = new Monitor({
    website: 'https://sombras-2.markox36.repl.co', //este es para el 24/7
    title: 'Secundario',
    interval: 15 // minutes
});

//ESTADO DEL BOT

client.on("ready", () => {
  client.user.setPresence({
    activity: {
      name: "⚫ | ! ayuda",
      type: "PLAYING"
    },
     status: "idle"
  }); 
});

////////Monitor//////////    //este es para el 24/7
monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) ); 
monitor.on('error', (error) => console.log(error));

//Eventos
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Evento Cargado - "+eventName)
  });
});

//ESTO TE AYUDARA PARA SABER SI LOS COMANDOS ESTAN BIEN O TIENEN ALGUN ERROR
fs.readdir("./comandos/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./comandos/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Comando Cargado - "+commandName)
  });
});

