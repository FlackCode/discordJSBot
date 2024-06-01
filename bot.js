import { Client, Collection, GatewayIntentBits, SlashCommandBuilder } from 'discord.js'
require('dotenv').config()
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const fs = require('node:fs')

client.commands = getCommands('./commands')

client.on('ready', (c) => {
  console.log(`Started as ${c.user.tag}`)
})

client.on('interactionCreate', interaction => {
  if (!interaction.isChatInputCommand) return
  console.log(client.commands)
  let command = client.commands.get(interaction.commandName)
  try {
    if (interaction.replied) return
    command.execute(interaction)
  } catch (error) {
    console.error(error)
  }
})

client.login(process.env.TOKEN)

function getCommands(dir) {
  let commands = new Collection()
  const commandFiles = getFiles(dir)

  for (const commandFile of commandFiles) {
    const command = require(commandFile)
    commands.set(command.data.toJSON().name, command)
  }
  return commands
}

function getFiles(dir) {
  const files = fs.readdirSync(dir, {
      withFileTypes: true
  })
  let commandFiles = []

  for (const file of files) {
      if (file.isDirectory()) {
          commandFiles = [
              ...commandFiles,
              ...getFiles(`${dir}/${file.name}`)
          ]
      } else if (file.name.endsWith('.js')) {
          commandFiles.push(`${dir}/${file.name}`)
      }
  }
  return commandFiles
}