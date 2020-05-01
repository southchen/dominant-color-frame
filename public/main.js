const container = document.querySelector('.container');
// image.crossOrigin = 'Anonymous';
const upload = document.querySelector('#upload');
const download = document.querySelector('#download');

const options = {
  shadowOffsetX: 5,
  shadowOffsetY: 5,
  shadowBlur: 4,
  shadowColor: 'rgba(0,0,0,0.3)',
};
function handleFiles(files) {
  for (let file of files) {
    //console.log(files);
    let image = new Image();
    image.file = file;

    var reader = new FileReader();

    var p = new Promise((res, rej) => {
      reader.addEventListener('load', (e) => {
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

      let background = document.createElement('canvas');
      document.querySelector('.container').appendChild(background);
      draw(image, background);

      document.querySelector('#add').addEventListener('click', () => {
        addShadow(image, background, options);
      });
      document.querySelector('#remove').addEventListener('click', () => {
        addShadow(image, background);
      });
    });

    reader.readAsDataURL(file);
  }

  download.addEventListener('click', () => {
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

function draw(img, element, options) {
  var mar = 80;

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
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, img.width, img.height).data;

  let color = getImageColor(img, data);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, element.width, element.width);

  if (options) {
    let keys = Object.keys(options);
    keys.forEach((key) => {
      ctx[key] = options[key];
      console.log('drawing shadow');
    });
  }
  ctx.fillStyle = `${color}`;

  ctx.fillRect(x, y, img.width, img.height);
  ctx.drawImage(img, x, y, img.width, img.height);
}

function getImageColor(img, data) {
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
  color = `rgb(${r},${g},${b})`;
  //console.log(color);
  return color;
}

function addShadow(file, element, options) {
  draw(file, element, options);
}
function removeShadow(file) {
  draw(file, element);
}
