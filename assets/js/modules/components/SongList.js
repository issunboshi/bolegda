import React from 'react';

import Song from 'modules/components/Song';

class SongList extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
        };
    }

    render() {

        if (Object.keys(this.props.songs).length === 0) {
            return null;
        } else {
            var songs = this.props.songs.map((song, index) => {
                return <Song key={Math.random()} song={song} />
            });
        }

        return <ol className="bracket">{songs}</ol>

    }

}

export default SongList;
