const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const responses = [
    "It is certain.",  
    "Without a doubt.",  
    "You may rely on it.",  
    "Yes, definitely.",  
    "It is decidedly so.",  
    "As I see it, yes.",  
    "Most likely.",  
    "Yes.",  
    "Outlook good.",  
    "Signs point to yes.", 
    "Reply hazy, try again.",  
    "Better not tell you now.",  
    "Ask again later.",  
    "Cannot predict now.",  
    "Concentrate and ask again.",  
    "Don't count on it.",  
    "Outlook not so good.",  
    "My sources say no.",  
    "Very doubtful.",  
    "My reply is no.",  
    "No.",  
    "Definitely not.",  
    "No way.",  
    "I highly doubt it.",  
    "Absolutely not."  
  ]

module.exports = {
      data: new SlashCommandBuilder()
      .setName('8ball')
      .setDescription('Ask a question and get a random reply')
      .addStringOption(option => option
        .setName('question')
        .setDescription('Ask your question!')
        .setMinLength(10)
        .setMaxLength(50)
        .setRequired(true)
      )
      .addBooleanOption(option => option
        .setName('hidden')
        .setDescription('Hide or to not hide the response')
      )
      ,
      
      async execute(interaction) {
        const { options, user } = await interaction
        const question = options.getString('question')
        const hidden = await options.getBoolean('hidden')

        if(!question.endsWith('?')) return interaction.reply(
            {
                ephemeral: true, 
                content: 'Question must end with ?'
            }
        )

        let randomNumber = Math.floor(Math.random() * responses.length)

        let embed = new EmbedBuilder()
            .setAuthor({
                //name: user.username, 
                name: 'Question: ',
                iconURL: user.displayAvatarURL()
            })
            .setColor('Red')
            .setDescription(question)
            .addFields(
                //{
                //    name: `${user.username} question:`,
                //    value: question
                //},
                {
                    name: '8-ball Response:',
                    value: responses[randomNumber]
                }
            )
        interaction.reply(
            {
                ephemeral: hidden, 
                embeds: [embed]
            }
        )
      }
}

//couldnt decide on the design of the embed so commented out some stuff