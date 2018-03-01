let spawn = require('child_process').spawn;
let fs = require('fs');
let core = require('./core.js');
const CONFIG = require('../config.json')
const prefix = 'T!';

let children = {};
let output = {};
module.exports = {
    desc: 'TransData Module',
    prefix: prefix,
    commands: {
        tlisp: function(message, args) {
            args = args.join(' ').split('\n');
            
            message.channel.send(core.tag(message.author.id) + ', ok, I\'ll run that.');
            let code;
            if(args.length === 1) {
                console.log('One line code');
                code = args[0].trim();
            } else {
                console.log('Multi line code');
                code = '';
                let recording = false;
                for(let i = 0; i < args.length; i++) {
                    let line = args[i];
                    if(line.startsWith('```')) {
                        if(recording) {
                            break;
                        } else {
                            recording = true;
                        }
                    } else {
                        if(recording) {
                            code += line + '\n';
                        }
                    }
                }
            }
            
            fs.writeFile(CONFIG.dir_up + '\\temp.tlisp', code, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log('Code: ' + code);
                console.log("The file was saved!");
                
                let key = '' + Math.random();
                
                message.channel.send(core.tag(message.author.id) + ', I\'m starting up TransData.');
                let child = spawn('cmd.exe', ['/s/c', 'cd', CONFIG.dir, '&', 'TransData.bat']);
                child.stdout.on('data', function(data) {
                    console.log('stdout: ' + data);
                    output[key] += data + '\n';
                });
                child.stderr.on('data', function(data) {
                    console.log('stderr: ' + data);
                    output[key] += data + '\n';
                });
                child.on('close', function(code) {
                    console.log('TransData done');
                    let result = output[key];
                    delete children[key];
                    delete output[key];
                    result = result.split('\n').slice(11);
                    result = result.join('\n');
                    message.channel.send(core.tag(message.author.id) + ', TLisp result:\n```\n' + result + '\n```');
                    
                });
                output[key] = '';
                children[key] = true;
                
                console.log('TransData running');
            });
        }
    }
}