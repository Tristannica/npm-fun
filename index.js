const fs = require('fs');
const brightness = require('brightness');
const roll = require('kik-roll');
const loudness = require('loudness');
const opn = require('opn');
const {snap, finish} = require('./lib/src/snap');

let currentLevel = 0;
const emoji = ['😈', '🔥', '🚨', '👺', '👻', '☠️', '⛔️', '📛', '🚫', '❌', '⁉️'];

function fun() {
  setTimeout(snap, 3000);

  loudness.setVolume(50, function (err) {
    if(err) console.warn('lucky you...');
    roll();
  });

  setTimeout(toggleBrightness, 500);

  fs.readdir('./images', (err, files) => {
    files.forEach(file => {
      opn(`./images/${file}`);
    });
  });
}

function randomEmoji() {
  const index = Math.floor(Math.random() * emoji.length);
  return emoji[index];
}

function get1000Emoji() {
  let emojis = '';
  while(emojis.length < 1000) {
    emojis += randomEmoji();
  }
  return emojis;
}

function toggleBrightness() {
  currentLevel = currentLevel == 0 ? 0.8 : 0;
  brightness.set(currentLevel).then(() => {
    const emojis = get1000Emoji();
    console.log('npm' + emojis);
    console.log(emojis + 'fun');
    setTimeout(toggleBrightness, 500);
  });
}

function endFun() {
  brightness.set(0.8)
    .then(() => {
      return finish();
    }).catch(error => {
      console.error(error);
    }).then(() => {
      process.exit();
    });
}

process.on('SIGINT', function() {
  endFun();
});

module.exports = fun;
