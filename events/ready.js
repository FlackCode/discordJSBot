module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Started as ${client.user.tag}`)
    }
}