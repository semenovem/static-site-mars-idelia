/**
 *
 */
app.execute(
  {
    _ID_MENU_CLOSE: "id-action-menu-close",
    _ID_MENU: "id-menu",

    init() {
      this._setListeners = this._setListeners.bind(this);
      this._handle = this._handle.bind(this);

      app.domContentLoaded.then(this._setListeners);
    },

    /**
     * @private
     */
    _setListeners() {
      const el = document.getElementById(this._ID_MENU_CLOSE);

      el.addEventListener('click', this._handle);
      document.addEventListener('keydown', this._handle);
    },

    /**
     * @private
     */
    _handle() {
      const el = document.getElementById(this._ID_MENU);
      el.classList.remove('shown');
      el.classList.add('hidden');
    }
  }
);
