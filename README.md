# Autodidact

Automate the creation of vscode didact tutorials.

This code helps create didact tutorials from existing files.

## Example

To see this in action, consider this README file, to convert it to didact:

```
$ npm i
```

That installs the required dependencies, now you can install autodidact as a global command:

```
$ npm i -g .
```


To convert the README.md file:

```
$ autodidact README.md
```

## What's in scope

Single line commands and links in comments are converted.

<!--- [Click here to show command pallette](didact://?commandId=workbench.action.showCommands) --->

A tutorial might consist of a number of commands, eg:

```
$ ls -al
```

Sometimes, you might want to format the commands as per https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/creating-and-highlighting-code-blocks

```bash
$ ls -al
```

The script assumes:

* prompt ($) is used for all commands
* each command is a single line
