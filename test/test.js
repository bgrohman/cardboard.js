(function() {
    test('the basics', function() {
        ok(cardboard);
        ok(cardboard.require);
        ok(cardboard.define);
        ok(cardboard.debug);
        cardboard.debug();
        ok(require);
        ok(define);
        ok(exports);
    });

    test('a basic module with no dependencies', function() {
        define('foo', {
            f: function() { console.log('foo'); }
        });

        define('foofunc', function() {
            return {
                f: function() { console.log('called foofunc.f'); }
            };
        });

        ok(require('foo'));
        ok(require('foo').f);
        require('foo').f();

        ok(require('foofunc'));
        ok(require('foofunc').f);
        require('foofunc').f();
    });

    test('a module from function return with dependency', function() {
        define('bar', ['foo'], function(foo) {
            console.log('defining bar: ', arguments);
            return {
                b: function() { foo.f(); console.log('bar'); }
            };
        });

        ok(require('bar'));
        ok(require('bar').b);
        require('bar').b();
    });

    test('a module from exports with dependencies', function() {
        define('baz', ['foo', 'bar'], function(foo, bar) {
            exports.f = function() {
                foo.f();
                bar.b();
                console.log('baz');
            };
        });

        ok(require('baz'));
        ok(require('baz').f);
        require('baz').f();
    });

    test('a module using require', function() {
        define('foo.bar.baz', function() {
            var foo = require('foo'),
                bar = require('bar'),
                baz = require('baz');

            exports.f = function() {
                foo.f();
                bar.b();
                baz.f();
                console.log('foo.bar.baz');
            };
        });

        ok(require('foo.bar.baz'));
        ok(require('foo.bar.baz').f);
        require('foo.bar.baz').f();
    });

    test('a module with require and exports as dependencies', function() {
        cardboard.define('this.is.a.test', ['require', 'exports'], function(require, exports) {
            ok(require);
            ok(exports);
            exports.require = require;
        });

        ok(cardboard.require('this.is.a.test'));
        ok(cardboard.require('this.is.a.test').require);
        deepEqual(cardboard.require, cardboard.require('this.is.a.test').require);
    });

    test('a module with no dependencies using require and exports', function() {
        define('wee', function(require, exports) {
            ok(require);
            ok(exports);
            exports.require = require;
        });

        ok(cardboard.require('wee'));
        ok(cardboard.require('wee').require);
        deepEqual(cardboard.require, cardboard.require('wee').require);
    });

    test('a missing dependency', function() {
        raises(function() {
            define('fail', ['oops'], function(missing) {});
        });
    });

    test('require with a missing module', function() {
        raises(function() {
            require('oh noes');
        });

        raises(function() {
            define('fail', function() { require('oh noes'); });
        });
    });

    test('define with wrong arguments', function() {
        raises(function() {
            define('blah');
        });

        raises(function() {
            define('blah', 'blah', 'blah', 'blah');
        });

        raises(function() {
            define('blah', 1, 1);
        });
    });

    test('redefining a module', function() {
        var oldFoo = require('foo');

        define('foo', function() {
            exports.f = 1;
        });

        notEqual(oldFoo, require('foo')); 
        notEqual(oldFoo.f, require('foo').f); 
        equal(require('foo').f, 1);

        define('foo', function() {
            exports.g = 2;
        });

        equal(require('foo').f, undefined);
    });
}());
