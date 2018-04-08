"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
const program = require("commander");
const chalk = require("chalk");
const BotConfig_1 = require("./BotConfig");
program
    .name("msbot list")
    .option('-b, --bot <path>', "path to bot file.  If omitted, local folder will look for a .bot file")
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .action((cmd, actions) => {
});
let parsed = program.parse(process.argv);
if (!parsed.bot) {
    BotConfig_1.BotConfig.LoadBotFromFolder(process.cwd(), parsed.secret)
        .then(processListArgs)
        .catch((reason) => {
        console.error(chalk.default.redBright(reason.toString().split("\n")[0]));
        program.help();
    });
}
else {
    BotConfig_1.BotConfig.Load(parsed.bot, parsed.secret)
        .then(processListArgs)
        .catch((reason) => {
        console.error(chalk.default.redBright(reason.toString().split("\n")[0]));
        program.help();
    });
}
async function processListArgs(config) {
    let services = config.services;
    if (parsed.secret) {
        for (let service of services) {
            let encryptedProperties = config.getEncryptedProperties(service.type);
            for (var prop of encryptedProperties) {
                let val = service[prop];
                service[prop] = config.decryptValue(val);
            }
        }
    }
    console.log(JSON.stringify(services, null, 4));
    return config;
}
//# sourceMappingURL=msbot-list.js.map