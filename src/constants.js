// @flow

export const DO_NOT_FETCH_NOW = 0;

export const base_url = (): string => 'http://localhost:3000';

export const games_url = ():string => {
    return `${base_url()}/games`;
};

export const athletes_by_game_url = (game_id: number):string => { 
    return `${base_url()}/games/${game_id}/athletes`; 
};

export const athlete_info_url = (athlete_id: number):string => {
    return `${base_url()}/athletes/${athlete_id}`;
}

export const athlete_results_url = (athlete_id: number):string => {
    return `${base_url()}/athletes/${athlete_id}/results`;
}

export const athlete_photo_url = (athlete_id: number):string => {
    return `${base_url()}/athletes/${athlete_id}/photo`;
}