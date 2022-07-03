const { Client, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ 
    intents: [
      'GUILDS',
      'GUILD_MESSAGES',
      'GUILD_MEMBERS'
    ] 
});
client.events = new Collection();
client.commands = new Collection();
client.config = require('./config.json');

fs.readdir('./netkreatif.cmds/', async (err, files) => {
    if (err) throw new Error(err);
    files.forEach(async (dosya) => {
        var cmd = require(`./netkreatif.cmds/${dosya}`);
        client.commands.set(cmd.name, cmd);
    });
});

fs.readdir('./netkreatif.events/', async (err, files) => {
    if (err) throw new Error(err);
    files.forEach(async (dosya) => {
        var event = require(`./netkreatif.events/${dosya}`);
        client.events.set(event.name, event);
    });
});

const prefix = client.config.prefix;
client.on('messageCreate', async (message) => {
    client.events.get('messageCreate').execute(client, message, prefix)
});
client.on('ready', async () => client.events.get('ready').execute(client));


client.on('interactionCreate', async (i) => {
  if (!i.isButton()) return;
  if (i.customId == "roles1") {
    const role = "1ROL_ID";
    if (!i.member.roles.cache.has(role)) {
      i.member.roles.add(role);
      return i.reply({ content: 'Rol verildi.', ephemeral: true });
    } else {
      i.member.roles.remove(role);
      return i.reply({ content: 'Rol alındı.', ephemeral: true });
    }
  } else if (i.customId == "roles2") {
    const role = "2ROL_ID"; 
    if (!i.member.roles.cache.has(role)) {
      i.member.roles.add(role);
      return i.reply({ content: 'Rol verildi.', ephemeral: true });
    } else {
      i.member.roles.remove(role);
      return i.reply({ content: 'Rol alındı.', ephemeral: true });
    }
      } else if (i.customId == "roles3") {
        const role = "3ROL_ID"; 
        if (!i.member.roles.cache.has(role)) {
          i.member.roles.add(role);
          return i.reply({ content: 'Rol verildi.', ephemeral: true });
        } else {
          i.member.roles.remove(role);
          return i.reply({ content: 'Rol alındı.', ephemeral: true });
        }
    
  }
});

client.login(client.config.token);
