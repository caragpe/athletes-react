//@flow	

import React, { Fragment} from 'react';	
import {CircularProgress}  from '@material-ui/core';	
import { listGames } from '../api';	
import { useFetch } from '../../apiHelper';	
import type { GameType } from '../../types';	
import AthletesInGame from '../AthletesInGame/main';	

const Games = () => {	
    function getListGames() {	
        return listGames();	
    }  	

    const { data, loading } = useFetch<Array<GameType>>(getListGames, null);
    if (data) {
        data.sort((game_a, game_b) => game_b.year - game_a.year)
    }	

    if(loading) {	
        return (	
            <div>	
                <div data-testid="app_name_loading" style={{margin: 10 +'px'}}>Olympic Athletes</div>	
                <div><CircularProgress /></div>	
            </div>	
        );	
    } else {	
        return (	
            <div>	
                <div data-testid="app_name" style={{margin: 10 +'px'}}> Olympic Athletes</div>	
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
