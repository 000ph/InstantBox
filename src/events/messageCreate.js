const { MessageEmbed } = require('discord.js');


module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (message.channel.isTicket) return;

    let prefix = process.env.PREFIX;

    if (message.channel.type === 'DM') {

        if (!message.content.startsWith(prefix)) {
            let mutualGuilds = [];
            for (let guild of client.guilds.cache.values()) {
                let members = await guild.members.fetch();

                let member = members.get(message.author.id);
                if (member)
                    mutualGuilds.push(member);
            }

            let embed = new MessageEmbed()
                .setTitle(`${mutualGuilds.length} Guild${mutualGuilds.length > 1 ? 's' : ''} Mútua${mutualGuilds.length > 1 ? 's' : ''}.`)
                .setDescription(`${mutualGuilds.map(member => `**ID ${mutualGuilds.indexOf(member)} | ${member.guild.name}**`).join('\n')}`)
                .setColor('BLURPLE')
                .setFooter('Use --open <id> para abrir uma nova thread.');

            message.reply({ content: `Olá, **${message.author.username}** :wave:`, embeds: [embed] });

        } else {
            if (message.author.bot || !message.content.startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            try {
                let cmd = client.commands.get(command);
                if (!cmd) return;
                if (!cmd.dmUsable) return;
                cmd.run(client, message, args);

            } catch (err) {

                console.error(`Erro enquanto tentava executar um comando.`, err.stack);
                message.reply("Desculpe, ocorreu um erro ao tentar executar esse comando :(")
            }
        }
    } else if (message.channel.type === 'GUILD_TEXT') {

        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();



        try {
            let cmd = client.commands.get(command);
            if (!cmd) return;
            if (!cmd.guildUsable) return;
            cmd.run(client, message, args);

        } catch (err) {

            console.error(`Erro enquanto tentava executar um comando.`, err.stack);
            message.reply("Desculpe, ocorreu um erro ao tentar executar esse comando :(")
        }

    }
}
