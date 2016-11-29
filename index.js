const brightness = require('brightness');
const roll = require('kik-roll');
const loudness = require('loudness');

let currentLevel = 0;
const emoji = ['😈', '🔥', '🚨', '👺', '👻', '☠️', '⛔️', '📛', '🚫', '❌', '⁉️'];

function fun() {
  loudness.setVolume(80, function (err) {
    if(err) console.warn('lucky you...');
    roll();
  });
  setTimeout(toggleBrightness, 500);
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

process.on('SIGINT', function() {
  brightness.set(0.8).then(() => {
    process.exit();
  });
});

module.exports = fun;
