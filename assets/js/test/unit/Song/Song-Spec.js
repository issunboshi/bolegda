import React from 'react';

import Song from 'modules/Song';

describe('Song', () => {

    beforeEach(() => {
        setFixtures(sandbox({class: 'js-song_container', id: 'song_container'}));
    })

    it('should render DOM element', (done) => {
        class MyApp extends React.Component {
            render() {
                let song = {"name":"Take Me to Church","duration":"241","playcount":"62805","listeners":"30967","mbid":"154a4e2a-12fa-44c3-a918-7f090fa025b6","url":"http:\/\/www.last.fm\/music\/Hozier\/_\/Take+Me+to+Church","streamable":{"#text":"0","fulltrack":"0"},"artist":{"name":"Hozier","mbid":"b4691384-50c3-4afd-9988-51d3ec5db65d","url":"http:\/\/www.last.fm\/music\/Hozier"},"image":[{"#text":"http:\/\/userserve-ak.last.fm\/serve\/34s\/102781243.png","size":"small"},{"#text":"http:\/\/userserve-ak.last.fm\/serve\/64s\/102781243.png","size":"medium"},{"#text":"http:\/\/userserve-ak.last.fm\/serve\/126\/102781243.png","size":"large"},{"#text":"http:\/\/userserve-ak.last.fm\/serve\/300x300\/102781243.png","size":"extralarge"}]};
                return (
                    <Song raw={song} />
                )
            }
        }

        React.render(<MyApp />, document.querySelectorAll('.js-song_container')[0]);

        expect($j('.js-song_container h2')).toHaveText('Take Me to Church');

        done();

    });

});
