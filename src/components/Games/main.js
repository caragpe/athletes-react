//@flow

import React, { Fragment} from 'react';
import {CircularProgress}  from '@material-ui/core';
import { listGames } from './api';
import { useFetch } from '../../apiHelper';
import type { GameType } from '../../types';
import AthletesInGame from '../AthletesInGame/main';

const Games = () => {
    function getListGames() {
        return listGames();
    }  
  
    const { data, loading } = useFetch<Array<GameType>>(getListGames, null);

    if(loading) {
        return (
            <div>
                <div>Olympic Athletes</div>
                <div><CircularProgress /></div>
            </div>
        );
    } else {
        return (
            <div>
                <div style={{margin: 10 +'px'}}> Olympic Athletes</div>
            {data && (
                <Fragment >
                    {data.map((game) => {
                            return <AthletesInGame key={game.game_id} game={game}/>
                        })
                    }
                </Fragment >
            )}
            </div>
        )
    }
}

export default Games;