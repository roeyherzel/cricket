import styles from './home.scss';

import React from 'react';
import PropTypes from 'prop-types';

import defs from 'utils/defs';
import Header from 'components/Header';
import PlayerInfo from 'components/PlayerInfo';

export default  function Home(props) {
  const isNew = (props.gameState === 'new');
  return (
    <div>
      <Header>
        {
          (isNew) ? (
            <button>Start</button>
          ) : (
            <button>Restart</button>
          )
        }
      </Header>
      <div className={styles.players}>
        <div className={styles.playersList}>
          {
            props.players.map(p => (
              <PlayerInfo
                key={p.id}
                name={p.name} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  gameState: PropTypes.oneOf(defs.GAME_STATES).isRequired,
  players: PropTypes.array.isRequired,
};
