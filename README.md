cardboard.js
============

cardboard.js is a *synchronous* Asynchronous Module Definition (AMD) implementation designed to provide CommonJS module definition features without loading modules asynchronously.

Including cardboard.js will create global **define** and **require** functions plus an **exports** object for use in module definitions. Each of those objects (define, require, and exports) also exist as properties of the global cardboard object.