import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import AthletesInGame from '../components/AthletesInGame/main';

describe('AthletesInGame component', () => {
    xit('test', () => {
        expect(1).toEqual(1);
    });
    it('should display the loading component', () => {
        const props = {
            game: {
                city: 'Tokyo',
                game_id: 1,
                year: 2020
            }
        }
        const { queryByTestId } = render(<AthletesInGame {...props} />);
        expect(
            queryByTestId(document.documentElement, 'game_city_year')
        ).toBeInTheDocument();
    })
});