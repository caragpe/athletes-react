//@flow

import React from 'react';
import { listGames } from './api';
import type { GameType } from './api';
import { useFetch } from '../../apiHelper';

const Games = () => {
  
    function getListGames() {
        return listGames();
    }  
  
    const { data, loading, error } = useFetch<Array<GameType>>(getListGames)
    
    return (
        <div>
        Listing Cities
        <React.Fragment>
        { !error && !loading && data && (
            <div>
                {data.map(item => { 
                    return(item.city)
                    } 
                )}
            </div>  
        )}
        </React.Fragment>
        </div>
    );
}

export default Games;