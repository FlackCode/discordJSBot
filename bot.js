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
      .addUserOption(option => 
        option
            .setName('user')
            .setDescription('User to say hi to')
            .setRequired(false)
      )
      .addStringOption(option => 
        option
            .setName('text')
            .setDescription('Add text to the message!')
            .setRequired(false)
      )
    const echo = new SlashCommandBuilder()
      .setName('echo')
      .setDescription('Repeats what you said')
      .addStringOption(option => 
        option
            .setName('text')
            .setDescription('The text to repeat')
            .setRequired(true)
      )
    client.application.commands.create(ping, process.env.GUILD_ID)
    client.application.commands.create(hello, process.env.GUILD_ID)
    client.application.commands.create(echo, process.env.GUILD_ID)
})

client.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand) return
    if (interaction.commandName === 'ping') {
        interaction.reply('Pong!')
    }
    if (interaction.commandName === 'hello') {
        const user = interaction.options.getUser('user') || interaction.user
        const text = interaction.options.getString('text') || ''
        interaction.reply(`Hello ${user.username} ${text}`)
    }
    if (interaction.commandName === 'echo') {
        const text = interaction.options.getString('text')
        interaction.reply(text)
    }


})

client.login(process.env.TOKEN)