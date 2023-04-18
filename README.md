# Paragon

Paragon is a fast and lightweight timetable app for Sydney Boys.

Paragon has:

1. Offline functionality.
2. Ridiculously fast load times. (Sub 200ms load time.)
3. A student ID barcode generator. (Based off Neel Karma's [School ID Forge](https://github.com/neelkarma/schoolidforge).)
4. Extensions.
5. And anything else you would expect, like a timetable.😉

Paragon is built with love. (And [Lit](https://lit.dev).)

The server for Paragon can be found [here](https://github.com/AndrewPerson/IBM-Paragon-Server).

## Development

### Installation

Install the necessary dependencies by running `npm i`.

### Building

Run `npm run build` to build the project. This should be run after any changes to files in the `/site` directory. (Excluding the `.html` files.) You **DO NOT** have to run this after changing anything in the `/functions` directory.

### Serving

Run `npm run serve` to serve the project at `localhost:8788`. **WARNING**: You *must* go to `localhost:8788` or the dev site will break. Currently, if you press `b` to open a browser like instructed in the output of the command, it will take you to `127.0.0.1:8788`, which will break.

There will also be another server launched on `localhost:8080`, which mocks the school API.

### Usage

The first time you run Paragon, go *directly* to `localhost:8080/callback?code=foo`. (It doesn't matter what you put as the code, it accepts anything.) **DO NOT** use the login page as it won't work. After that, Paragon should behave as normal.