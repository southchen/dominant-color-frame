!(function (e) {
  var t = {};
  function i(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, i), (o.l = !0), o.exports;
  }
  (i.m = e),
    (i.c = t),
    (i.d = function (e, t, r) {
      i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (i.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (i.t = function (e, t) {
      if ((1 & t && (e = i(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (i.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          i.d(
            r,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (i.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return i.d(t, 'a', t), t;
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = ''),
    i((i.s = 0));
})([
  function (e, t) {
    window.addEventListener('load', () => {
      new (class {
        constructor() {
          (this.container = document.querySelector('.container')),
            (this.upload = document.querySelector('#upload')),
            (this.download = document.querySelector('#download')),
            (this.inputUp = document.querySelector('#imageUpload')),
            this.init(),
            (this.options = {
              shadowOffsetX: 5,
              shadowOffsetY: 5,
              shadowBlur: 4,
              shadowColor: 'rgba(0,0,0,0.3)',
            });
        }
        init() {
          this.inputUp.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
          });
          document.querySelector('#refresh').addEventListener('click', () => {
            location.reload();
          });
        }
        handleFiles(e) {
          for (let t of e) {
            if (/^image\//.test(t.type))
              (this.image = new Image()),
                (this.image.file = t),
                (this.reader = new FileReader()),
                new Promise((e, t) => {
                  this.reader.addEventListener('load', (t) => {
                    (this.image.src = t.target.result), e();
                  });
                }).then(() => {
                  if (this.image.height > 400) {
                    let e = this.image.width / this.image.height;
                    (this.image.height = '400'),
                      (this.image.width = '' + 400 * e);
                  }
                  (this.background = document.createElement('canvas')),
                    document
                      .querySelector('.container')
                      .appendChild(this.background),
                    this.draw(this.image, this.background),
                    document
                      .querySelector('#add')
                      .addEventListener('click', () => {
                        this.addShadow(
                          this.image,
                          this.background,
                          this.options
                        );
                      }),
                    document
                      .querySelector('#remove')
                      .addEventListener('click', () => {
                        this.addShadow(this.image, this.background);
                      });
                }),
                this.reader.readAsDataURL(t);
          }
          this.download.addEventListener('click', () => {
            document.querySelectorAll('canvas').forEach((e) => {
              let t = e.toDataURL('image/jpeg'),
                i = document.createElement('a'),
                r = new MouseEvent('click');
              (i.download = name || 'photo'), (i.href = t), i.dispatchEvent(r);
            });
          });
        }
        draw(e, t, i) {
          if (
            ((e.width = Math.floor(e.width)),
            (e.height = Math.max(1, Math.floor(e.height))),
            e.width > e.height)
          ) {
            (t.width = e.width + 80), (t.height = t.width);
            var r = 40,
              o = (t.height - e.height) / 2;
          } else {
            (t.height = e.height + 80), (t.width = t.height);
            (o = 40), (r = (t.width - e.width) / 2);
          }
          let h = t.getContext('2d');
          h.clearRect(0, 0, t.width, t.height),
            h.drawImage(e, 0, 0, e.width, e.height);
          const a = h.getImageData(0, 0, e.width, e.height).data;
          if (
            ((this.color = this.getImageColor(e, a)),
            (h.fillStyle = this.color),
            h.fillRect(0, 0, t.width, t.width),
            i)
          ) {
            Object.keys(i).forEach((e) => {
              h[e] = i[e];
            });
          }
          (h.fillStyle = '' + this.color),
            h.fillRect(r, o, e.width, e.height),
            h.drawImage(e, r, o, e.width, e.height);
        }
        getImageColor(e, t) {
          for (var i = 1, r = 1, o = 1, h = 0; h < e.height; h++)
            for (var a = 0; a < e.width; a++)
              0 == h
                ? ((i += t[e.width * h + a]),
                  (r += t[e.width * h + a + 1]),
                  (o += t[e.width * h + a + 2]))
                : ((i += t[4 * (e.width * h + a)]),
                  (r += t[4 * (e.width * h + a) + 1]),
                  (o += t[4 * (e.width * h + a) + 2]));
          return (
            (i /= e.width * e.height),
            (r /= e.width * e.height),
            (o /= e.width * e.height),
            `rgb(${(i = Math.round(i))},${(r = Math.round(
              r
            ))},${(o = Math.round(o))})`
          );
        }
        addShadow(e, t, i) {
          this.draw(e, t, i);
        }
        removeShadow(e) {
          this.draw(e, element);
        }
      })();
    });
  },
]);
