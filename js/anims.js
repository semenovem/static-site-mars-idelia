/**
 *
 */
const anim = {
  _attrName: 'data-anims',
  _querySel: '[data-anims]',

  init() {
    // [].forEach.call(document.body.querySelectorAll(this._querySel), this._observe, this);
  },

  _observe(el) {
    // console.log(el);
    //data-anims="fade-before >=md"
    const val = this.parse(el.getAttribute(this._attrName));

  },


  _parse() {

  }

  // получить все узлы с установленной анимацией

  // добавить observer
};

app.domContentLoaded.then(anim.init.bind(anim));
