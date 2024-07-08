export const Command = {
    name: 'ping',
    description: 'Replies with Pong!',
    run: async(client: any, interaction: {
        createdTimestamp: number; reply: (arg0: string) => any; 
}) => {
        const botping = client.ws.ping
        const clientPing = Date.now() - interaction.createdTimestamp

        interaction.reply(`Bot: ${botping}ms\nClient: ${clientPing}ms`)
    }
}