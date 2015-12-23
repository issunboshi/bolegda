import 'howler';
import Vue from 'vue';

import removeClass from 'helpers/removeClass';

var sound = new Howl({
    urls: ['/assets/audio/bolegda-full.mp3'],
    sprite: {
        full: [0, 600],
        ba: [0, 219],
        le: [220, 260],
        gda: [370, 450]
    },
    onload: function () {
        debugger;
        removeClass(document.querySelector('.js-audio-controls'), '-inactive');
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
            sound.stop();
        },
        toggleLoop: function() {
            sound.loop(true);
        }
    }
});
