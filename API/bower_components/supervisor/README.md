# Supervisor

Supervisor handles modules that should do different things or have different settings based on different conditions.
It's ideally something that should be avoided, but takes away the rough edges when there's nothing else to do about it.

*Written by [@pieterbeulque](http://github.com/pieterbeulque) at [Mr. Henry](http://github.com/mrhenry)*

## Features

Supervisor provides you with hooks for when a module should be initiated, destroyed or updated.
They default to a `require()` call to `exports.init()`, `exports.destroy()` and `exports.update()` but are easily customisable.

## Future

The only trigger now is viewport resize, it'd be nice if we could have other, custom events too.

## Usage

Check out the demo included in `/demo/`. There's a lot happening and it's not that easy to explain.

Here's an annotated example:

```js
// Create an instance of our Supervisor
var supervisor = new Supervisor();

// Let's hand over a piece of JS to be managed
supervisor.manage(
  // Give it a unique name
  // When using the default hooks, the name will be used
  // in the require call like so:
  // require(name).init(); etc
  'color-changer',

  // Should return a boolean.
  // Acts as a kill switch to the init (true) and destroy (false) hooks
  function () { return window.innerWidth > 480; },

  // States (optional)
  // This is an array of boolean functions that allow you to declare state
  // and use that state in the init and update hooks
  //
  // When states are set, they will get executed until one of them
  // returns true. The key of that function will be your new state
  // and the update hook gets triggered
  // e.g. if your viewport is 1100, your state will be 1
  //
  // State defaults to -1
  [
    function () { return window.innerWidth > 1280; },
    function () { return window.innerWidth > 1024; },
    function () { return window.innerWidth > 768; }
  ],

  // Hooks (optional)
  // This object uses the init, destroy and update key
  // to provide customized actions for this module
  //
  // Hooks default to exports calls (see source code)
  {
    init: function (moduleName, module) {
      // Set up your module
      new ColorChanger();
      },
    destroy: function (moduleName, module) {
      // Destroy your module
    },
    update: function (moduleName, module) {
      // Change your module, according to module.state
    }
  }
);

// Check if the module should be iniated or not and what state it should be in
// Then act accordingly
supervisor.check();
```
