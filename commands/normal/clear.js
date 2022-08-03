const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    category: "Music",
    description: "Clear all queued songs from queue",
    args: false,
    usage: "",
    permission: [],
    aliases: ["cl"],

    run: async (message, args, client, prefix) => {

        let player = client.manager.players.get(message.guild.id);
        if (!player) {
            const queueEmbed = new MessageEmbed()
                .setColor(client.config.embedColor)
                .setDescription("❌ | **Nothing is playing right now...**");
            return message.reply({ embeds: [queueEmbed], ephemeral: true });
        }

        if (!message.member.voice.channel) {
            const joinEmbed = new MessageEmbed()
                .setColor(client.config.embedColor)
                .setDescription(
                    "❌ | **You must be in a voice channel to use this command!**"
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
                    "❌ | **You must be in the same voice channel as me to use this command!**"
                );
            return message.reply({ embeds: [sameEmbed], ephemeral: true });
        }

        if (!player.queue || !player.queue.length || player.queue.length === 0) {
            let cembed = new MessageEmbed()
                .setColor(client.config.embedColor)
                .setDescription("❌ | **Invalid, Not enough track to be cleared.**");

            return message.reply({ embeds: [cembed], ephemeral: true });
        }

        player.queue.clear();

        let clearembed = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setDescription(`✅ | **Cleared the queue!**`);

        return message.reply({ embeds: [clearembed] });
    }
}