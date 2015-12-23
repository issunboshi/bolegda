import alt from 'app/alt';

import SongConstants from 'modules/constants/SongConstants';

class SongActions {

    constructor() {
    }

    createSongs (object) {
        this.dispatch({
            object
        })
    }

    addToNextRound (object) {
        this.dispatch({
            object
        })
    }
}

export default alt.createActions(SongActions);
