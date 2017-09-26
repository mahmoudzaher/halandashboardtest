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
import UpdateVehicle from './Components/UpdateVehicle';
import UpdateDriverPapers from './Components/UpdateDriverPapers';
import DashBoard from './Components/Dashboard';
import AddVehicle from './Components/AddVehicle';
import AddDriverPapers from './Components/AddDriverPapers';
import DriverTrips from './Components/DriverTrips';
import Promo from './Components/Promo';
import DriverProfile from './Components/DriverProfile';
import Reports from './Components/Reports';
import Branches from './Components/Branches';
import CreateBranch from './Components/CreateBranch';
import UpdateBranch from './Components/UpdateBranch';

// localStorage.setItem('baseURL', ' https://halanapp.herokuapp.com/api/v1');
// localStorage.setItem('baseURL', 'https://halan-dev.herokuapp.com/api/v1');
    localStorage.setItem('baseURL', 'http://192.168.1.3:4000/api/v1');





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

Flux.createRoute('/Branches', function () {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<Branches />, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/CreateBranch', function () {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<CreateBranch />, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/UpdateBranch/{id}', function (p) {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<UpdateBranch pID={p.id}/>, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/DriverProfile/{id}', function (p) {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<DriverProfile pID={p.id} />, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/UpdateUser/{id}', function (p) {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<UpdateUser pID={p.id}/>, document.getElementById('root'));
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

Flux.createRoute('/UpdateVehicle/{id}', function (p) {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<UpdateVehicle pID={p.id}/>, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});


Flux.createRoute('/AddDriverPapers/{id}', function (p) {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<AddDriverPapers pID={p.id} />, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/UpdateDriverPapers/{id}', function (p) {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<UpdateDriverPapers pID={p.id}/>, document.getElementById('root'));
        /*  render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});

Flux.createRoute('/DriverTrips/{id}', function (p) {
    // Flux.createRoute('/addvehicle/{id}', function (p) {
    unmountComponentAtNode(document.getElementById('root'));
    /* unmountComponentAtNode(document.getElementById('menu'));*/

    if (localStorage.getItem('sessionToken')) {
        render(<DriverTrips pID={p.id} />, document.getElementById('root'));
        // render(<AddVehicle  pID={p.id}  />, document.getElementById('root'));
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

Flux.createRoute('/Reports', function () {
    unmountComponentAtNode(document.getElementById('root'));
    /*  unmountComponentAtNode(document.getElementById('menu'));*/
    if (localStorage.getItem('sessionToken')) {
        render(<Reports />, document.getElementById('root'));
        /*render(<LoyaltyMenu />, document.getElementById('menu'))*/
    } else {
        render(<Application />, document.getElementById('root'));
    }
});





registerServiceWorker();


Flux.init();