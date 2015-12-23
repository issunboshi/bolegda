import 'fetch';
import 'howler';
import Vue from 'vue';

var sound = new Howl({
  urls: ['/assets/audio/bolegda-full.mp3'],
  sprite: {
      ba: [0, 219],
      le: [220, 260],
      gda: [370, 400]
  }
});

var AudioControls = new Vue({
    el: '#audio-controls',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        playClick: function (sprite) {
            if (sprite) {
                sound.play(sprite);
            } else {
                sound.play();
            }
        },
        stopClick: function () {
            sound.unload();
        },
        toggleLoop: function() {
            sound.loop(true);
        }
    }
});
