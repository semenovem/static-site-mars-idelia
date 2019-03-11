/**
 *
 * @example ->
 * data-src="imgs/posters/001.jpg xs sm md lg xl"
 * data-src="xs:100 sm:454 md:234 lg:34523 xl:none"
 *
 * пропущенные значения будут заполненны соседними, xs -> в sm
 *
 */
const adaptImgs = {
  app: null,
  _REQ_HIDE: /hide|none/,

  init(app) {
    this.app = app;
    this._handleChangeScreen = this._handleChangeScreen.bind(this);
    this._findImgs(app.screen);

    this.app.addEventListener('changeScreen', this._handleChangeScreen)
  },

  _handleChangeScreen(props) {
    this._findImgs(props.screen);
  },


  _findImgs(nextScreenId) {
    const imgs = document.querySelectorAll('[data-src]');

    Array.from(imgs)
      .map(el => ({
        el,
        ...this._parseDataSrc(el.getAttribute('data-src')),
      }))
      .map(img => {
        if (!img.baseUrl) {
          img.baseUrl = this._minusSuffix(img.el.src);
        }
        return img;
      })
      .filter(img => img.baseUrl)
      .map(this._calcScreenForImg, this)
      .forEach(({el, screen }) => {
        const nextSrc = screen[nextScreenId];

        if (nextSrc === null) {
          if (el.src) {
            el.src = '';
          }
          return;
        }

        if (el.src !== nextSrc) {
          el.src = nextSrc;
        }
      });
  },

  /**
   * @param str String
   * @return {{baseUrl: string, screen: {}}}
   * ! screen - mutates
   * @private
   *
   * @example ->
   *  data-src="imgs/posters/001.jpg xs sm md lg xl"
   *  data-src="xs:100 sm:454 md:234 lg:34523 xl:none"
   */
  _parseDataSrc(str) {
    const result = {
      baseUrl: '',
      screen: {}
    };
    const srcHash = this.app.screenHash;

    str.split(/\s+/)
      .filter(Boolean)
      .forEach(line => {
        if (this._isUrlImg(line)) {
          result.baseUrl = line;
          return;
        }

        // todo length screen.id may be not 2 char
        const t = line.slice(0, 2);
        if (srcHash[t]) {
          const r = line.slice(2).match(/[\d\w]+$/i);

          result.screen[t] = r ? r[0] : '';
        }
      });

    return result;
  },

  /**
   *
   * @param img {{baseUrl: string, screen: {}, el: HTMLImageElement}}
   * ! screen - mutates
   * @private
   */
  _calcScreenForImg(img) {
    const screenList = this.app.screenList;
    const { screen, baseUrl } = img;
    let prev;

    screenList
      .map(id => {
        if (screen[id] && this._REQ_HIDE.test(screen[id])) {
          screen[id] = null;
        }
        return id;
      })
      .map(id => {
        switch (screen[id]) {
          case null:
            break;
          case undefined:
            if (prev !== undefined) {
              screen[id] = prev;
            }
            break;
          default:
            screen[id] = this._sumUrl(baseUrl, screen[id] ? screen[id] : id);
        }

        // if (screen[id]) {
        //   if (!this._isUrlImg(screen[id])) {
        //     screen[id] = this._sumUrl(baseUrl, screen[id]);
        //   }
        //   prev = screen[id];
        // } else {
        //   if (id in screen) {
        //     screen[id] = this._sumUrl(baseUrl, id);
        //   } else {
        //     if (prev) {
        //       screen[id] = prev;
        //     }
        //   }
        // }

        prev = screen[id];

        return id;
      })
      .reverse()
      .forEach((id, index) => {
        if (index === 0) {
          prev = undefined;
        }

        switch (screen[id]) {
          case null:
            break;
          case undefined:
            if (prev !== undefined) {
              screen[id] = prev;
            }
            break;
          default:
        }

        // if (!screen[id]) {
        //   screen[id] = id in screen ? this._sumUrl(baseUrl, id) : prev;
        // }

        prev = screen[id];
      });

    return img;
  },

  _isUrlImg(str) {
    return /\.(jpg|png|svg)$/.test(str);
  },

  _sumUrl(baseUrl, suffix) {
    return baseUrl.replace(/(.+)\.(jpg|png|svg)/, `$1--${suffix}.$2`)
  },

  /**
   * Убирает из названия файла суффикс размера
   * @param fileName
   * @return string
   * @private
   */
  _minusSuffix(fileName) {
    return fileName.replace(/(.*?)--.+?\.(jpg|png|svg)/, '$1.$2');
  }
};

app.domContentLoaded.then(adaptImgs.init.bind(adaptImgs, app));
