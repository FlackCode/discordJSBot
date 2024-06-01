const { SlashCommandBuilder } = require('discord.js')

module.exports = {
      data: new SlashCommandBuilder()
      .setName('echo')
      .setDescription('Repeats what you said')
      .addStringOption(option => 
        option
            .setName('text')
            .setDescription('The text to repeat')
            .setRequired(true)
      ),

      async execute(interaction) {
            const text = interaction.options.getString('text')
            interaction.reply(text)
      }
}



