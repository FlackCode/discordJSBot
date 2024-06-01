const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
      data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Help Menu'),
      
      async execute(interaction) {
        const embed = new EmbedBuilder()
        .setTitle('Help')
        .setDescription('Bot Menu')
        .setColor("Red")
        .setAuthor({
            name: interaction.user.tag, 
            iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp()
        .addFields(
            {
                name: 'Example',
                value: 'example text',
                inline: true
            },
            {
                name: 'Example 2',
                value: 'example text 2',
                inline: true
            }
        )

        await interaction.reply({
            embeds: [embed],
            ephemeral: false //only you can see this message
        })
      }
}
