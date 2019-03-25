app.executeAfterDOMContentLoaded({

  _htmlDataAttr: 'data-ids-scroll-photos',

  init() {
    console.log('test', this._findDom());


  },


  _findDom() {
    return document.body.querySelectorAll('[' + this._htmlDataAttr + ']')
      // .map()
  },








});
