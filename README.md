# autodidact

Automate the creation of vscode didact tutorials.

This code helps create didact tutorials from existing files.

To see this in action, consider this README file, to convert it to didact:

```
$ npm i
```
That installs the required dependencies, now you can convert the file:

```
$ ./convert.sh README
```


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


