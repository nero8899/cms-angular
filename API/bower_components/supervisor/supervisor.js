/**
 * Supervisor does nothing but manage modules.
 *
 * You pass it module paths and a function call returning a boolean
 * and it will make your modules behave properly across resizes
 *
 * Don't use this for every module (it might slow things down)
 * but for modules that are viewport dependent
 *
 * @author   Pieter Beulque <pieter@mrhenry.be>
 * @license  GPL
 */

(function () {

  'use strict';

  function Supervisor () {
    this.modules = {};
    this.flags = {};

    this.bind();
  }

  /**
   * Bind triggers for check()
   * For now, only works on resize
   *
   * @todo - Custom triggers
   *
   * @return {void}
   */
  Supervisor.prototype.bind = function () {
    var self = this;
    this.flags.resize = true;

    $(window).on('resize.MODULE_MANAGER', $.proxy(this.onResize, this));
  };

  /**
   * Hand over a module to the manager
   *
   * @param  {string} moduleName Path to the module (require({{moduleName}}).init etc etc)
   * @param  {function} match    Function that returns a boolean whether we want the module initiated or not
   * @param  {array} states      Array of functions that return booleans, the first truthy key is the current state
   */
  Supervisor.prototype.manage = function (moduleName, match, states, hooks) {
    if (!!this.modules[moduleName]) {
      throw new Exception('Already managing a module with this name');
    }

    states = (typeof states === 'object' && typeof states.length !== 'undefined') ? states : [];
    hooks = (typeof hooks === 'object') ? hooks : { init: this.initModule, destroy: this.destroyModule, update: this.updateModule };

    this.modules[moduleName] = {
      initiated: false,
      match: match,
      states: states,
      state: -1,
      hooks: hooks
    };
  };

  /**
   * Resize hook handler
   * @return {void}
   */
  Supervisor.prototype.onResize = function() {
    var self = this;

    // Flags get used to avoid bottlenecking
    if (!this.flags.resize) {
      return false;
    }

    this.flags.resize = false;
    this.check();

    setTimeout(function () {
      self.flags.resize = true;
    }, 300);
  };

  /**
   * Check all modules if they are in the state they should be in
   * @return {void}
   */
  Supervisor.prototype.check = function () {
    for (var moduleName in this.modules) {
      if (this.modules.hasOwnProperty(moduleName)) {
        var module = this.modules[moduleName];

        if (module.match()) {
          if (!module.initiated) {
            // We should have the module and it's not initiated yet, init
            this.checkState(module);
            module.hooks.init(moduleName, module);
          } else if (this.checkState(module).changed) {
            // State changed, update
            module.hooks.update(moduleName, module);
          }
        } else if (!!module.initiated) {
          // We shouldn't have the module but we do, destroy
          module.hooks.destroy(moduleName, module);
        }
      }
    }
  };

  /**
   * If states are given, check what state the module is in
   * @param  {object} module
   * @return {object} state   {int}     current state
   *                  changed {boolean} if it changed or not
   */
  Supervisor.prototype.checkState = function (module) {
    var state = module.state,
        newState = -1,
        changed = false;

    for (var i = 0; i < module.states.length; i++) {
      if (!!module.states[i]()) {
        newState = i;
        break;
      }
    }

    if (newState !== state) {
      module.state = newState;
      changed = true;
    }

    return { state: module.state, changed: changed };
  };

  /**
   * Default init hook:
   * Trigger exports.init() if set
   * @param  {string} moduleName
   * @return {void}
   */
  Supervisor.prototype.initModule = function (moduleName, module) {
    if (!!require(moduleName).init) {
      // Also update current state
      // to pass on to the initialiser
      require(moduleName).init({ state: module.state });
    }

    module.initiated = true;
  };

  /**
   * Default destroy hook:
   * Trigger exports.destroy() if set and release the instance from the module manager (GC)
   * @param  {string} moduleName
   * @return {void}
   */
  Supervisor.prototype.destroyModule = function (moduleName, module) {
    if (!!require(moduleName).destroy) {
      require(moduleName).destroy();
    }

    module.initiated = false;
  };

  /**
   * Default update hook
   * Trigger exports.update() if set
   * @param  {string} moduleName
   * @return {void}
   */
  Supervisor.prototype.updateModule = function (moduleName, module) {
    if (!!require(moduleName).update) {
      // Don't have to execute checkState() here
      // since updateModule gets triggered by a state change
      require(moduleName).update({ state: module.state });
    }
  };

  // Expose object to global
  window.Supervisor = Supervisor;

}());
