import React from 'react';

import forBand from 'helpers/forBand';
import SongActions from 'modules/actions/SongActions';

class ArtistForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            artist: '',
            songs: {toptracks: {track: []}},
        };

        this.typingTimer;

    }

    getSongs(artist) {

        forBand(artist)
        .then((songs) => {
            if (songs) {
                SongActions.createSongs(songs.toptracks.track);
            }
        })

    }

    handleChange(event) {

        clearTimeout(this.typingTimer);

        this.setState({artist: event.target.value});

        this.typingTimer = setTimeout(()=> this.getSongs(this.state.artist), 1000);

    }

    render () {
        if (Object.keys(this.props.songs).length > 0) {
            return null;
        }
        return (
            <form>
                <label htmlFor="artist">El artist</label>
                <input type="text" name="artist" id="artist" value={this.state.artist} onChange={this.handleChange.bind(this)} />
            </form>
        );

    }

}

export default ArtistForm;
