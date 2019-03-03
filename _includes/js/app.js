/**
 *
 */
const app = {
  screen: 'xs',
  screenHash: {
    xs: { id: 'xs', max: 576, },
    sm: { id: 'sm', max: 786, },
    md: { id: 'md', max: 992, },
    lg: { id: 'lg', max: 1200, },
    xl: { id: 'xl', min: 1200, },
  },
  screenList: ['xs', 'sm', 'md', 'lg', 'xl'],

  domContentLoaded: new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      app._updDeviceSize();
      // todo debounce for resize
      window.addEventListener('resize', app._onResize.bind(app));
      resolve();
    });
  }),

  loaded: new Promise(resolve => {
    window.addEventListener('load', resolve);
  }),

  _listeners: {},

  getDeviceSize() {},

  /**
   * Подписка на события
   * @param eventName changeScreen |
   * @param func
   */
  addEventListener(eventName, func) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(func);
  },

  /**
   *
   * @param param Object | Function
   */
  execute(param) {
    if (typeof param === 'function') {
      param();
      return;
    }

    param.init()
  },

  _fireEvent(e, ...args) {
    const li = this._listeners[e];
    if (li) {
      li.forEach(func => func(...args));
    }
  },

  _updDeviceSize() {
    const prevScreen = this.screen;
    this.screen = this._defDeviceSize(document.body.clientWidth);
    if (prevScreen === this.screen) {
      return;
    }
    this._fireEvent('changeScreen', { screen: this.screen, prevScreen });
  },

  _defDeviceSize(w) {
    const scr = this.screenHash;

    if (w < scr.xs.max) { return scr.xs.id; }
    if (w < scr.sm.max) { return scr.sm.id; }
    if (w < scr.md.max) { return scr.md.id; }
    if (w < scr.lg.max) { return scr.lg.id; }
    return scr.xl.id;
  },

  _onResize: (() => {
    let timer;

    return function _onResize() {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => this._updDeviceSize(), 50);
    }
  })()
};
