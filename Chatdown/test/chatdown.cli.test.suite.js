const assert = require('assert');
const {exec} = require('child_process');
const chatdown = require.resolve('../bin/chatdown.js');

describe('The Chatdown cli tool', () => {

    it('should print the help contents when --help is passed as an argument', done => {
        exec(`node ${chatdown} --help`, (error, stdout) => {
            assert(stdout.includes('--help') && stdout.includes('--version'));
            done();
        });
    });

    it('should print the help contents when --help is passed as an argument', done => {
        exec(`node ${chatdown} --help`, (error, stdout) => {
            assert(stdout.includes('--help') && stdout.includes('--version'));
            done();
        });
    });

    it('should accept data as a pipe and output the results', done => {
        exec(`(echo user=Joe && echo bot=LuliBot && echo LuliBot: hello! && echo joe:can I get some help?) | node ${chatdown} --bot bot --user user`, (error, stdout) => {
            assert.doesNotThrow(() => JSON.parse(stdout));
            done();
        });
    });

    it('should throw when a malformed config options is encountered in the input', done => {
        exec(`echo bot=LuliBot=joe | node ${chatdown} `, (error, stdout, stderr) => {
            assert(stderr.trim() === 'Error: Malformed configurations options detected. Options must be in the format optionName=optionValue');
            done();
        });
    });
});