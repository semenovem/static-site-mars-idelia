/**
 *
 */
app.execute(
  {
    _ID_MENU_OPEN: "id-action-menu-open",
    _ID_MENU: "id-menu",

    _elMenu: null,

    init() {
      this._setListener = this._setListener.bind(this);
      this._handle = this._handle.bind(this);

      app.domContentLoaded.then(this._setListener);
    },

    /**
     * @private
     */
    _setListener() {
      const el = document.getElementById(this._ID_MENU_OPEN);

      el.addEventListener('click', this._handle);
    },

    /**
     * @private
     */
    _handle() {
      const el = document.getElementById(this._ID_MENU);
      el.classList.remove('hidden');
      el.classList.add('shown');
    }
  }
);
