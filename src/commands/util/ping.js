const BaseCommand = require('../../../Structures/BaseCommand');
module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super('ping', 'utilities', [], true, true);

    }

    run(client, message, args) {
        message.reply("Pong!")
    }
}