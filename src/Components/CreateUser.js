import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
var ReactRouter = require('flux-react-router');


let imgStyle;
let divStyle;
let isAdmin;
let dayID = "";
let monthID = "";
let yearID = "";
let dayIDE = "";
let monthIDE = "";
let yearIDE = "";
// let birthdaydate = "";
class CreateUser extends Component {

  constructor() {
    super();
    // axios.defaults.baseURL = 'https://halanapp.herokuapp.com/';
    axios.defaults.baseURL = 'http://192.168.1.29:4000';
    /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
    this.state = {
      startdayoptions: [],
      startmonthoptions: [],
      startyearoptions: [],

    };
  }

  componentDidMount() {
    var itemIds = [];
    var itemIds2 = [];
    var itemIds3 = [];
    for (var i = 0; i < 32; i++) {
      itemIds.push(
        {
          value: i,
          label: i
        }
      );
    }
    for (var i = 0; i < 13; i++) {
      itemIds2.push(
        {
          value: i,
          label: i
        }
      );
    }
    for (var i = 1920; i < 2018; i++) {
      itemIds3.push(
        {
          value: i,
          label: i
        }
      );
    }
    console.log(itemIds)
    this.setState({
      startdayoptions: itemIds,
      startmonthoptions: itemIds2,
      startyearoptions: itemIds3,
    })

  }
  componentWillMount() {
    var that = this;
    this.setState({
      objects: [],
      startday: "",
      startmonth: "",
      startyear: "",
      endday: "",
      endmonth: "",
      endyear: "",

    })
    imgStyle = {
      width: "100%"
    }
    divStyle = {
      width: "50%"
    }
    this.state = {
      unixTimestamp: "",
      birthdaydate: "",
      img: "",
      imgdata: new FormData()
    }
  }



  static defaultProps = {


  }

  handleDayoptions(type, value) {
    this.setState({ [type]: value });
    //  artistID = value.value;
    if (value) {
      dayID = value.value;
    } else {
      dayID = "";
    }

    console.log(value);
    console.log(dayID);
  }

  handleMonthoptions(type, value) {
    this.setState({ [type]: value });
    //  artistID = value.value;
    if (value) {
      monthID = value.value;
    } else {
      monthID = "";
    }

    console.log(value);
    console.log(monthID);
  }

  handleYearoptions(type, value) {
    this.setState({ [type]: value });
    //  artistID = value.value;
    if (value) {
      yearID = value.value;
    } else {
      yearID = "";
    }
    this.handleBirthday()
    console.log(value);
    console.log(yearID);
  }

  handleBirthday() {
    console.log(yearID, monthID + 1, dayID)
    this.setState({
      birthdaydate: new Date(yearID, monthID + 1, dayID).getTime(),
      birthdaydateE: new Date(yearIDE, monthIDE + 1, dayIDE).getTime(),
      endday: "sadjkhasdk"
    });
    console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
  }


  voo(event) {

    var file = event.target.files[0];
    this.setState({
      img: file,
    })
  }
  handleAddV(e) {

    console.log("WoHOOOOOOOOOOOOOOOO");
    ReactRouter.goTo("/AddVehicle")

    e.preventDefault();
  }


