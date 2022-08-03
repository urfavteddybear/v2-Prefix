const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Util",
    description: "Invite me to your server",
    args: false,
    usage: "",
    permission: [],
    aliases: ["inv"],

    run: async (message, args, client, prefix) => {

        const embed = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setTitle(`Invite me to your server`)
            .setDescription(
                `You can invite me to your server by clicking [here](https://discord.com/api/oauth2/authorize?client_id=929248460442574859&permissions=277083450689&scope=bot%20applications.commands)`
            );
        return message.reply({ embeds: [embed] });

    }
}