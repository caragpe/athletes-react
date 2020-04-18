//@flow

import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { getAthletesByGame } from '../api';
import { useFetch } from '../../apiHelper';
import type { GameType, AthleteType } from '../../types';
import { DO_NOT_FETCH_NOW } from '../../constants';
import AthleteThumbnail from '../AthleteThumbnail/main';

type Props = {
    game: GameType
};


const AthletesInGame = (props: Props) => {
    const [game_id, setGameId] = useState(0);
    const [city, setCity] = useState(null);
    const [year, setYear] = useState(null);
   
    useEffect(() => {
        setGameId(props.game.game_id);
        setCity(props.game.city);
        setYear(props.game.year);
    },[props.game]);

    function getAthletes() {
            return getAthletesByGame(game_id);
    }

    const { data, loading } = useFetch<Array<AthleteType>>(
        getAthletes, 
        game_id === DO_NOT_FETCH_NOW 
            ? DO_NOT_FETCH_NOW
            : game_id
        )
    
    if(loading) {
        return (
            <div style={{margin: 10 +'px'}}>
                <div data-testid="loading">{city} {year}</div>
                <div>
                    <CircularProgress />
                </div>
            </div>
        )
    } else {
        return (
            <div style={{margin: 10 +'px'}} data-testid={`games_${year ? year : ''}`}>
                <div data-testid="game_city_year">{city} {year}</div>
                { data && (
                    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                        {
                            data.map( athlete => {
                            return (
                                <div key={athlete.athlete_id}  data-testid={`athlete_th_${athlete.athlete_id}`} >
                                <AthleteThumbnail 
                                    key={athlete.athlete_id} 
                                    athlete={athlete} 
                                />
                                </div>
                                )
                            })
                        }
                    </Box>
                )}
            </div>
        )
    }    
}

export default AthletesInGame;
