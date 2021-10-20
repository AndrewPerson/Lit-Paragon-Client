# Paragon

Paragon is a fast and lightweight timetable app for Sydney Boys.

Paragon has:

1. Offline functionality.
2. Ridiculously fast load times.
3. A student ID barcode generator. (Based off Neel Karma's [School ID Forge](https://github.com/neelkarma/schoolidforge).)
4. Extensions. (Coming early 2022!)
5. And anything else you would expect, like a timetable.😉

Paragon is built with love. (And [Lit](https://lit.dev).)

The server for Paragon can be found [here](https://github.com/AndrewPerson/IBM-Paragon-Server).

## Developing

### Requirements

You will need:

1. A browser capable of running Service Workers. You can check [here](https://caniuse.com/serviceworkers). (If you're not using IE or Opera Mini, you're pretty much good to go.)

2. Node JS and NPM. You can download them [here](https://nodejs.org/en/).

### Setup

1. Download all the code here using whatever method you want. (If you download it as a `zip` file, *don't forget to extract it.*)

2. Run

```none
npm install
```.

### Editing

TODO Write how to edit files
TODO Write how to edit config files

### Previewing

1. Run

```none
node deploy
```.

2. Display the contents of the `build` folder with whatever dev server you want. (I use [Five Server](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server), which is for VS Code.)

### Deploying

1. Edit `"deployCmd"` in `config.json` to be the command you have to run in order deploy your website to your hosting provider. If you don't have a command or want to do it manually, either remove it or make it blank.

2. Run

```none
    node deploy deploy
```.
