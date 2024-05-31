import { Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js'
require('dotenv').config()
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.on('ready', (c) => {
  console.log(`Started as ${c.user.tag}`)

    const ping = new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!')

    const hello = new SlashCommandBuilder()
      .setName('hello')
      .setDescription('Says hello to someone')
    
    client.application.commands.create(ping, process.env.GUILD_ID)
    client.application.commands.create(hello, process.env.GUILD_ID)
})

client.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand) return
    if (interaction.commandName === 'ping') {
        interaction.reply('Pong!')
    }
    if (interaction.commandName === 'hello') {
        interaction.reply(`Hello ${interaction.user.username}`)
    }


})

client.login(process.env.TOKEN)