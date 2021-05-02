# Autodidact


Autodidact provides a method to create [VS Code Didact](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-didact) files from plain Markdown or AsciiDoc:

* Commands become active in VS Code
* Terminals can be created, named, and updated.
* Reports driven by SQL can be included in AsciiDoc.
* Together, these features above allow you create, test, and improve tutorials and READMEs.
* All the markup (Markdown or AsciiDoc) remains publishable by existing channels (GitHub*, GitLab, Asciidoctor, Gatsby, etc).

Automate the creation of  tutorials.

This code helps create didact tutorials from existing files.

To install autodidact:

```
$ npm i -g autodidact
```

To convert either md or adoc files to didact format:

```
$ autodidact <file>
```

To convert an AsciiDoc file to didact using markdown html as the output format
```
$ autodidact <file> mockdown
```

This allows you create files that are distinct from your source files, but requires that you have `asciidoctor` already installed.


To learn more about autodidact, clone the repo, open in VS Code, install [VS Code Didact](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-didact) and run the [Showcase](test/showcase.didact.adoc).


To check the version of autodidact installed:
```
$ npm list autodidact
```
