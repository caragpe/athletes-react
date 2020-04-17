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
    describe('Get all Games', () => {
        it('Returns empty array', () => {
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse([]))
            );

            return api.listGames().then(response => {
                expect(response.data).toStrictEqual([]);
                expect(axios.get).toHaveBeenCalledWith(games_url());
            });
        });
        it('Returns only one Game', () => {
            const mockedGame = {"game_id":1,"city":"Tokyo","year":2020};
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse([mockedGame]))
            );

            return api.listGames().then(response => {
                expect(response.data).toStrictEqual([mockedGame]);
                expect(axios.get).toHaveBeenCalledWith(games_url());
            });
        });
        it('Returns array of Games', () => {
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
        it('Returns error and promise is rejected', () => {
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
    describe('Get Athletes with Medals in each Game', () => {
        const game_id = 3;
        it('Returns no results for game id', () => {
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse([]))
            );

            return api.getAthletesByGame(game_id).then(response => {
                expect(response.data).toStrictEqual([]);
                expect(axios.get).toHaveBeenCalledWith(
                    athletes_by_game_url(game_id)
                );
            });
        });
        it('Returns one athlete with medals', () => {
            const mocked_athlete = {
                athlete_id: 11,
                bio: "**Hello**",
                dateOfBirth: '01-01-2000',
                height: 190,
                name: "Mike",
                photo_id: 11,
                surname: "Mousse",
                weight: 90
            };
        
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse([mocked_athlete]))
            );

            return api.listGames().then(response => {
                expect(response.data).toStrictEqual([mocked_athlete]);
                expect(axios.get).toHaveBeenCalledWith(
                    athletes_by_game_url(game_id)
                );
            });
        });
        it('Returns various athletes for the Games', () => {
            const mocked_athletes = [
                {
                    athlete_id: 11,
                    bio: "**Hello**",
                    dateOfBirth: '01-01-2000',
                    height: 190,
                    name: "Mike",
                    photo_id: 11,
                    surname: "Mousse",
                    weight: 90
                },
                {
                    athlete_id: 12,
                    bio: "**Bye**",
                    dateOfBirth: '01-01-1998',
                    height: 178,
                    name: "Mary",
                    photo_id: 12,
                    surname: "Pink",
                    weight: 70
                }
            ];

            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse(mocked_athletes))
            );

            return api.listGames().then(response => {
                expect(response.data).toStrictEqual(mocked_athletes);
                expect(axios.get).toHaveBeenCalledWith(
                    athletes_by_game_url(game_id)
                );
            });
        });
        it('Returns an error', () => {
            const errorMsg = 'default.error_occurred';
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.reject(errorMsg)
            );

            return api.listGames().catch(e => {
                expect(e).toBeInstanceOf(Error);
                expect(e).toStrictEqual(Error(errorMsg));
                expect(axios.get).toHaveBeenCalledWith(
                    athletes_by_game_url(game_id)
                );
            });
        });
    });
    describe('Get Athlete Results Info', () => {
        const athlete_id = 25;
        it('Returns no results for athlete', () => {
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse([]))
            );

            return api.getAthleteResultsInfo(athlete_id).then(response => {
                expect(response.data).toStrictEqual([]);
                expect(axios.get).toHaveBeenCalledWith(
                    athlete_results_url(athlete_id)
                );
            });
        });
        it('Returns one athlete result', () => {
            const mocked_game_results = {
                bronze: 1,
                city: 'Barcelona',
                fourths: 3,
                gold: 1,
                silver: 1,
                year: 1992
            };
        
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse([mocked_game_results]))
            );

            return api.listGames().then(response => {
                expect(response.data).toStrictEqual([mocked_game_results]);
                expect(axios.get).toHaveBeenCalledWith(
                    athlete_results_url(athlete_id)
                );
            });
        });
        it('Returns results for various Games', () => {
            const mocked_game_results = [
                {
                    bronze: 1,
                    city: 'Barcelona',
                    fourths: 3,
                    gold: 1,
                    silver: 1,
                    year: 1992
                }, 
                {
                    bronze: 0,
                    city: 'South Korea',
                    fourths: 2,
                    gold: 0,
                    silver: 2,
                    year: 1992
                }
            ];

            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse(mocked_game_results))
            );

            return api.listGames().then(response => {
                expect(response.data).toStrictEqual(mocked_game_results);
                expect(axios.get).toHaveBeenCalledWith(
                    athlete_results_url(athlete_id)
                );
            });
        });
        it('Returns an error', () => {
            const errorMsg = 'default.error_occurred';
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.reject(errorMsg)
            );

            return api.listGames().catch(e => {
                expect(e).toBeInstanceOf(Error);
                expect(e).toStrictEqual(Error(errorMsg));
                expect(axios.get).toHaveBeenCalledWith(
                    athlete_results_url(athlete_id)
                );
            });
        });
    });
    describe('Get Athletes Photos', () => {
        const photo_id = 15;
        it('Returns no results for photo id', () => {
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse(''))
            );

            return api.getAthletePicture(photo_id).then(response => {
                expect(response).toStrictEqual('');
                // expect(axios.get).toHaveBeenCalledWith(
                //     athlete_photo_url(photo_id)
                // );
            });
        });
        it('Returns one thumbnail', () => {
            const photo_id = 15;
            const string_photo = '/9j/4AAQSkZJRgABAQAAAQABAAD/4gxYSUNDX1BS';
        
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.resolve(successResponse(ArrayBuffer))
            );

            return api.getAthletePicture(photo_id).then(response => {
                expect(response).toStrictEqual(ArrayBuffer);
                // expect(axios.get).toHaveBeenCalledWith(
                //     athlete_photo_url(photo_id)
                // );
            });
        });
        it('Returns an error', () => {
            const photo_id = 15;
            const errorMsg = 'default.error_occurred';
            jest.spyOn(axios, 'get').mockImplementation(
                () => Promise.reject(errorMsg)
            );

            return api.getAthletePicture().catch(e => {
                expect(e).toBeInstanceOf(Error);
                expect(e).toStrictEqual(Error(errorMsg));
                // expect(axios.get).toHaveBeenCalledWith(
                //     athlete_photo_url(photo_id)
                // );
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