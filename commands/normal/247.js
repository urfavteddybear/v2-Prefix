const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Music",
    description: "247 toggle",
    args: false,
    usage: "",
    permission: [],
    aliases: [],

    run: async (message, args, client, prefix) => {

        let player = client.manager.players.get(message.guild.id);
        if (!message.member.voice.channel) {
            const joinEmbed = new MessageEmbed()
                .setColor(client.config.embedColor)
                .setDescription(
                    "❌ | **You need to join voice channel first before you can use this command.**"
                );
            return message.reply({ embeds: [joinEmbed], ephemeral: true });
        }

        if (
            message.guild.me.voice.channel &&
            !message.guild.me.voice.channel.equals(
                message.member.voice.channel
            )
        ) {
            const sameEmbed = new MessageEmbed()
                .setColor(client.config.embedColor)
                .setDescription(
                    "❌ | **You must be in the same voice channel as me.**"
                );
            return message.reply({ embeds: [sameEmbed], ephemeral: true });
        }
        if (!player) {
            return message.reply({
                embeds: [client.ErrorEmbed("**There's nothing to play 24/7!**")],
            });
        } else if (player.twentyFourSeven) {
            player.twentyFourSeven = false;
            const embed = client.Embed(`✅ | **24/7 mode is now off.**`);
            return message.reply({ embeds: [embed] });
        } else {
            player.twentyFourSeven = true;
            const embed = client.Embed(`✅ | **24/7 mode is now on.**`);
            return message.reply({ embeds: [embed] });
        }
    }
}