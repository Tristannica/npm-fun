const {cap,gif,fs,uploader,del,wall} = require('./requirements');

let count = 0;
let wait = {};

let when = new Promise((resolve, reject) => {
  wait = {resolve, reject};
});

function snap() {
  cap(`./snaps/image${count}.png`, { cliflags: '-w 1'}, () => {
    count++;
    if(count < 10 && !wait.begin) {
      snap();
    } else if (!wait.begin) {
      finish();
    }
  });
}

function finish() {
  if(!wait.begin) {
    count = 11;
    wait.begin = true;
    return create()
      .then(upload)
      .then(wall)
      .then(clean)
      .then(wait.resolve)
      .catch(wait.reject);
  } else {
    return when;
  }

}

function create() {
  return new Promise((resolve, reject) => {
    fs.readdir('./snaps', (err, files) => {
      try {
        files = files
          .filter(f => f.substr(-3, 3) == 'png')
          .map(f => `./snaps/${f}`);

        const output = './snaps/output.gif';

        gif(files, output, {
          repeat: true,
          fps: 4,
          quality: 10
        }).then(() => {
          resolve(output);
        }).catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  });
}

function upload(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(error, buffer) {
      uploader(buffer)
        .then(resolve)
        .catch(reject);
    });
  });
}

function clean() {
  return del(['./snaps/*.png', './snaps/output.gif']);
}

module.exports = {
  snap,
  finish
};
