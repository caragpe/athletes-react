//@flow

import React, { useState, useEffect, Fragment } from 'react';
import { Box , Button, CircularProgress } from '@material-ui/core';
import { getAthletesByGame } from './api';
import { useFetch } from '../../apiHelper';
import type { GameType, AthleteInfoType } from '../../types';
import { DO_NOT_FETCH_NOW } from '../../constants';

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

    const { data, loading } = useFetch<Array<AthleteInfoType>>(
        getAthletes, 
        game_id === DO_NOT_FETCH_NOW 
            ? DO_NOT_FETCH_NOW
            : game_id
        )
    
    if(loading) {
        return (
            <div>
                <div>{city} {year}</div>
                <div>
                    <CircularProgress />
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div>{city} {year}</div>
                { data && (
                    <Fragment>
                        <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                            {
                                data.map( athlete => <CarouselItem key={athlete.athlete_id} item={athlete} /> )
                            }
                        </Box>
                    </Fragment>
                )}
            </div>
        )
    }    
}

const CarouselItem = (props) => {
    return (
        <Box p={1} m={1} bgcolor="grey.300">
            <h2>{props.item.name}</h2>
            <p>{props.item.surname}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Box>
    )
}

export default AthletesInGame;
