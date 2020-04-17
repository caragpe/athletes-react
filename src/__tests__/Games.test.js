import React from 'react';
import { render, findAllByTestId } from '@testing-library/react';
import Games from '../components/Games/main';
import * as fetch from '../apiHelper';

describe('Games component', () => {
    it('should display the title of the side Olympic Athletes', async () => {
        jest.spyOn(fetch, 'useFetch').mockImplementation(() => 
            ({loading: false})
        );

        const { container } = render(<Games />);
        const app_name = await findAllByTestId(container, 'app_name');
        expect(app_name.length).toBe(1)    
    })
    it('should display the loading spinner while loading data', async () => {
        jest.spyOn(fetch, 'useFetch').mockImplementation(() => 
            ({loading: true})
        );

        const { container } = render(<Games />);
        const app_name_loading = await findAllByTestId(container, 'app_name_loading');
        expect(app_name_loading.length).toBe(1)    
    })
});