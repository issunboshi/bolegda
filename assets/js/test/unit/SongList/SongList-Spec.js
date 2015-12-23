// ¯\_(ツ)_/¯ I don't understand why fetch has to be imported by the module which calls the module which uses it, but adding it in modules/SongList just doesn't work
import fetch from 'fetch';

import React from 'react';
import SongList from 'modules/SongList';

describe('SongList', () => {

    beforeEach(() => {
        setFixtures(sandbox({class: 'js-song_container', id: 'song_container'}));
    })

    it('should render a list of songs to the DOM when provided with data', (done) => {

        class MyApp extends React.Component {

            render() {

                return (
                    <SongList />
                )

            }
        }

        React.render(<MyApp />, document.querySelectorAll('.js-song_container')[0]);

        expect($j('.song_listing__item')).toHaveLength(1);

        done();

    });

});
