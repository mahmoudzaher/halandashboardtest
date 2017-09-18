import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
var ReactRouter = require('flux-react-router');

let imgStyle;
let divStyle;

class Login extends Component {

  constructor() {
    super();
    axios.defaults.baseURL = localStorage.getItem('baseURL');
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }


  componentWillMount() {

    this.setState({
      blur: "",
      loginErrorModal: false,
    })

    imgStyle = {
      width: "100%"
    }
    divStyle = {
      width: "50%"
    }
  }
  static defaultProps = {


  }

  openModal(type) {
    console.log(type);
    this.setState({
      [type]: true,
      blur: "blur"
    });
  }

  closeModal(type) {
    console.log(type);
    this.setState({
      [type]: false,
      blur: ""
    });
  }


  handleSubmit(e) {
    var that = this;
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


    axios.post('/operator/login', object).then(function (response) {
      console.log(response)
      window.localStorage.setItem('sessionToken', response.data.data.access_token);
      ReactRouter.goTo("/DashBoard")

    }).catch(function (error) {
      // alert(error.message);
      that.openModal("loginErrorModal")
      console.log(error)
    })




    e.preventDefault();
  }




  render() {

    const customStyles = {
      overlay: {
        background: "transparent"
      },
      content: {
        top: '30%',
        marginLeft: '35%',
        marginRight: '35%',
        left: "0px",
        right: "0px",
        bottom: 'auto',
        width: '30%',
        borderRadius: '10px',
        border: "2px solid #cbcbcb",
        padding: "0px"
      },
    };

    return (
      <div>
        <Modal
          isOpen={this.state.loginErrorModal}
          onRequestClose={this.closeModal.bind(this, "loginErrorModal")}
          style={customStyles}
        >
          <div>
            <span className="modalXButton" onClick={this.closeModal.bind(this, "loginErrorModal")}>&times;</span>
            <br />
            <div style={{ width: "100%", textAlign: "-webkit-center" }}>
              <img style={{ width: "20%" }} src="./redX.png" />
              <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width:"80%" }}>رقم التلفون أو كلمة المرور خاطئة</div>
              <input type="button" value="حاول مرة أخرى" className="modalButton" onClick={this.closeModal.bind(this,"loginErrorModal")}/>
            </div>
          </div>
        </Modal>
        <div className={this.state.blur}>
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

                  <input type="email" className="login" ref="email" placeholder=":البريد الالكتروني" required />
                  {/*value="admin@poi.halan.com"*/}
                  {/*<label className="login">  </label>*/}
                </div>

                <div>

                  <input type="password" ref="password" className="login" placeholder=":كلمة المرور" required />
                  {/*value="Sort64321"*/}
                  {/*<label className="login"> :كلمة المرور </label>*/}
                </div>
              </div>
              <div className="button">
                <input type="button" value="دخول" className="button" onClick={this.handleSubmit.bind(this)} className="cool" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;



  /* ReactRouter.goTo('/createUser');*/