  handleAddP(e) {

    console.log("WoHOOOOOOOOOOOOOOOO");
    ReactRouter.goTo("/AddDriverPapers")

    e.preventDefault();
  }
  handleSubmit(e) {
    var that = this;
    { this.handleBirthday() }

    console.log("asdasd");
    // if (this.refs.email.value === '' || this.refs.password.value === '' || this.refs.Fname.value === '' || this.refs.Lname.value === '') {
    if (false) {
      alert('Something is missing');

    }
    else {

      // this.setState({
      //   unixTimestamp: this.refs.birthday.value,
      // })
      this.state.unixTimestamp = new Date().getTime();
      console.log(this.state.birthdaydate, "asdafasdfasdgfasdfjkahsdflkasjnfkl")
      // let timestamp = Math.floor(this.state.unixTimestamp / 1000);
      let timestampp = Math.floor(this.state.birthdaydate / 1000);
      let timestamppE = Math.floor(this.state.birthdaydate / 1000);
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
      var vehicleLicence = {
                number: this.refs.driverLicenseNumber.value,
                expirationDate: timestamppE
            }
      const data = new FormData();
      data.append('picture', this.state.img)
      data.append('action', 'ADD');
      data.append('param', 0);
      data.append('firstName', this.refs.Fname.value)
      // data.append('lastName', this.refs.Lname.value)
      data.append('email', this.refs.email.value)
      data.append('password', this.refs.password.value)
      data.append('phoneNumber', this.refs.pNumber.value)
      data.append('birthday', timestampp)
      // data.append('gender', this.refs.gender.value)
      data.append('address', this.refs.address.value)
      data.append('driverLicense', vehicleLicence)
      // data.append('address', this.refs.address.value)

      axios.post('/api/operator/adddriver', data).then(function (response) {
        console.log(response)
        // window.localStorage.setItem('sessionToken', response.data);
        /*ReactRouter.goTo("/DashBoard")*/
        var ID = response.data.data._id;
        console.log(ID)
        var ObjectID = {
          ID : ID
        }
        // ReactRouter.goTo("AddVehicle?id=7amda",)
        // ReactRouter.goTo(`addvehicle/${ID}`);
          ReactRouter.goTo(`/AddVehicle/${ID}`);
      }).catch(function (error) {
        alert(error.message);
        console.log(error)
      })
    }








    e.preventDefault();
  }


  handleDayoptionsE(type, value) {
        this.setState({ [type]: value });
        //  artistID = value.value;
        if (value) {
            dayIDE = value.value;
        } else {
            dayIDE = "";
        }

        console.log(value);
        console.log(dayIDE);
    }

    handleMonthoptionsE(type, value) {
        this.setState({ [type]: value });
        //  artistID = value.value;
        if (value) {
            monthIDE = value.value;
        } else {
            monthIDE = "";
        }

        console.log(value);
        console.log(monthIDE);
    }

    handleYearoptionsE(type, value) {
        this.setState({ [type]: value });
        //  artistID = value.value;
        if (value) {
            yearIDE = value.value;
        } else {
            yearIDE = "";
        }
        this.handleBirthday()
        console.log(value);
        console.log(yearIDE);
    }

  handleDate(e) {

    console.log(this.refs.birthday.value)
  }
  handleBack(e) {
    console.log("WoHOOOOOOOOOOOOOOOO");
    ReactRouter.goTo("/DashBoard")
    e.preventDefault();
  }
  handleDrivers(e) {

    console.log("WoHOOOOOOOOOOOOOOOO");
    ReactRouter.goTo('/DashBoard')

    e.preventDefault();
  }

  logOut() {
    console.log("log out");
    var myItem = localStorage.getItem('baseURL');
    localStorage.clear();
    localStorage.setItem('baseURL', myItem);
    ReactRouter.goTo('/Login');
  }


