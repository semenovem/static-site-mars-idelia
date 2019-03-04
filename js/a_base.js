---
---
{% comment %}{% endcomment %}



app.execute({
  _ID_MENU_OPEN: "id-action-menu-open",
  _ID_MENU_CLOSE: "id-action-menu-close",
  _ID_MENU: "id-menu",

  _isSubscribedOnKeypress: false,

  init() {
    this._setListener = this._setListener.bind(this);
    this._handleForBtnMenuOpen = this._handleForBtnMenuOpen.bind(this);
    this._handleForBtnMenuClose = this._handleForBtnMenuClose.bind(this);
    this._handleKeypress = this._handleKeypress.bind(this);

    app.domContentLoaded.then(this._setListener);
  },

  /**
   * @private
   */
  _setListener() {
    document.getElementById(this._ID_MENU_OPEN).addEventListener('click', this._handleForBtnMenuOpen);
    document.getElementById(this._ID_MENU_CLOSE).addEventListener('click', this._handleForBtnMenuClose);
  },

  /**
   * @private
   */
  _handleForBtnMenuOpen() {
    const el = document.getElementById(this._ID_MENU);
    el.classList.remove('hidden');
    el.classList.add('shown');
    this._changeListenerKeypress(true);
  },


  /**
   * @private
   */
  _handleForBtnMenuClose() {
    const el = document.getElementById(this._ID_MENU);
    el.classList.remove('shown');
    el.classList.add('hidden');
    this._changeListenerKeypress(false);
  },

  /**
   * @private
   */
  _handleKeypress(e) {
    if (e.code !== 'Escape') return;
    this._handleForBtnMenuClose();
  },

  /**
   * @param is Boolean
   * @private
   */
  _changeListenerKeypress(is) {
    if (is && !this._isSubscribedOnKeypress) {
      this._isSubscribedOnKeypress = true;
      document.addEventListener('keydown', this._handleKeypress);
    }

    if (!is && this._isSubscribedOnKeypress) {
      this._isSubscribedOnKeypress = false;
      document.removeEventListener('keydown', this._handleKeypress);
    }
  }
});
