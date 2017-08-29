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

class AddVehicle extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.pID, "aaaaaaaaa");
        // axios.defaults.baseURL = 'https://halanapp.herokuapp.com/';
        // axios.defaults.baseURL = 'http://192.168.1.29:4000';
        axios.defaults.baseURL = localStorage.getItem('baseURL');
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

        imgStyle = {
            width: "100%"
        }
        divStyle = {
            width: "50%"
        }
        this.state = {
            unixTimestamp: "",
            img: "",
            imgdata: new FormData(),
        }
        this.setState({
            startday: "",
            startmonth: "",
            startyear: "",
            endday: "",
            endmonth: "",
            endyear: "",
            userID: this.props.pID
        })
    }
    static defaultProps = {


    }

    handleAddP(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/AddDriverPapers")

        e.preventDefault();
    }
    voo(event) {

        var file = event.target.files[0];
        this.setState({
            img: file,
        })
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

    handleBirthday() {
        console.log(yearID, monthID + 1, dayID)
        this.setState({
            birthdaydate: new Date(yearID, monthID + 1, dayID).getTime(),
            birthdaydateE: new Date(yearIDE, monthIDE + 1, dayIDE).getTime(),
            endday: "sadjkhasdk"
        });
        console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
    }
    handleVehicleType1(value) {
        this.setState({
            vehicleTypee: "tricycle"
        })
        console.log("tricycle")
    }

    handleVehicleType2(value) {
        this.setState({
            vehicleTypee: "motorcycle"
        })
        console.log("motorcycle")
    }

    handleVehicleType3(value) {
        this.setState({
            vehicleTypee: "toktok"
        })
        console.log("toktok")
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

    handleDrivers(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo('/DashBoard')

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
            let timestamp = Math.floor(this.state.birthdaydate / 1000);
            let timestampp = Math.floor(this.state.birthdaydateE / 1000);
            // this.setState({
            //     unixTimestamp: this.refs.expirationDate.value,
            // })
            // this.state.unixTimestamp = new Date().getTime();
            // let expirationDate = Math.floor(this.state.unixTimestamp / 1000);
            // var Form = this.state.imgdata;

            //Form.append('email', 'aa@aa.com')   

            var vehicleLicence = {
                // number: this.refs.vehicleLicenceNumber.value,
                expirationDate: timestampp
            }

            var vehicleOwner = {
                name: this.refs.oName.value,
                phoneNumber: this.refs.OPNumber.value,
                nationalIdNo: this.refs.nID.value
            }

            var object = {
                driver: this.state.userID,
                vehicletype: this.state.vehicleTypee,
                model: timestamp,
                make: this.refs.make.value,
                label: this.refs.label.value,
                // vehicleLicence: vehicleLicence,
                vehicleOwner: vehicleOwner,
                shaseehNo: this.refs.shaseehNo.value,
                motorNo: this.refs.motorNo.value
            }
            var UId = this.state.userID;
            console.log(object)
            axios.post('/api/operator/adddrivervehicle', object).then(function (response) {
                console.log(response)
                ReactRouter.goTo(`/AddDriverPapers/${UId}`);
                // window.localStorage.setItem('sessionToken', response.data);
                /*ReactRouter.goTo("/DashBoard", object)*/

            }).catch(function (error) {

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
        console.log(this.state.userID, "user ID prop in render")
        return (
            // <div>


            //     <input type="button" value="Back" onClick={this.handleBack.bind(this)} />


            //     <div>
            //         <label>Driver ID: </label>
            //         <input type="text" ref="driver" required /> 
            //     </div>

            //     <div>
            //         <label>Vehicle Type: </label>
            //         <input type="text" ref="vehicleType" placeholder="toktok/motorcycle" required />
            //     </div>

            //     <div>
            //         <label>Model: </label>
            //         <input type="text" ref="model" placeholder="Year of make" required />
            //     </div>

            //     <div>
            //         <label>Make: </label>
            //         <input type="text" ref="make" placeholder="BMW" required />
            //     </div>

            //     <div>
            //         <label>Label: </label>
            //         <input type="text" ref="label" placeholder="ABC|123" required />
            //     </div>

            //     <div>
            //         <label>Vehicle Licence Number: </label>
            //         <input type="text" ref="vehicleLicenceNumber" />
            //     </div>

            //     <div>
            //         <label>Vehicle Expiration Date: </label>
            //         <input type="date" ref="expirationDate" />
            //     </div>

            //     <div>
            //         <label>Owner Name: </label>
            //         <input type="text" ref="oName" />
            //     </div>


            //     <div>
            //         <label>Owner Phonenumber: </label>
            //         <input type="text" ref="OPNumber" placeholder="#### ### ####" />
            //     </div>

            //     <div>
            //         <label>Owner National ID : </label>
            //         <input type="text" ref="nID" />
            //     </div>

            //     <div>
            //         <label>Change Artwork  < input type="file" ref="artwork" onChange={this.voo.bind(this)} /> </label>
            //     </div>

            //     <input type="button" value="Submit" onClick={this.handleSubmit.bind(this)} />

            // </div>

            <div>

                <div className="Navdiv">
                    <ul>
                        <li className="Header Logo"><img src="/Group 11.png" alt="Header Logo" /></li>
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
                            {/*<p className="CreateBigDiv">رقم رخصة السائق</p>
                            <p className="CreateBigDiv">تاريخ إنتهاء الرخصة</p>*/}
                            <input type="checkbox" />
                            <p className="CreateBigDiv">أسم مالك المركبة</p>
                            <p className="CreateBigDiv">رقم المالك</p>
                            <p className="CreateBigDiv">رقم بطاقة المالك</p>
                        </div>

                        <div className="CreateBigDiv-right-left">
                            <div className="CreateBigDivPDiv">
                                {/*<input type="text" className="CreateBigDivP" ref="driver" required />
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
                                </div>*/}
                                <div className="BOOMMM">
                                    <p className="CreateBigDivP">هل السائق هو نفس مالك المركبة</p>
                                </div>
                                <input type="text" className="CreateBigDivP" ref="oName" required />
                                <input type="text" className="CreateBigDivP" ref="OPNumber" required />
                                <input type="text" className="CreateBigDivP" ref="nID" required />
                            </div>

                        </div>

                    </div>

                    <div className="CreateBigDiv-left">

                        <div className="CreateBigDiv-left-right">
                            <p className="CreateBigDiv">نوع المركبة</p>
                            <p className="CreateBigDiv">الموديل</p>
                            <p className="CreateBigDiv">رقم اللوحة</p>
                            <p className="CreateBigDiv">تاريخ الإنتاج</p>
                            <p className="CreateBigDiv">رقم الشاسيه</p>
                            <p className="CreateBigDiv">رقم الموتور</p>
                        </div>

                        <div className="CreateBigDiv-left-left">
                            {/*<div className="custom-file-upload-inner-div">
                                <div className="custom-file-upload-inner-div-right">
                                    <label className="custom-file-upload">
                                        <input type="file" onChange={this.voo.bind(this)} />
                                        <img src="./redashboard/Group 1548.png" className="custom-file-upload-img" />
                                    </label>
                                </div >
                                <div className="custom-file-upload-inner-div-left">
                                    <p>اضغط لتحميل صورة شخصية</p>
                                </div>
                            </div>*/}


                            <div id="maincontainer"> 
                                <img src="\Group 1524.png" className="one" ref="tricycle" onClick={this.handleVehicleType1.bind(this)} />
                                <img src="\Line 515.png" className="two" />
                                <img src="\Group 1523.png" className="one" ref="motorcycle" onClick={this.handleVehicleType2.bind(this)} />
                                <img src="\Line 515.png" className="two" />
                                <img src="\Group 1522.png" className="one" ref="toktok" onClick={this.handleVehicleType3.bind(this)} />

                                {/*<img src="http://www.iconsdb.com/icons/preview/black/car-xxl.png" className="one" ref="tricycle" onClick={this.handleVehicleType1.bind(this)} />
                                <img src="http://www.iconsdb.com/icons/preview/black/car-xxl.png" className="two" />
                                <img src="http://www.iconsdb.com/icons/preview/black/car-xxl.png" className="one" ref="motorcycle" onClick={this.handleVehicleType2.bind(this)} />
                                <img src="http://www.iconsdb.com/icons/preview/black/car-xxl.png" className="two" />
                                <img src="http://www.iconsdb.com/icons/preview/black/car-xxl.png" className="one" ref="toktok" onClick={this.handleVehicleType3.bind(this)} />*/}
                            </div>

                            <input type="text" ref="make" className="CreateBigDivPT" />
                            <input type="text" ref="label" className="CreateBigDivPT" />
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
                            <input type="text" ref="shaseehNo" className="CreateBigDivPT" />
                            <input type="text" ref="motorNo" className="CreateBigDivPT" />
                        </div>
                    </div>

                </div>


                <br /><br />

                <div className="buttonT">
                    <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
                    {/*onClick={this.handleSubmit.bind(this)}*/}
                </div>
            </div>
        );
    }
}

export default AddVehicle;



  /* ReactRouter.goTo('/createUser');*/
