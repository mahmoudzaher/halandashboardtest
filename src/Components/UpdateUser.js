import React, { Component } from 'react';
import axios from 'axios';
var ReactRouter = require('flux-react-router');


let imgStyle;
let divStyle;
let isAdmin;
class UpdateUser extends Component {

    constructor() {
        super();
        // axios.defaults.baseURL = 'https://halanapp.herokuapp.com/';
        //  axios.defaults.baseURL = 'http://192.168.1.29:4000';
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }


    componentWillMount() {

        imgStyle = {
            width: "100%"
        }
        divStyle = {
            width: "50%"
        }
        this.state = {
            unixTimestamp: "",
            img: "",
            imgdata: new FormData()
        }
    }
    static defaultProps = {


    }
    voo(event) {

        var file = event.target.files[0];
        this.setState({
            img: file,
        })
    }

    handleSubmit(e) {
        var that = this;
        console.log("asdasd");
        // if (this.refs.email.value === '' || this.refs.password.value === '' || this.refs.Fname.value === '' || this.refs.Lname.value === '') {
        if (false) {
            alert('Something is missing');

        }
        else {

            this.setState({
                unixTimestamp: this.refs.birthday.value,
            })
            this.state.unixTimestamp = new Date().getTime();
            let timestamp = Math.floor(this.state.unixTimestamp / 1000);
            var Form = this.state.imgdata;

            //Form.append('email', 'aa@aa.com')     
            // var object = {
            //   firstName: this.refs.Fname.value,
            //   lastName: this.refs.Lname.value,
            //   email: this.refs.email.value,
            //   password: this.refs.password.value,
            //   phoneNumber: this.refs.pNumber.value,
            //   picture: this.state.imgdata,
            //   birthday: timestamp,
            //   gender: this.refs.gender.value,
            //   address: this.refs.address.value,
            // }
            const data = new FormData();
            data.append('picture', this.state.img)
            data.append('action', 'ADD');
            data.append('param', 0);
            data.append('firstName', this.refs.Fname.value)
            data.append('lastName', this.refs.Lname.value)
            data.append('email', this.refs.email.value)
            data.append('password', this.refs.password.value)
            data.append('phoneNumber', this.refs.pNumber.value)
            data.append('birthday', timestamp)
            data.append('gender', this.refs.gender.value)
            data.append('address', this.refs.address.value)
            data.append('driverId', this.refs.driverId.value)

            axios.post('/operator/updatedriver', data).then(function (response) {
                console.log(response)
                window.localStorage.setItem('sessionToken', response.data);
                /*ReactRouter.goTo("/DashBoard")*/

            }).catch(function (error) {
                alert(error.message);
                console.log(error)
            })
        }








        e.preventDefault();
    }

    handleDate(e) {

        console.log(this.refs.birthday.value)
    }
    handleBack(e) {
        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/DashBoard")
        e.preventDefault();
    }


    render() {

        return (
            <div>


                <input type="button" value="Back" onClick={this.handleBack.bind(this)} />
                <div>
                    <h1> updatedriver  </h1>
                </div>

                <div>
                    <label>DriverId: </label>
                    <input type="text" ref="driverId" required />
                </div>

                <div>
                    <label>First Name: </label>
                    <input type="text" ref="Fname"  />
                </div>

                <div>
                    <label>Last Name: </label>
                    <input type="text" ref="Lname"  />
                </div>

                <div>
                    <label>E-mail: </label>
                    <input type="email" ref="email" />
                </div>

                <div>
                    <label>Password: </label>
                    <input type="password" ref="password"  />
                </div>

                <div>
                    <label>Phonenumber: </label>
                    <input type="text" ref="pNumber"  placeholder="#### ### ####" />
                </div>

                <div>
                    <label>Gender: </label>
                    <input type="text" ref="gender" placeholder="Male/Female" />
                </div>


                <div>
                    <label>Address: </label>
                    <input type="text" ref="address" />
                </div>

                <div>
                    <label>Birthday: </label>
                    <input type="date" ref="birthday" onChange={this.handleDate.bind(this)} />
                </div>

                <div>
                    <label>Change Artwork  < input type="file" ref="artwork" onChange={this.voo.bind(this)} /> </label>
                </div>

                <input type="button" value="Submit" onClick={this.handleSubmit.bind(this)} />

            </div>
        );
    }
}

export default UpdateUser;



  /* ReactRouter.goTo('/createUser');*/
