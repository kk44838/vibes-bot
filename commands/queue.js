const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require("../music.js");

function songsToString(songs) {
    const queueShowLength = 10
    const slicedArray = songs.slice(0, queueShowLength);
    console.log(`songsToString ${slicedArray}`)
    let msg = 'Songs in Queue:' + '\n';
    slicedArray.forEach((song, index) => {
        msg += `**${index + 1}** ` + song.title + ` **${song.duration}**` + '\n';
    });
    console.log(msg)
    return msg
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Queue'),
	async execute(interaction) {
        const serverQueue = music.queue.get(interaction.guild.id);
        // console.log(serverQueue.songs)
        if (!serverQueue || !serverQueue.songs)
            return await interaction.reply("**Empty Queue**")

		await interaction.reply(songsToString(serverQueue.songs))
		
	},
};
