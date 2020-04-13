//@flow

import React from 'react';
import Games from './components/Games/main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <main>
            <Switch>
              <Route path="/" component={Games} exact /> 
              <Route path="/athlete" render={(props) => <Games {...props} />} />
            </Switch>
        </main>
    )
}

export default App;
