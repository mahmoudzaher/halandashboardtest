import React, { Component } from 'react';
import axios from 'axios';
var ReactRouter = require('flux-react-router');

let imgStyle;
let divStyle;

class Login extends Component {

  constructor() {
    super();
    // axios.defaults.baseURL = 'https://halanapp.herokuapp.com/';
    //  axios.defaults.baseURL = 'http://192.168.0.111:4000';
    /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
    axios.defaults.baseURL = localStorage.getItem('baseURL');
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }


  componentWillMount() {

    imgStyle = {
      width: "100%"
    }
    divStyle = {
      width: "50%"
    }
  }
  static defaultProps = {


  }


  handleSubmit(e) {
    console.log("asdasd");
    if (this.refs.email.value === '' || this.refs.password.value === '') {
      alert('Title is required');

    }
    else {
      var object = {
        phoneNumber: this.refs.email.value,
        password: this.refs.password.value
      }

    }


    axios.post('/api/operator/login', object).then(function (response) {
      console.log(response)
      window.localStorage.setItem('sessionToken', response.data.data.access_token);
      ReactRouter.goTo("/DashBoard")

    }).catch(function (error) {
      alert(error.message);
      console.log(error)
    })




    e.preventDefault();
  }




  render() {

    return (
      <div className="loginbody">

        <div className=" ">
          <div className=" " >
            <img className=" " src="./Group 1.png" alt="Logo" />
          </div>
          <br />
        </div>
        <div>

          <div >
            <div>

              <input type="email" className="login" ref="email"  placeholder=":البريد الالكتروني" required />
               {/*value="admin@poi.halan.com"*/}
              {/*<label className="login">  </label>*/}
            </div>

            <div>

              <input  type="password" ref="password" className="login"  placeholder=":كلمة المرور" required />
              {/*value="Sort64321"*/}
              {/*<label className="login"> :كلمة المرور </label>*/}
            </div>
          </div>
          <div className="button">
            <input type="button" value="دخول" className="button" onClick={this.handleSubmit.bind(this)} className="cool"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;



  /* ReactRouter.goTo('/createUser');*/
