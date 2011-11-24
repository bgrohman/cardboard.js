cardboard.js
============

cardboard.js is a CommonJS module definition implementation for use in a browser environment.

Including cardboard.js will create global **define** and **require** functions plus an **exports** object for use in module definitions. Each of those objects (define, require, and exports) also exists as a property of the global cardboard object.

why?
----
cardboard.js aims to provide a simple CommonJS module definition implementation for browsers without requiring asynchronous script loading. This is useful for applications that must support high-latency connections where issuing separate HTTP requests for each script is costly. 

Because cardboard.js does not load any required modules, it is still necessary to include the appropriate script files (in the appropriate order) in the HTML.

cardboard.js is intended to be used in conjunction with a server-side build process for combining multiple files into a single script or small set of scripts.
