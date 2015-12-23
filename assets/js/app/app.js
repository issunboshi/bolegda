import 'fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import BattleApp from 'modules/components/BattleApp';

class Battle extends React.Component {
    render() {
        return (
            <div>
                <BattleApp />
            </div>
        )
    }
}

ReactDOM.render(<Battle />, document.querySelectorAll('.js-song_off')[0]);
