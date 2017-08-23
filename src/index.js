import React, { Component, PropTypes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Flux from 'flux-react-router';

//Component;
import Application from './App';
import Login from './Components/Login';
import CreateUser from './Components/CreateUser';
import UpdateUser from './Components/UpdateUser';
import DashBoard from './Components/Dashboard';
import PointsList from './Components/PointsList';
import PointsTBA from './Components/PointsTBA';
import AddVehicle from './Components/AddVehicle';
import AddDriverPapers from './Components/AddDriverPapers';
import Promo from './Components/Promo';

// localStorage.setItem('baseURL', ' https://halanapp.herokuapp.com/');
localStorage.setItem('baseURL', 'http://192.168.1.29:4000');




Flux.createRoute('/', function () {
    unmountComponentAtNode(document.getElementById('root'));
    /*    unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        Flux.goTo("/DashBoard")
        /*   render(<BranchesMenu />, document.getElementById('menu'));*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});


Flux.createRoute('/Login', function () {
    unmountComponentAtNode(document.getElementById('root'));
    /*  unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<Login />, document.getElementById('root'))
        /*render(<BranchesMenu />, document.getElementById('menu'));*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/DashBoard', function () {
    unmountComponentAtNode(document.getElementById('root'));
    /*  unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<DashBoard />, document.getElementById('root'))
        /*render(<BranchesMenu />, document.getElementById('menu'));*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/CreateUser', function () {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<CreateUser />, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/UpdateUser', function () {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<UpdateUser />, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/AddVehicle/{id}', function (p) {
    // Flux.createRoute('/addvehicle/{id}', function (p) {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/

    if (localStorage.getItem('sessionToken')) {
        render(<AddVehicle pID={p.id} />, document.getElementById('root'));
        // render(<AddVehicle  pID={p.id}  />, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/AddDriverPapers/{id}', function (p) {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<AddDriverPapers pID={p.id}/>, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/Promo', function () {
    unmountComponentAtNode(document.getElementById('root'));
    /*  unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<Promo />, document.getElementById('root'));
        /*render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});





registerServiceWorker();


Flux.init();