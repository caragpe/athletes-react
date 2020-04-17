import axios from 'axios';
import * as api from '../components/api.js';
// import type { GameType, AthleteType, AthleteResultsType  } from '../types'; 
import { ok, getResponseMessage } from '../apiHelper.js';
// import { useEffect, useState} from 'react';
import { 
    games_url, 
    athlete_photo_url ,
    athletes_by_game_url,
    athlete_results_url
} from '../constants';

describe('API tests', () => {
    describe('Get all games', () => {
        it('Returns empty array', () => {
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse([]))
            );

            return api.listGames().then(response => {
                expect(response.data).toStrictEqual([]);
                expect(axios.get).toHaveBeenCalledWith(games_url());
            });
        });
        it('Returns one result', () => {
            const mockedGame = {"game_id":1,"city":"Tokyo","year":2020};
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse([mockedGame]))
            );

            return api.listGames().then(response => {
                expect(response.data).toStrictEqual([mockedGame]);
                expect(axios.get).toHaveBeenCalledWith(games_url());
            });
        });
        it('Returns array of results one result', () => {
            const mockedArrayGame = [
                {"game_id":1,"city":"Tokyo","year":2020},
                {"game_id":2,"city":"Rio de Janeiro","year":2016},
                {"game_id":3,"city":"London","year":2012},
                {"game_id":4,"city":"Pyeongchang","year":2018}
            ];
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse(mockedArrayGame))
            );

            return api.listGames().then(response => {
                expect(response.data).toStrictEqual(mockedArrayGame);
                expect(axios.get).toHaveBeenCalledWith(games_url());
            });
        });
        it('Arroja un error', () => {
            const errorMsg = 'default.error_occurred';
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.reject(errorMsg)
            );

            return api.listGames().catch(e => {
                expect(e).toBeInstanceOf(Error);
                expect(e).toStrictEqual(Error(errorMsg));
                expect(axios.get).toHaveBeenCalledWith(games_url());
            });
        });
    });
});


function successResponse(data, message) {
    return {
        status: 200,
        data: {
            status: 'success',
            data,
            message
        }
    };
}