import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Parent from './pages/props/Parent';
// import Mother from './pages/props/Mother';
import Main from './pages/Main';
import MatchingCompare from './pages/compare';
import MobileBrand from './pages/compare/components/MobileBrand';
import MobileNothing from './pages/compare/components/MobileNothing';
import MobileMatchingCompare from './pages/compare/MobileMatchingCompare';
import MobileBuilding from './pages/compare/components/MobileBuilding';
import MobileBrandBuilding from './pages/compare/components/MobileBrandBuilding';

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <Route exact path='/parent' component={Parent}></Route>
                <Route exact path='/mother' component={Mother}></Route> */}
        <Route exact path='/' component={Main}></Route>
        <Route exact path='/mobilebrand' component={MobileBrand}></Route>
        <Route exact path='/mobilebuilding' component={MobileBuilding}></Route>
        <Route exact path='/mobilebrandbuilding' component={MobileBrandBuilding}></Route>
        <Route exact path='/mobilenothing' component={MobileNothing}></Route>
        <Route exact path='/mobilematching' component={MobileMatchingCompare}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
