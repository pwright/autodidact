#!/usr/bin/env node
var matchExt = require("match-extension");
var autosubs = require("./substitutions");
const exec = require("child_process").execSync;
var greeting = "";

const argv = require("yargs").command(
  "$0 <source file> [destination file]",
  "the default command",
  () => {},
  function ({ sourcefile, destinationfile }) {
    console.log({ sourcefile, destinationfile });

    //destinationfile not implemented
    //but .act.adoc does convert to .adoc

    var ext = sourcefile.substring(sourcefile.indexOf("."));
    switch (ext) {
      case ".md":
        greeting = `Converting Markdown ${sourcefile}!`;
        console.log(greeting);

        exec(`cp ${sourcefile} ${sourcefile}.didact.md`, {});
        autosubs.mdCommands(`${sourcefile}.didact.md`);
        autosubs.mdComments(`${sourcefile}.didact.md`);
        break;

      case ".adoc":
        greeting = `Converting AsciiDoc ${sourcefile} `;

        console.log(greeting);
        console.log(" ");

        exec(`cp ${sourcefile} ${sourcefile}.didact.adoc`, {});
        autosubs.adocCommandtoTerminalName(`${sourcefile}.didact.adoc`);
        autosubs.adocCommands(`${sourcefile}.didact.adoc`);
        autosubs.adocComments(`${sourcefile}.didact.adoc`);
        autosubs.adocCommandWithOutput(`${sourcefile}.didact.adoc`);
        break;
      case ".act.adoc":
        greeting = `Converting short filename AsciiDoc (${sourcefile})! ` ;

        console.log(greeting);
        console.log(" ");
        var newfile = sourcefile.slice(0, -9);

        exec(`cp ${sourcefile} ${newfile}.didact.adoc`, {});
        // order of substitutions
        autosubs.adocQuery(`${newfile}.didact.adoc`);
        autosubs.adocCommandtoTerminalName(`${newfile}.didact.adoc`);
        autosubs.adocCommands(`${newfile}.didact.adoc`);
        autosubs.adocComments(`${newfile}.didact.adoc`);
        autosubs.adocRefresh(`${newfile}.didact.adoc`);

        autosubs.adocCommandWithOutput(`${newfile}.didact.adoc`);
        break;

      default:
        greeting = `Cannot convert ${sourcefile}!`;
        console.log(greeting);
    }
  }
).argv;
