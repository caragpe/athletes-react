import React from 'react';
import { render, findAllByTestId } from '@testing-library/react';
import AthletesInGame from '../components/AthletesInGame/main';
import * as fetch from '../apiHelper';

describe('AthletesInGame component', () => {
    it('should display the header with the city and year when data loaded', async () => {
        jest.spyOn(fetch, 'useFetch').mockImplementation(() => 
            ({loading: false})
        );
        const props = {
            game: {
                city: 'Tokyo',
                game_id: 1,
                year: 2020
            }
        }
        const { container } = render(<AthletesInGame {...props} />);
        const game_city_year = await findAllByTestId(container, 'game_city_year');
        expect(game_city_year.length).toBe(1)    
    });
    it('should display the loading spinner while loading data', async () => {
        jest.spyOn(fetch, 'useFetch').mockImplementation(() => 
            ({loading: true})
        );

        const props = {
            game: {
                city: 'Tokyo',
                game_id: 1,
                year: 2020
            }
        }
        const { container } = render(<AthletesInGame {...props} />);
        const game_city_year = await findAllByTestId(container, 'loading');
        expect(game_city_year.length).toBe(1)    
    });
});