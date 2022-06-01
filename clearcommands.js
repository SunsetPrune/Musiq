require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.TOKEN;
const clientId = "981171741793583215";
const guildId = "842183560516468756";
    
const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationCommands(clientId))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
