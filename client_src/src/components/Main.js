import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Hours from './Hours';
import About from './About';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Hours} />
            <Route exact path='/about' component={About} />
        </Switch>
    </main>
)

export default Main;