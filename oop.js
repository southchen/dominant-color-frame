window.addEventListener('load', () => {
  class Framer {
    constructor() {
      this.container = document.querySelector('.container');
      this.upload = document.querySelector('#upload');
      this.download = document.querySelector('#download');
      this.inputUp = document.querySelector('#imageUpload');
      this.init();
      this.options = {
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        shadowBlur: 4,
        shadowColor: 'rgba(0,0,0,0.3)',
      };
      this.images = [];
      this.backgrounds = [];
    }
    init() {
      this.inputUp.addEventListener('change', (e) => {
        this.handleFiles(e.target.files);
      });
      document.querySelector('#add').addEventListener('click', () => {
        this.images.forEach((image, i) => {
          console.log(image.src);
          this.addShadow(image, this.backgrounds[i], this.options);
        });
        //this.addShadow(this.image, this.background, this.options);
      });

      document.querySelector('#remove').addEventListener('click', () => {
        this.images.forEach((image, i) => {
          this.addShadow(image, this.backgrounds[i]);
        });
      });
    }
    handleFiles(files) {
      let images = [];
      for (let file of files) {
        var imageType = /^image\//;

        if (!imageType.test(file.type)) {
          continue;
        }
        //console.log(files);
        let image = new Image();
        image.file = file;

        this.reader = new FileReader();

        var p = new Promise((res, rej) => {
          this.reader.addEventListener('load', (e) => {
            image.src = e.target.result;
            res();
          });
        });

        p.then(() => {
          // console.log(image.height);
          if (image.height > 400) {
            let ratio = image.width / image.height;
            image.height = '400';
            image.width = `${ratio * 400}`;
          }
          this.images.push(image);
          this.createCtx(image);
        });

        this.reader.readAsDataURL(file);
      }

      this.download.addEventListener('click', () => {
        document.querySelectorAll('canvas').forEach((element) => {
          let url = element.toDataURL('image/jpeg');
          let a = document.createElement('a');
          let event = new MouseEvent('click');
          a.download = name || 'photo';
          a.href = url;
          a.dispatchEvent(event);
        });
      });
    }
    createCtx(image) {
      let background = document.createElement('canvas');
      this.backgrounds.push(background);
      document.querySelector('.container').appendChild(background);
      this.draw(image, background);
    }

    draw(img, element, options) {
      var mar = 80;
      img.width = (1, Math.floor(img.width));
      img.height = Math.max(1, Math.floor(img.height));
      var landscape = img.width > img.height ? true : false;

      if (landscape) {
        element.width = img.width + mar;
        element.height = element.width;
        var x = mar / 2;
        var y = (element.height - img.height) / 2;
      } else {
        element.height = img.height + mar;
        element.width = element.height;
        var y = mar / 2;
        var x = (element.width - img.width) / 2;
      }

      let ctx = element.getContext('2d');
      ctx.clearRect(0, 0, element.width, element.height);
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const data = ctx.getImageData(0, 0, img.width, img.height).data;

      this.color = this.getImageColor(img, data);
      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, element.width, element.width);

      if (options) {
        let keys = Object.keys(options);
        keys.forEach((key) => {
          ctx[key] = options[key];
        });
      }
      ctx.fillStyle = `${this.color}`;

      ctx.fillRect(x, y, img.width, img.height);
      ctx.drawImage(img, x, y, img.width, img.height);
    }
    getImageColor(img, data) {
      var r = 1,
        g = 1,
        b = 1;
      for (var row = 0; row < img.height; row++) {
        for (var col = 0; col < img.width; col++) {
          if (row == 0) {
            r += data[img.width * row + col];
            g += data[img.width * row + col + 1];
            b += data[img.width * row + col + 2];
          } else {
            r += data[(img.width * row + col) * 4];
            g += data[(img.width * row + col) * 4 + 1];
            b += data[(img.width * row + col) * 4 + 2];
          }
        }
      }
      r /= img.width * img.height;
      g /= img.width * img.height;
      b /= img.width * img.height;
      r = Math.round(r);
      g = Math.round(g);
      b = Math.round(b);
      let color = `rgb(${r},${g},${b})`;
      //console.log(color);
      return color;
    }
    addShadow(file, element, options) {
      this.draw(file, element, options);
    }
    removeShadow(file) {
      this.draw(file, element);
    }
  }
  let f = new Framer();
});
