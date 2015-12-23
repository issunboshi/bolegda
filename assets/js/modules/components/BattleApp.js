import React from 'react';

import SongStore from 'modules/stores/SongStore';

import ArtistForm from 'modules/components/ArtistForm';

import Round from 'modules/components/Round';

function getSongsState() {
    return {
        songs: SongStore.getState().songs
    }
}

class BattleApp extends React.Component {

    constructor () {
        super();

        this.state = getSongsState();
        this.onChange = this.onChange.bind(this);
        this.nextRoundSize = 0;
    }

    componentDidMount () {
        SongStore.listen(this.onChange);
    }

    componentWillUnmount () {
        SongStore.unlisten(this.handleChange);
    }

    onChange (state) {
        this.setState(state);
    }

    render () {
        return (
            <div>
                <ArtistForm songs={this.state.songs} />
                <Round songs={this.state.songs} roundLength={this.state.songs.length / 2} />
            </div>
        )
    }
}

export default BattleApp;
