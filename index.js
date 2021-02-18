#!/usr/bin/env node
var matchExt = require("match-extension");
var autosubs = require('./substitutions');
const exec = require("child_process").execSync;

const argv = require("yargs").command(
  "$0 <source file> [destination file]",
  "the default command",
  () => {},
  function ({ sourcefile, destinationfile }) {
    console.log({ sourcefile, destinationfile });
    
    //destinationfile not implemented

    if (matchExt(/\.md/, `${sourcefile}`)) {
      const greeting = `Converting Markdown ${sourcefile}!`;
      console.log(greeting);
   
      exec(`cp ${sourcefile} ${sourcefile}.didact.md`, {});
      autosubs.mdCommands(`${sourcefile}.didact.md`);
      autosubs.mdComments(`${sourcefile}.didact.md`);

    } else if (matchExt(/\.adoc/, `${sourcefile}`)) {
      const greeting = `Converting AsciiDoc ${sourcefile}!`;
      console.log(greeting);

      exec(`cp ${sourcefile} ${sourcefile}.didact.adoc`, {});
      autosubs.adocCommandtoTerminalName(`${sourcefile}.didact.adoc`);
      autosubs.adocCommands(`${sourcefile}.didact.adoc`);
      autosubs.adocComments(`${sourcefile}.didact.adoc`);
      autosubs.adocCommandWithOutput(`${sourcefile}.didact.adoc`);

    } else {
      const greeting = `Cannot convert ${sourcefile}!`;
      console.log(greeting);
    }
  }
).argv;
