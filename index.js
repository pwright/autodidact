#!/usr/bin/env node
var matchExt = require("match-extension");
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
      exec(`node ./markdown-commands.js ${sourcefile}.didact.md`, {});
      exec(`node ./markdown-comments.js ${sourcefile}.didact.md`, {});


    } else if (matchExt(/\.adoc/, `${sourcefile}`)) {
      const greeting = `Converting AsciiDoc ${sourcefile}!`;
      console.log(greeting);

      exec(`cp ${sourcefile} ${sourcefile}.didact.adoc`, {});
      exec(`node ./asciidoc-commands.js ${sourcefile}.didact.adoc`, {});
      exec(`node ./asciidoc-comments.js ${sourcefile}.didact.adoc`, {});
      exec(`node ./asciidoc-command-output.js ${sourcefile}.didact.adoc`, {});

    } else {
      const greeting = `Cannot convert ${sourcefile}!`;
      console.log(greeting);
    }
  }
).argv;
