const Discord = require('discord.js');
const me = new Discord.Client();
const core = require('./core.js');
const CONFIG = require('../config.json');

const transdata = require('./transdata.js');

const COMMAND_MODULES = [transdata];

const version = '0X';

const run = function(message, input, command_module) {
    input = input.split(' ');
    let command = input.shift().toLowerCase();
    console.log('Command: ' + command);
    let f;
    if(command_module) {
        f = command_module.commands[command];
    } else {
        for(let i = 0; i < COMMAND_MODULES.length; i++) {
            let module = COMMAND_MODULES[i];
            if(f = module.commands[command]) {
                break;
            }
        }
    }
    if(f) {
        f(message, input);
    } else {
        message.channel.send(core.tag(message.author.id) + ', unknown command `' + command + '`');
    }
};
me.on('ready', function() {
    console.log('Hello World!');
});
me.on('message', function(message) {
    let input = message.content;
    console.log(input);
    for(let i = 0; i < COMMAND_MODULES.length; i++) {
        let module = COMMAND_MODULES[i];
        if(input.startsWith(module.prefix)) {
            run(message, input.slice(module.prefix.length), module);
            break;
        }
    }
});
me.login(CONFIG.token);