// Balegdah — static revival
// Uses Howler via CDN ESM. No build step.
import { Howl } from 'https://cdn.jsdelivr.net/npm/howler@2.2.4/+esm';

const stage  = document.querySelector('.stage');
const status = document.querySelector('.status');
const tiles  = new Map(
    [...document.querySelectorAll('.tile')].map(el => [el.dataset.sprite, el])
);

// Sprite timings (ms) into assets/audio/bolegda-full.mp3.
// [start, duration] — tweak here if a syllable sounds clipped or bleeds into the next.
const SPRITES = {
    full: [0,   600],
    ba:   [0,   219],
    le:   [220, 260],
    gdah: [500, 450],
};

const sound = new Howl({
    src: ['/assets/audio/bolegda-full.mp3'],
    sprite: SPRITES,
    onload:      () => { stage.dataset.state = 'ready'; stage.setAttribute('aria-busy', 'false'); },
    onloaderror: (_, err) => { stage.dataset.state = 'error'; status.textContent = `Couldn't load audio (${err}).`; },
});

// Highlight a tile briefly while its sprite plays.
function flashTile(sprite) {
    const el = tiles.get(sprite);
    if (!el) return;
    el.classList.add('is-playing');
    setTimeout(() => el.classList.remove('is-playing'), 260);
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    switch (btn.dataset.action) {
        case 'play-full':
            sound.play('full');
            break;
        case 'play-sprite':
            sound.play(btn.dataset.sprite);
            flashTile(btn.dataset.sprite);
            break;
        case 'stop':
            sound.stop();
            break;
        case 'loop': {
            const next = btn.getAttribute('aria-pressed') !== 'true';
            sound.loop(next);
            btn.setAttribute('aria-pressed', String(next));
            break;
        }
    }
});
