import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Flux from 'flux-react-router';

//Component;
import Application from './App';
import Login from './Components/Login';
import CreateUser from './Components/CreateUser';
import DashBoard from './Components/Dashboard';     
import PointsList from './Components/PointsList';          
import PointsTBA from './Components/PointsTBA';     

localStorage.setItem('baseURL', 'https://Halan-poi.herokuapp.com');



Flux.createRoute('/', function() {
    unmountComponentAtNode(document.getElementById('root'));
/*    unmountComponentAtNode(document.getElementById('menu'));*/
    if(localStorage.getItem('sessionToken')) {
        Flux.goTo("/DashBoard")
     /*   render(<BranchesMenu />, document.getElementById('menu'));*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});


Flux.createRoute('/Login', function() {
    unmountComponentAtNode(document.getElementById('root'));
  /*  unmountComponentAtNode(document.getElementById('menu'));*/
    if(localStorage.getItem('sessionToken')) {
        render(<Login />, document.getElementById('root'))
        /*render(<BranchesMenu />, document.getElementById('menu'));*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/DashBoard', function() {
    unmountComponentAtNode(document.getElementById('root'));
  /*  unmountComponentAtNode(document.getElementById('menu'));*/
    if(localStorage.getItem('sessionToken')) {
        render(<DashBoard />, document.getElementById('root'))
        /*render(<BranchesMenu />, document.getElementById('menu'));*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/CreateUser', function() {
    unmountComponentAtNode(document.getElementById('root'));
   /* unmountComponentAtNode(document.getElementById('menu'));*/
    if(localStorage.getItem('sessionToken')) {
        render(<CreateUser />, document.getElementById('root'));
      /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/PointsList', function() {
    unmountComponentAtNode(document.getElementById('root'));
  /*  unmountComponentAtNode(document.getElementById('menu'));*/
    if(localStorage.getItem('sessionToken')) {
        render(<PointsList />, document.getElementById('root'));
        /*render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/PointsTBA', function() {
    unmountComponentAtNode(document.getElementById('root'));
    if(localStorage.getItem('sessionToken')) {
        render(<PointsTBA />, document.getElementById('root'));
    } else {
        render(<Application />, document.getElementById('root'));
    }
});




/*
ReactRouter.createRoute('/Home', function() {
    unmountComponentAtNode(document.getElementById('root'));
    unmountComponentAtNode(document.getElementById('menu'));
    if(localStorage.getItem('sessionToken')) {
        render(<Home />, document.getElementById('root'));
        render(<BranchesMenu />, document.getElementById('menu'));
    } else {
        render(<SRS />, document.getElementById('root'));
    }
})

*/


/*
export default (
    <Route component={app} path='/'>
      <IndexRoute component={Login} />
      <Route component={Login} path='login' />
      <Route component={CreateUser} path='createuser' />
      <Route component={NotFoundSection} path='*' />
    </Route>
);*/


registerServiceWorker();


Flux.init();