  handlePromo(e) {

    console.log("WoHOOOOOOOOOOOOOOOO");
    ReactRouter.goTo("/Promo")

    e.preventDefault();
  }
  render() {
    console.log(this.state.birthdaydate, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
    return (
      <div>

        <div className="Navdiv">
          <ul>
            <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
            <li className="active li" ><a className="active" onClick={this.handleDrivers.bind(this)} >السائقين</a></li>
            {/*<li className="active li"><a className="active" href="#home">السائقين</a></li>*/}
            <li><a href="#news">رحلات</a></li>
            <li><a href="#contact" onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
            <li><a href="#about">دعم</a></li>
            <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
          </ul>
        </div>
        <br />
        {/*<input type="button" value="Back" onClick={this.handleBack.bind(this)} />*/}
        <div className="CreateBigDiv">

          <div className="CreateBigDiv-right">

            <div className="CreateBigDiv-right-right">
              <p className="CreateBigDiv">الإسم</p>
              <p className="CreateBigDiv">رقم الهاتف</p>
              <p className="CreateBigDiv">البريد الإلكتروني</p>
              <p className="CreateBigDiv">كلمة المرور</p>
            </div>

            <div className="CreateBigDiv-right-left">
              <div className="CreateBigDivPDiv">
                <input type="text" className="CreateBigDivP" ref="Fname" required />
                <input type="text" className="CreateBigDivP" ref="pNumber" required />
                <input type="email" className="CreateBigDivP" ref="email" required />
                <input type="password" className="CreateBigDivP" ref="password" required />
              </div>

            </div>

          </div>

          <div className="CreateBigDiv-left">

            <div className="CreateBigDiv-left-right">
              <p className="CreateBigDiv">صورة شخصية</p>
              <p className="CreateBigDiv">تاريخ الميلاد</p>
              <p className="CreateBigDiv">العنوان</p>
              <p className="CreateBigDiv">رقم رخصة السائق</p>
              <p className="CreateBigDiv">تاريخ إنتهاء الرخصة</p>
            </div>

            <div className="CreateBigDiv-left-left">
              <div className="custom-file-upload-inner-div">
                <div className="custom-file-upload-inner-div-right">
                  <label className="custom-file-upload">
                    <input type="file" onChange={this.voo.bind(this)} />
                    <img src="./redashboard/Group 1548.png" className="custom-file-upload-img" />
                    {/*<i>اضغط لتحميل صورة شخصية</i>*/}
                  </label>
                </div >
                <div className="custom-file-upload-inner-div-left">
                  <p>اضغط لتحميل صورة شخصية</p>
                </div>
              </div>

              <div className="Options-GroupsT">
                <div className="OptionsOT">
                  <Select
                    ref="startyear"
                    placeholder="سنة"
                    value={this.state.startyear}
                    options={this.state.startyearoptions}
                    onChange={this.handleYearoptions.bind(this, "startyear")}
                  />
                </div>

                <div className="OptionsTT">
                  <Select
                    ref="startmonth"
                    placeholder="شهر"
                    value={this.state.startmonth}
                    options={this.state.startmonthoptions}
                    onChange={this.handleMonthoptions.bind(this, "startmonth")}
                  />
                </div>

                <div className="OptionsThT">
                  <Select
                    ref="startday"
                    placeholder="يوم"
                    value={this.state.startday}
                    options={this.state.startdayoptions}
                    onChange={this.handleDayoptions.bind(this, "startday")}
                  />
                </div>
              </div>
              <input type="text" ref="address" className="CreateBigDivPT" />

              <input type="text" className="CreateBigDivP" ref="driverLicenseNumber" required />
              <div className="Options-GroupsT">
                <div className="OptionsOT">
                  <Select
                    ref="startyear"
                    placeholder="سنة"
                    value={this.state.startyear}
                    options={this.state.startyearoptions}
                    onChange={this.handleYearoptionsE.bind(this, "startyear")}
                  />
                </div>

                <div className="OptionsTT">
                  <Select
                    ref="startmonth"
                    placeholder="شهر"
                    value={this.state.startmonth}
                    options={this.state.startmonthoptions}
                    onChange={this.handleMonthoptionsE.bind(this, "startmonth")}
                  />
                </div>

                <div className="OptionsThT">
                  <Select
                    ref="startday"
                    placeholder="يوم"
                    value={this.state.startday}
                    options={this.state.startdayoptions}
                    onChange={this.handleDayoptionsE.bind(this, "startday")}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>


        <br /><br />

        {/*<div>
          <label>First Name: </label>
          <input type="text" ref="Fname" required />
        </div>

        <div>
          <label>Last Name: </label>
          <input type="text" ref="Lname" required />
        </div>

        <div>
          <label>E-mail: </label>
          <input type="email" ref="email" />
        </div>

        <div>
          <label>Password: </label>
          <input type="password" ref="password" required />
        </div>

        <div>
          <label>Phonenumber: </label>
          <input type="text" ref="pNumber" required placeholder="#### ### ####" />
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
        </div>*/}

        {/*<div>
          <label>Change Artwork  < input type="file" ref="artwork" onChange={this.voo.bind(this)} /> </label>
        </div>*/}
        {/*<label className="custom-file-upload">
          <input type="file" onChange={this.voo.bind(this)} />
          <img src="./redashboard/Group 1548.png" />
        </label>
        <br /><br /><br />
        <input type="button" value="Submit" onClick={this.handleSubmit.bind(this)} />*/}


        <div className="buttonT">
          <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
          {/*onClick={this.handleSubmit.bind(this)}*/}
        </div>
      </div>
    );
  }
}

export default CreateUser;



  /* ReactRouter.goTo('/createUser');*/
