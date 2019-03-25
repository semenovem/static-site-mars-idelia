---
---
{% comment %}{% endcomment %}



app.executeAfterDOMContentLoaded({
  _ID_MENU_OPEN: "id-action-menu-open",
  _ID_MENU_CLOSE: "id-action-menu-close",
  _ID_MENU: "id-menu",
  _ATTR_TRANSITION_TO_ANCHOR: 'data-transition-to-anchor',

  _isSubscribedOnKeypress: false,
  _isOpen: false,

  init() {
    this._handleForBtnMenuOpen = this._handleForBtnMenuOpen.bind(this);
    this._handleForBtnMenuClose = this._handleForBtnMenuClose.bind(this);
    this._handleKeypress = this._handleKeypress.bind(this);

    this._setListener();
  },

  /**
   * @private
   */
  _setListener() {
    document.getElementById(this._ID_MENU_OPEN).addEventListener('click', this._handleForBtnMenuOpen);
    document.getElementById(this._ID_MENU_CLOSE).addEventListener('click', this._handleForBtnMenuClose);

    this._setListenerForMenuItems();
  },

  /**
   * @private
   */
  _handleForBtnMenuOpen() {
    if (this._isOpen) return;
    this._isOpen = true;

    const el = document.getElementById(this._ID_MENU);
    el.classList.remove('hidden');
    el.classList.add('shown');

    // focus
    app.tabindexOn(el);
    app.tabindexOff([].filter.call(document.body.children,it => it !== el));

    this._changeListenerKeypress(true);
  },


  /**
   * @private
   */
  _handleForBtnMenuClose() {
    if (!this._isOpen) return;
    this._isOpen = false;

    const el = document.getElementById(this._ID_MENU);
    el.classList.remove('shown');
    el.classList.add('hidden');

    // focus
    app.tabindexOff(el);
    app.tabindexOn([].filter.call(document.body.children,it => it !== el));

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
  },

  /**
   * @private
   */
  _handleClickOnMenuItem(anchorId) {
    if (!this._isOpen) return;
    this._handleForBtnMenuClose();
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth' });
    }
  },

  /**
   * @private
   */
  _setListenerForMenuItems() {
    document
      .getElementById(this._ID_MENU)
      .querySelectorAll('[' + this._ATTR_TRANSITION_TO_ANCHOR + ']')
      .forEach(el =>  {
        const attr = el.getAttribute(this._ATTR_TRANSITION_TO_ANCHOR);

        el.addEventListener('click', this._handleClickOnMenuItem.bind(this, attr));
      });
  }
});
