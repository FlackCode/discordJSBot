const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
      data: new SlashCommandBuilder()
      .setName('poll')
      .setDescription('Create a new poll')
      .addStringOption(option => option
        .setName('poll_title')
        .setDescription('Add a title to your poll!')
        .setMaxLength(50)
        .setRequired(true)
      )
      .addStringOption(option => option
        .setName('option1')
        .setDescription('Option 1 of 3')
        .setMaxLength(50)
        .setRequired(true)
      )
      .addStringOption(option => option
        .setName('option2')
        .setDescription('Option 2 of 3')
        .setMaxLength(50)
        .setRequired(true)
      )
      .addStringOption(option => option
        .setName('option3')
        .setDescription('Option 3 of 3')
        .setMaxLength(50)
        .setRequired(false)
      )
      ,


      async execute(interaction) {
        await interaction.deferReply({ephemeral: true})
        const { channel } = await interaction

        const options = await interaction.options.data

        const emojis = ['1️⃣', '2️⃣', '3️⃣']

        let embed = new EmbedBuilder()
            .setTitle(`${options[0].value}`)
            .setColor('Red')
        for (let i = 1; i < options.length; i++) {
            let emoji = emojis[i-1]
            let option = options[i]
            embed.addFields({
                name: `${emoji} ${option.value}`,
                value: ' '
            })
        }
        
        const message = await channel.send({embeds: [embed]})
        for (let i = 1; i < options.length; i++) {
            let emoji = emojis[i-1]
            message.react(emoji)
        }

        await interaction.editReply({
            content: 'sent poll successfully!'
        })
      }
}