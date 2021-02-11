import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Parent from './pages/props/Parent';
import Mother from './pages/props/Mother';
import CompareButton from './pages/compare/CompareButton';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/parent' component={Parent}></Route>
                <Route exact path='/mother' component={Mother}></Route>
                <Route exact path='/' component={CompareButton}></Route>
            </Switch>
        </Router>
    );
};

export default Routes;
