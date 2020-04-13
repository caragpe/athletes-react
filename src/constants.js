// @flow

export const base_url = (): string => 'http://localhost:3000';

export const games_url = ():string => {
    return `${base_url()}/games`;
};

export const athletes_by_game_url =(game_id: number):string => { 
    return `${base_url()}/games/${game_id}/athletes`; 
};