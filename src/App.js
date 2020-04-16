//@flow

import React from 'react';
import Games from './components/Games/main';
import AthleteDetailView from './components/AthleteDetailView/main';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <main>
            <Switch>
              <Route path="/" render={ () => <Games /> } exact /> 
              <Route path="/athlete/:id" render={
                  (props) => <AthleteDetailView 
                                match={props.match} 
                                athlete={props.location.athlete_info}
                                picture={props.location.picture}
                            />
                } />
            </Switch>
        </main>
    )
}

export default App;
