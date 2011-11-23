cardboard.js
============

cardboard.js is a *synchronous* Asynchronous Module Definition (AMD) implementation designed to provide CommonJS module definition features without loading modules asynchronously.

Including cardboard.js will create global **define** and **require** functions plus an **exports** object for use in module definitions. Each of those objects (define, require, and exports) also exist as properties of the global cardboard object.

why?
----
cardboard.js aims to provide a simple CommonJS module definition implementation for browsers without requiring asynchronous script loading. This is useful for applications that must support high-latency connections where issuing separate HTTP requests for each script is costly. cardboard.js is intendend to be used in conjunction with a server-side build process for combining multiple files into a single script or small set of scripts.
