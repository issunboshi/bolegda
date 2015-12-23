import 'fetch';
import 'howler';
import Vue from 'vue';

var sound = new Howl({
  urls: ['/assets/audio/bolegda-full.mp3'],
  sprite: {
      ba: [0, 219],
      le: [220, 260],
      gda: [370, 450]
  }
});

var AudioControls = new Vue({
    el: '#audio-controls',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        playClick: function (sprite) {
            sound.play(sprite);
        },
        stopClick: function () {
            sound.unload();
        },
        toggleLoop: function() {
            sound.loop(true);
        }
    }
});
