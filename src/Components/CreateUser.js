import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';
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
    axios.defaults.baseURL = localStorage.getItem('baseURL');
    /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    this.state = {
      startdayoptions: [],
      startmonthoptions: [],
      startyearoptions: [],
      enddayoptions: [],
      endmonthoptions: [],
      endyearoptions: [],

    };
  }

  componentDidMount() {
    var itemIds = [];
    var itemIds2 = [];
    var itemIds3 = [];
    var itemIds4 = [];
    var itemIds5 = [];
    var itemIds6 = [];
    for (var i = 1; i < 32; i++) {
      itemIds.push(
        {
          value: i,
          label: i
        }
      );
    }
    for (var i = 1; i < 13; i++) {
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

    for (var i = 1; i < 32; i++) {
      itemIds4.push(
        {
          value: i,
          label: i
        }
      );
    }
    for (var i = 1; i < 13; i++) {
      itemIds5.push(
        {
          value: i,
          label: i
        }
      );
    }
    for (var i = 1920; i < 2028; i++) {
      itemIds6.push(
        {
          value: i,
          label: i
        }
      );
    }

    console.log(itemIds)
    var x = itemIds3 + 10
    this.setState({
      startdayoptions: itemIds,
      startmonthoptions: itemIds2,
      startyearoptions: itemIds3,
      enddayoptions: itemIds4,
      endmonthoptions: itemIds5,
      endyearoptions: itemIds6,
    })

  }
  componentWillMount() {
    var that = this;
    this.setState({
      objects: [],
      startday: null,
      startmonth: null,
      startyear: null,
      endday: null,
      endmonth: null,
      endyear: null,
      blur: "",
      loginErrorModal: false,
      CreateErrorModal: false,
      missingRequiredFields: "",
      missingName: "",
      missingPhone: "",
      missingPass: "",
      errorMessage: "",
      SpecialistsOptions: [],
      Specialists: [],
      Specialist: null,
      AllSpecialists: [],
      branchesOptions: [],
      Branch: null,
      AllBranches: [],
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
      birthdaydateE: "",
      img: "",
      imgdata: new FormData()
    }
    this.getSpecialistsAPI();
    this.getBranchesAPI();
  }
  getSpecialistsAPI() {
    var that = this;
    var allSpecialistsOptions = [];
    axios.get('/operator/getAllSpecialists').then(function (response) {
      console.log(response.data, "getAllSpecialists Response")
      var x = response.data.data;
      console.log(x, "x")
      var objects = [];
      x.forEach(function (item, index) {
        console.log(item)
        objects.push(item)
        allSpecialistsOptions.push(
          {
            value: item._id,
            label: item.firstName
          })
        console.log(item)
      })

      that.setState({
        Specialists: allSpecialistsOptions,
        AllSpecialists: objects
      })

    }).catch(function (error) {
      alert(error.message);
      console.log(error)
    })
  }
  getBranchesAPI() {
    var that = this;
    var allbranchesOptions = [];
    axios.get('/operator/getAllBranches').then(function (response) {
      console.log(response, "helloooooooasdgkjuhasghdkjhasghdkjasgdkasgdakljshgdl")
      var x = response.data.data;
      var objects = [];
      x.forEach(function (item, index) {
        // console.log(item)
        objects.push(item)
        allbranchesOptions.push(
          {
            value: item._id,
            label: item.name
          })
        console.log(item)
      })

      that.setState({
        branchesOptions: allbranchesOptions,
        AllBranches: objects
      })

    }).catch(function (error) {
      alert(error.message);
      console.log(error)
    })
  }


  openModal(type) {
    console.log("welcome")
    console.log(type);
    !isNaN(this.refs.pNumber.value)
    var missingfields = "";
    var counter = 0;
    var missingName = "";
    var missingPN = "";
    var missingPass = "";
    var missingNID = "";
    var missingArray = [];
    var check = 0;
    var checkyear = false, checkmonth = false, checkday = false;
    console.log(this.refs.Fname.value, "this.refs.Fname.value  ", this.refs.pNumber.value, "this.refs.pNumber.value  ", this.refs.password.value, "this.refs.password.value")



    var yearNID = parseInt(this.refs.nationalIdNo.value.substring(1, 3));
    var MonthNID = parseInt(this.refs.nationalIdNo.value.substring(3, 5));
    var DayNID = parseInt(this.refs.nationalIdNo.value.substring(5, 7));
    console.log(yearNID, "yearNID")
    console.log(MonthNID, "MonthNID")
    console.log(DayNID, "DayNID")
    console.log(yearID, "yearID")
    var year2n = yearID.toString();
    year2n = year2n.substring(2, 4);
    year2n = parseInt(year2n);
    console.log(year2n, "year2n")
    if (yearNID === year2n) {
      console.log("years are equal")
      checkyear = true;
    }
    else {
      console.log("years arent equal")
    }

    if (MonthNID === parseInt(monthID)) {
      console.log("months are equal")
      checkmonth = true;
    }
    else {
      console.log("months arent equal")
    }
    console.log(DayNID, "DayNID")
    console.log(dayID, "dayID")
    if (DayNID === parseInt(dayID)) {
      console.log("days are equal")
      checkday = true;
    }
    else {
      console.log("days arent equal")
    }

    if (checkday === true && checkmonth === true && checkyear === true) {
      console.log("all are equal")
    }
    else {
      console.log("not all are equal")
      missingArray.push("NID and birthdate aren't matching")
    }
    // if (!this.refs.Fname.value && !this.refs.pNumber.value && !this.refs.password.value) {
    //   missingfields = "Name, Phonenumber and Passowrd are missing"
    //   console.log("Name, Phonenumber and Passowrd are missing")
    // }
    // else if (!this.refs.Fname.value && !this.refs.pNumber.value) {
    //   missingfields = "Name and Phonenumber are missing"
    //   console.log("Name and Phonenumber are missing")
    // }

    // else if (!this.refs.Fname.value && !this.refs.password.value) {
    //   missingfields = "Name and Passowrd are missing"
    //   console.log("Name and Passowrd are missing")
    // }
    // else if (!this.refs.pNumber.value && !this.refs.password.value) {
    //   missingfields = "Phonenumber and Passowrd are missing"
    //   console.log("Phonenumber and Passowrd are missing")
    // }
    // else if (!this.refs.Fname.value) {
    //   missingfields = "Name is missing"
    //   console.log("Name is missing")
    // }
    // else if (!this.refs.pNumber.value) {
    //   missingfields = "Phonenumber is missing"
    //   console.log("Phonenumber is missing")
    // }
    // else if (!this.refs.password.value) {
    //   missingfields = "Password is missing"
    //   console.log("Password is missing")
    // }
    // else if (!this.refs.nationalIdNo.value) {
    //   missingfields = "National ID is missing"
    //   console.log("Password is missing")
    // }
    if (this.refs.pNumber.value) {
      console.log(" this.refs.pNumber.value exist")
      if (isNaN(this.refs.pNumber.value) || this.refs.pNumber.value.length !== 11) {
        // missingfields = missingfields + " Phonenumber is wrong"
        missingArray.push("Phonenumber is wrong")
        // console.log(isNaN(this.refs.pNumber.value))
        // console.log(" Phonenumber is wrong 2")
        // console.log(!isNaN(this.refs.pNumber.value), "!isNaN(this.refs.pNumber.value)")
        // console.log(this.refs.pNumber.value.length, "this.refs.pNumber.value.length)")
        // console.log(Number(this.refs.pNumber.value.length) !== 11, "this.refs.pNumber.value.length !== 11")
      }
    }

    if (!this.refs.Fname.value) {
      missingfields = "Name is missing"
      console.log("Name is missing")
      missingArray.push("Name")
      check = 1;
      console.log(missingArray, "missingArray")

    }
    if (!this.refs.pNumber.value) {
      missingfields = "Phonenumber is missing"
      console.log("Phonenumber is missing")
      missingArray.push("Phonenumber")
      check = 1;
      console.log(missingArray, "missingArray")
    }
    if (!this.refs.password.value) {
      missingfields = "Password is missing"
      console.log("Password is missing")
      missingArray.push("Password")
      check = 1;
      console.log(missingArray, "missingArray")
    }
    if (!this.refs.nationalIdNo.value) {
      missingfields = "National ID is missing"
      console.log("National ID is missing")
      missingArray.push("National Id")
      check = 1;
      console.log(missingArray, "missingArray")
    }


    // var arrayz = missingArray.toString();
    // console.log(arrayz,"arrayz")
    console.log(missingArray.length, "missingArray.length")

    // missingArray.join();

    var multi = 1;
    if (multi < missingArray.length) {
      while (multi < missingArray.length) {

        missingArray.splice(multi, 0, " and ");
        multi = multi + 2;
        // missingArray.length++;
        console.log(missingArray, "missingArray of", multi)
      }
    }
    if (check === 1) {
      missingArray.push(" missing")
    }
    else {

    }

    console.log(missingArray, "missingArray")






    // if (missingfields !== "") {
    //   this.setState({
    //     [type]: true,
    //     blur: "blur",
    //     missingRequiredFields: missingfields,
    //   });
    // }

    if (missingArray[0] != null) {
      this.setState({
        [type]: true,
        blur: "blur",
        missingRequiredFields: missingArray,
      });
    }
    else {
      console.log("handleSubmit")
      this.handleSubmit(this)
    }
  }
  handleSpecialitsoptions(type, value) {
    console.log(value.value)
    this.setState({ [type]: value.value });

  }

  handleBranchoptions(type, value) {
    console.log(value.value)
    var BranchId = value.value;
    this.setState({ [type]: value.value });
    var Specialistss = [];


    this.state.AllSpecialists.forEach(function (item) {
      if (item.branch) {
        if (BranchId === item.branch._id) {
          console.log(item.branch)
          Specialistss.push(
            {
              value: item._id,
              label: item.firstName
            })
          console.log(item)
        }
      }
    })

    this.setState({
      SpecialistsOptions: Specialistss,
      Specialists: Specialistss

    })
  }
  openModal2(type) {
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




  handleDayoptions(type, value) {
    this.setState({ [type]: value });
    if (value) {
      if (value.value < 10) {
        dayID = '0' + value.value;
      }
      else {
        dayID = value.value;
      }
    } else {
      dayID = "";
    }
    this.handleBirthday()
    console.log(value);
    console.log(dayID);
  }

  handleMonthoptions(type, value) {
    this.setState({ [type]: value });
    if (value) {
      if (value.value < 10) {
        monthID = '0' + value.value;
      }
      else {
        monthID = value.value;
      }
    } else {
      monthID = "";
    }
    this.handleBirthday()
    console.log(value);
    console.log(monthID);
  }

  handleYearoptions(type, value) {
    this.setState({ [type]: value });
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
    console.log(yearID, monthID - 1, dayID)
    this.setState({
      birthdaydate: new Date(yearID, monthID - 1, dayID).getTime(),
      birthdaydateE: new Date(yearIDE, monthIDE - 1, dayIDE).getTime(),
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
      this.state.unixTimestamp = new Date().getTime();
      console.log(this.state.birthdaydate, "asdafasdfasdgfasdfjkahsdflkasjnfkl")
      let timestampp = Math.floor(this.state.birthdaydate);
      let timestamppE = Math.floor(this.state.birthdaydateE);
      var Form = this.state.imgdata;
      const data = new FormData();
      var vehicleLicence = {
        // number: this.refs.driverLicenseNumber.value,
        // expirationDate: timestamppE
      }

      if (this.state.birthdaydateE && this.refs.driverLicenseNumber.value) {
        // vehicleLicence["number"] = this.refs.driverLicenseNumber.value;
        // vehicleLicence["expirationDate"] = timestamppE;
        var vehicleLicence = {
          number: this.refs.driverLicenseNumber.value,
          expirationDate: timestamppE
        }
        data.append('driverLicense', JSON.stringify(vehicleLicence))
      }
      else if (this.refs.driverLicenseNumber.value) {
        vehicleLicence["number"] = this.refs.driverLicenseNumber.value
        // data.append('driverLicense', JSON.stringify(vehicleLicence))
        data.append('driverLicense', JSON.stringify(vehicleLicence))
      }
      else if (this.state.birthdaydateE) {
        vehicleLicence["expirationDate"] = timestamppE
        // data.append('driverLicense', JSON.stringify(vehicleLicence))
        data.append('driverLicense', JSON.stringify(vehicleLicence))
      }
      else {

      }
      vehicleLicence["number"] = this.refs.driverLicenseNumber.value;
      vehicleLicence["expirationDate"] = timestamppE;

      if (this.state.birthdaydate) {
        data.append('birthday', timestampp)
      }
      else {

      }

      if (this.refs.address.value) {
        data.append('address', this.refs.address.value)
      }
      else {

      }

      if (this.state.img) {
        data.append('picture', this.state.img)
      }
      else {

      }

      data.append('action', 'ADD');
      data.append('param', 0);
      data.append('firstName', this.refs.Fname.value)
      data.append('operator', this.state.Specialist)
      data.append('password', this.refs.password.value)
      data.append('phoneNumber', this.refs.pNumber.value)
      data.append('nationalIdNo', this.refs.nationalIdNo.value)

      // data.append('birthday', timestampp)
      // data.append('address', this.refs.address.value)
      // data.append('picture', this.state.img)
      if (this.refs.email.value === "" || this.refs.email.value === null) {
        // data.append('email', null)
      }
      else {
        data.append('email', this.refs.email.value)
      }

      // data.append('driverLicense', JSON.stringify(vehicleLicence))

      for (var pair of data.entries()) {
        console.log(pair)
      }
      axios.post('/operator/adddriver', data).then(function (response) {
        console.log(response)
        var ID = response.data.data._id;
        console.log(ID)
        var ObjectID = {
          ID: ID
        }
        ReactRouter.goTo(`/AddVehicle/${ID}`);
      }).catch(function (error) {
        // that.openModal("loginErrorModal")
        // alert(error.message);
        console.log(error.response.data.message)
        that.setState({
          errorMessage: error.response.data.message,
        })
        that.openModal2("CreateErrorModal")
        console.log("wazap")
      })
    }








    // e.preventDefault();
  }


  NIDOC(event) {
    console.log(event.target.value, "NIDOC")
  }

  handleDayoptionsE(type, value) {
    this.setState({ [type]: value });
    if (value) {
      if (value.value < 10) {
        dayIDE = '0' + value.value;
      }
      else {
        dayIDE = value.value;
      }
    } else {
      dayIDE = "";
    }
    this.handleBirthday()
    console.log(value);
    console.log(dayIDE);
  }

  handleMonthoptionsE(type, value) {
    this.setState({ [type]: value });
    if (value) {
      if (value.value < 10) {
        monthIDE = '0' + value.value;
      }
      else {
        monthIDE = value.value;
      }
    } else {
      monthIDE = "";
    }
    this.handleBirthday()
    console.log(value);
    console.log(monthIDE);
  }

  handleYearoptionsE(type, value) {
    this.setState({ [type]: value });
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
    console.log(this.state.birthdaydate, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
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
              {/*<div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width:"80%" }}>رقم التلفون أو كلمة المرور خاطئة</div>*/}
              <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width: "80%" }}>{this.state.missingRequiredFields}</div>
              <input type="button" value="حاول مرة أخرى" className="modalButton" onClick={this.closeModal.bind(this, "loginErrorModal")} />
            </div>
          </div>
        </Modal>



        <Modal
          isOpen={this.state.CreateErrorModal}
          onRequestClose={this.closeModal.bind(this, "CreateErrorModal")}
          style={customStyles}
        >
          <div>
            <span className="modalXButton" onClick={this.closeModal.bind(this, "CreateErrorModal")}>&times;</span>
            <br />
            <div style={{ width: "100%", textAlign: "-webkit-center" }}>
              <img style={{ width: "20%" }} src="./redX.png" />
              {/*<div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width:"80%" }}>رقم التلفون أو كلمة المرور خاطئة</div>*/}
              <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width: "80%" }}>{this.state.errorMessage}</div>
              <input type="button" value="حاول مرة أخرى" className="modalButton" onClick={this.closeModal.bind(this, "CreateErrorModal")} />
            </div>
          </div>
        </Modal>










        <div className="Navdiv">
          <ul className="NavdivUl">
            <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
            <li className="active li"><a className="active" onClick={() => { ReactRouter.goTo('/Reports') }}>السائقين</a></li>
            {/*}<li><a >رحلات</a></li>{*/}
            <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
            <li><a >دعم</a></li>
            <li><a onClick={() => { ReactRouter.goTo('/Reports') }}>تقارير</a></li>
            <li><a onClick={() => { ReactRouter.goTo('/Branches') }}>فروع</a></li>
            <li><a onClick={() => { ReactRouter.goTo('/Specialists') }}>الأخصائيين</a></li>
            <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
          </ul>
        </div>

        <br />

        <div className="SubdivNew">
          <ul className="SubdivUl">
            <li className="active li Sub" ><a className="active selected" >&lt; بيانات شخصية</a> </li>
            <li className="li Sub" ><a>&lt; بيانات المركبة</a></li>
            <li className="li Sub" ><a href="#news">صور مستندات و أوراق</a></li>
          </ul>
        </div>


        <div className="CreateBigDiv">

          <div className="CreateBigDiv-right2">









            <div className="NewCreateBigDiv7aram">
              <p className="NewNewNewCreateBigDiv7aram">الإسم       *</p>
              <input type="text" className="NewDriverProfileText" ref="Fname" required />
            </div>

            <div className="NewCreateBigDiv7aram">
              <p className="NewNewNewCreateBigDiv7aram">رقم الهاتف *</p>
              <input type="text" className="NewDriverProfileText" ref="pNumber" required />
            </div>

            <div className="NewCreateBigDiv7aram">
              <p className="NewNewNewCreateBigDiv7aram">الرقم القومي *</p>
              <input type="text" className="NewDriverProfileText" ref="nationalIdNo" onChange={this.NIDOC.bind(this)} required />
            </div>

            <div className="NewCreateBigDiv7aram">
              <p className="NewNewNewCreateBigDiv7aram">البريد الإلكتروني</p>
              <input type="email" className="NewDriverProfileText" ref="email" />
            </div>

            <div className="NewCreateBigDiv7aram">
              <p className="NewNewNewCreateBigDiv7aram">كلمة المرور *</p>
              <input type="password" className="NewDriverProfileText" ref="password" required />
            </div>

            <div className="NewCreateBigDiv7aram">
              <p className="NewNewNewCreateBigDiv7aram">إختر الفرع</p>
              {/* <div className="Options-GroupsFiNewNew"> */}
              {/* <div className="Inner-options-DivReally"> */}
              <div className="OptionsRightboom">
                <Select
                  ref="Branch"
                  placeholder="فرع"
                  // className="menu-outer-top4"
                  value={this.state.Branch}
                  options={this.state.branchesOptions}
                  onChange={this.handleBranchoptions.bind(this, "Branch")}
                />
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>

            <div className="NewCreateBigDiv7aram">
              <p className="NewNewNewCreateBigDiv7aram">إختر أخصائي</p>
              {/* <div className="Options-GroupsFiNewNew"> */}
              {/* <div className="Inner-options-DivReally"> */}
              <div className="OptionsRightboom">
                <Select
                  ref="branch"
                  placeholder="الأخصائي"
                  //className="menu-outer-top4"
                  value={this.state.Specialist}
                  options={this.state.SpecialistsOptions}
                  onChange={this.handleSpecialitsoptions.bind(this, "Specialist")}
                />
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>








            {/*<div className="CreateBigDiv-right-right7aram">
              <div className="newdivclass"><p className="CreateBigDiv7aram">الإسم</p> <p className="PAstrix">*</p></div>
              <div className="newdivclass2"><p className="CreateBigDiv7aram">رقم الهاتف</p> <p className="PAstrix">*</p></div>
              <p className="CreateBigDiv7aram">البريد الإلكتروني</p>
              <div className="newdivclass3"><p className="CreateBigDiv7aram">كلمة المرور</p> <p className="PAstrix">*</p></div>
            </div>

            <div className="CreateBigDiv-right-left">
              <div className="CreateBigDivPDiv">
                <input type="text" className="DriverProfileText" ref="Fname" required />
                <input id="phonenum" type="tel" pattern="^\d{11}$" className="DriverProfileText" ref="pNumber" required />
                <input type="email" className="DriverProfileText" ref="email" />
                <input type="password" className="DriverProfileText" ref="password" required />
              </div>

            </div>*/}

          </div>

          <div className="CreateBigDiv-left-what2">








            <div className="NewClassUser" >
              <p className="NewNewNewCreateBigDivLeft">صورة شخصية</p>
              <div className="NewNewNewcustom-file-upload-inner-divLol">
                <div className="NewNewNewcustom-file-upload-inner-div-right">
                  <label className="NewNewNewcustom-file-upload">
                    <input type="file" onChange={this.voo.bind(this)} />
                    <img src="./redashboard/Group 1548.png" className="NewNewNewcustom-file-upload-img" />
                  </label>
                </div >
                <div className="NewNewNewcustom-file-upload-inner-div-left">
                  <p className="ANewClass">اضغط لتغير الصورة الشخصية</p>
                </div>
              </div>
            </div>

            <div className="NewClassUserNewNewNew" >
              <p className="NewNewNewCreateBigDivLeftNew">تاريخ الميلاد *</p>
              <div className="Options-GroupsTNewNewcomecome">
                <div className="OptionsOTNewNewcomecome ">
                  <Select
                    ref="startyear"
                    placeholder="سنة"
                    // className="menu-outer-top"
                    value={this.state.startyear}
                    options={this.state.startyearoptions}
                    onChange={this.handleYearoptions.bind(this, "startyear")}
                  />
                </div>
                <div className="OptionsTTNewNewtruecomecome ">
                  <Select
                    ref="startmonth"
                    placeholder="شهر"
                    //className="menu-outer-top"
                    value={this.state.startmonth}
                    options={this.state.startmonthoptions}
                    onChange={this.handleMonthoptions.bind(this, "startmonth")}
                  />
                </div>
                <div className="OptionsThTNewNewcomecome ">
                  <Select
                    ref="startday"
                    placeholder="يوم"
                    // className="menu-outer-top2"
                    value={this.state.startday}
                    options={this.state.startdayoptions}
                    onChange={this.handleDayoptions.bind(this, "startday")}
                  />
                </div>
              </div>
            </div>

            <div className="NewClassUserNew22" >
              <p className="NewNewNewCreateBigDivLeft22">العنوان</p>
              <input type="text" ref="address" className="NewNewNewNewCreateBigDivPTTT2comecome22" />
            </div>

            <div className="NewClassUseryay" >
              <p className="NewNewNewCreateBigDivLeft">رقم رخصة السائق</p>
              <input type="text" className="NewNewNewNewCreateBigDivPTTT2comecome" ref="driverLicenseNumber" />
            </div>

            <div className="NewClassUserHelloz" >
              <p className="NewNewNewCreateBigDivLeftNew">تاريخ إنتهاء الرخصة</p>
              <div className="Options-GroupsTNewNewcomecome">

                <div className="OptionsOTNewNewcomecome">
                  <Select
                    ref="endyear"
                    placeholder="سنة"
                    // className="menu-outer-top"
                    value={this.state.endyear}
                    options={this.state.endyearoptions}
                    onChange={this.handleYearoptionsE.bind(this, "endyear")}
                  />
                </div>
                <div className="OptionsTTNewNewtruecomecome">
                  <Select
                    ref="endmonth"
                    placeholder="شهر"
                    //className="menu-outer-top"
                    value={this.state.endmonth}
                    options={this.state.endmonthoptions}
                    onChange={this.handleMonthoptionsE.bind(this, "endmonth")}
                  />
                </div>
                <div className="OptionsThTNewNewcomecome">
                  <Select
                    ref="endday"
                    placeholder="يوم"
                    //  className="menu-outer-top"
                    value={this.state.endday}
                    options={this.state.enddayoptions}
                    onChange={this.handleDayoptionsE.bind(this, "endday")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br /><br />

        <div className="buttonTT">
          {/*<input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />*/}
          {/*
          that.openModal("loginErrorModal")
          */}

          <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.openModal.bind(this, "loginErrorModal")} />
        </div>
      </div>
    );
  }
}

export default CreateUser;
