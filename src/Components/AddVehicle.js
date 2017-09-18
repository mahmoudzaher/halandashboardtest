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

class AddVehicle extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props.pID, "aaaaaaaaa");
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        this.state = {
            startdayoptions: [],
            startmonthoptions: [],
            startyearoptions: [],
            TokTokActive: "not",
            TricycleActive: "not",
            MotocycleActive: "not",
            vehicleOwnerName: "",
            vehicleOwnerId: "",
            vehicleOwnerPNumber: "",

        };

    }
    getInitialState() {
        return {
            isChecked: true
        };
    }
    handleCheckboxChange(event) {
        // console.log("checkbox changed!", event);
        console.log("checkbox changed!", event.target.checked);
        this.setState({ isChecked: event.target.checked });
        console.log("checkbox changed! isChecked", this.state.isChecked);
        // if (event.target.checked === true) {

        // }
        // if(this.state.isChecked){
        //     console.log("its Cheeecked")
        // }
        // else if(!this.state.isChecked){
        //     console.log("oh nooooooo")
        // }

        // console.log(event.target.checked,"event.target.checked")
    }

    componentWillMount() {
        var that = this
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
            vehicleTypee: "",
            startday: "",
            startmonth: "",
            startyear: "",
            endday: "",
            endmonth: "",
            endyear: "",
            userID: this.props.pID,
            blur: "",
            loginErrorModal: false,
            missingRequiredFields: "",
        })


        axios.get('/api/operator/getDriverById?' + "driverId=" + this.props.pID).then(function (response) {
            console.log(response.data.data, "getdriver Response")
            var x = response.data.data;
            // console.log(x, "x Response")
            console.log(x.firstName, "x.first")
            that.setState({
                vehicleOwnerName: x.firstName,
                vehicleOwnerId: x.nationalIdNo,
                vehicleOwnerPNumber: x.phoneNumber,

            })


        }).catch(function (error) {
            alert(error.message, "what");
            console.log(error.message)
        })




    }



    openModal(type) {
        console.log(type);
        var missingfields = "";

        if (this.state.vehicleTypee === "") {
            missingfields = "VehicleType is missing"
            console.log("VehicleType is missing")
        }


        if (missingfields !== "") {
            this.setState({
                [type]: true,
                blur: "blur",
                missingRequiredFields: missingfields,
            });
        }
        else {
            console.log("handleSubmit")
            this.handleSubmit(this)
        }
    }

    closeModal(type) {
        console.log(type);
        this.setState({
            [type]: false,
            blur: ""
        });
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
        // console.log(itemIds)
        this.setState({
            startdayoptions: itemIds,
            startmonthoptions: itemIds2,
            startyearoptions: itemIds3,
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
            vehicleTypee: "tricycle",
            TricycleActive: "active",
            MotocycleActive: "not",
            TokTokActive: "not"
        })
        console.log("tricycle")
    }

    handleVehicleType2(value) {
        this.setState({
            vehicleTypee: "motorcycle",
            TricycleActive: "not",
            MotocycleActive: "active",
            TokTokActive: "not"
        })
        console.log("motorcycle")
    }

    handleVehicleType3(value) {
        this.setState({
            vehicleTypee: "toktok",
            TricycleActive: "not",
            MotocycleActive: "not",
            TokTokActive: "active"
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
            // console.alert('Something is missing');
            // console.log()

        }
        else {
            let timestamp = Math.floor(this.state.birthdaydate / 1000);
            let timestampp = Math.floor(this.state.birthdaydateE / 1000);

            if (this.state.isChecked === false || this.state.isChecked === undefined) {
                console.log("isChecked is false")
                var vehicleOwner = {
                    name: this.state.vehicleOwnerName,
                    phoneNumber: this.state.vehicleOwnerPNumber,
                    nationalIdNo: this.state.vehicleOwnerId
                }
            }
            else {
                console.log("isChecked is true")
                var vehicleOwner = {
                    name: this.refs.oName.value,
                    phoneNumber: this.refs.OPNumber.value,
                    nationalIdNo: this.refs.nID.value
                }
            }


            var object = {
                driver: this.state.userID,
                vehicletype: this.state.vehicleTypee,
                model: timestamp,
                make: this.refs.make.value,
                label: this.refs.label.value,
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








        // e.preventDefault();
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
        // console.log(this.state.userID, "user ID prop in render")
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
                            {/*<div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width:"80%" }}>رقم التلفون أو كلمة المرور خاطئة</div>*/}
                            <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width: "80%" }}>{this.state.missingRequiredFields}</div>
                            <input type="button" value="حاول مرة أخرى" className="modalButton" onClick={this.closeModal.bind(this, "loginErrorModal")} />
                        </div>
                    </div>
                </Modal>








                <div className="Navdiv">
                    <ul className="NavdivUl">
                        <li className="Header Logo"><img src="/Group 11.png" alt="Header Logo" /></li>
                        <li className="active li"><a className="active" >السائقين</a></li>
                        <li><a >رحلات</a></li>
                        <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
                        <li><a >دعم</a></li>
                        <li><a >تقارير</a></li>
                        <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
                    </ul>
                </div>
                <br />

                <div className="Subdiv">
                    <ul className="SubdivUl">
                        <li className=""><a>&lt; بيانات شخصية</a> </li>
                        <li className="active li Sub" ><a className="active selected" >&lt; بيانات المركبة</a></li>
                        <li><a href="#news">صور مستندات و أوراق</a></li>
                    </ul>
                </div>


                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">








                        <div className="Test">
                            <input type="checkbox" className="Newcheckmate" onChange={this.handleCheckboxChange.bind(this)} checked={this.state.isChecked} />
                            <div className="NewBOOMMM"><p className="NewCreateBigDivPIdk">هل السائق هو نفس مالك المركبة</p></div>
                        </div>

                        <div className="Test">
                            <p className="NewCreateBigDivNewLol" >أسم مالك المركبة</p>
                            <input type="text" className="NewCreateBigDivP" ref="oName" disabled={this.state.isChecked} />
                        </div>

                        <div className="Test">
                            <p className="NewCreateBigDivNewLol">رقم المالك</p>
                            <input type="text" className="NewCreateBigDivP" ref="OPNumber" disabled={this.state.isChecked} />
                        </div>

                        <div className="Test">
                            <p className="NewCreateBigDivNewLol">رقم بطاقة المالك</p>
                            <input type="text" className="NewCreateBigDivP" ref="nID" disabled={this.state.isChecked} />
                        </div>






                        {/*<div className="CreateBigDiv-right-right">
                            <input type="checkbox" className="checkmate" onChange={this.handleCheckboxChange.bind(this)} checked={this.state.isChecked} />
                            <p className="CreateBigDivNewLol">أسم مالك المركبة</p>
                            <p className="CreateBigDivNewLol">رقم المالك</p>
                            <p className="CreateBigDivNewLol">رقم بطاقة المالك</p>
                        </div>

                        <div className="CreateBigDiv-right-left">
                            <div className="CreateBigDivPDiv">
                                <div className="BOOMMM">
                                    <p className="CreateBigDivPIdk">هل السائق هو نفس مالك المركبة</p>
                                </div>
                                <input type="text" className="CreateBigDivP" ref="oName" required disabled={this.state.isChecked} />
                                <input type="text" className="CreateBigDivP" ref="OPNumber" required disabled={this.state.isChecked} />
                                <input type="text" className="CreateBigDivP" ref="nID" required disabled={this.state.isChecked} />
                            </div>

                        </div>*/}

                    </div>

                    <div className="CreateBigDiv-left">


                    <div className="Newnewplan">
                            <p className="NewNewCreateBigDivLol">نوع المركبة</p>
                            <div id="maincontainerLolNewNew">
                                <div className="threeNewNew" >
                                    <img src="\Group 1522.png" className={this.state.TokTokActive == "active" ? "one active" : "one"} ref="toktok" onClick={this.handleVehicleType3.bind(this)} />
                                </div>
                                <div className="fourNew">
                                    <img src="\Line 515.png" className="twoNew" />
                                </div>

                                <div className="threeNew" >
                                    <img src="\Group 1523.png" className={this.state.MotocycleActive == "active" ? "one active" : "one"} ref="motorcycle" onClick={this.handleVehicleType2.bind(this)} />
                                </div>
                                <div className="fourNew">
                                    <img src="\Line 515.png" className="twoNew" />
                                </div>
                                <div className="threeNew" >
                                    <img src="\Group 1524.png" className={this.state.TricycleActive == "active" ? "one active" : "one"} ref="tricycle" onClick={this.handleVehicleType1.bind(this)} />
                                </div>

                            </div>

                        </div>

                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">الموديل</p>
                            <input type="text" ref="make" className="NewNewCreateBigDivPTLol"  />

                        </div>

                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">رقم اللوحة</p>
                            <input type="text" ref="label" className="NewNewCreateBigDivPTLol"  />

                        </div>


                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">رقم الشاسيه</p>
                            <input type="text" ref="shaseehNo" className="NewNewCreateBigDivPTLol" />

                        </div>

                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">رقم الموتور</p>
                            <input type="text" ref="motorNo" className="NewNewCreateBigDivPTLol" />
                        </div>


                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">تاريخ الإنتاج</p>
                            <div className="Options-GroupsFiNewNew">
                                <div className="Inner-options-Div">

                                    {/*<div className="OptionsThTNew">
                                        <Select
                                            ref="startday"
                                            placeholder="يوم"
                                            className="menu-outer-top"
                                            value={this.state.Day}
                                            options={this.state.startdayoptions}
                                            onChange={this.handleDayoptions.bind(this, "startday")}
                                        />
                                    </div>

                                    <div className="OptionsTTNew">
                                        <Select
                                            ref="startmonth"
                                            placeholder="شهر"
                                            className="menu-outer-top"
                                            value={this.state.Month}
                                            options={this.state.startmonthoptions}
                                            onChange={this.handleMonthoptions.bind(this, "startmonth")}
                                        />
                                    </div>*/}

                                    <div className="OptionsOTNew">
                                        <Select
                                            ref="startyear"
                                            placeholder="سنة"
                                            className="menu-outer-top3"
                                            value={this.state.startyear}
                                            options={this.state.startyearoptions}
                                            onChange={this.handleYearoptions.bind(this, "startyear")}
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>













                        {/*<div className="CreateBigDiv-left-rightLol">
                            <p className="CreateBigDivLol">نوع المركبة</p>
                            <p className="CreateBigDivLol">الموديل</p>
                            <p className="CreateBigDivLol">رقم اللوحة</p>
                            <p className="CreateBigDivLol">تاريخ الإنتاج</p>
                            <p className="CreateBigDivLol">رقم الشاسيه</p>
                            <p className="CreateBigDivLol">رقم الموتور</p>
                        </div>

                        <div className="CreateBigDiv-left-leftLol">
                            <div id="maincontainerLol">
                                <div className="three" >
                                    <img src="\Group 1524.png" className={this.state.TricycleActive == "active" ? "one active" : "one"} ref="tricycle" onClick={this.handleVehicleType1.bind(this)} />
                                </div>
                                <div className="four">
                                    <img src="\Line 515.png" className="two" />
                                </div>

                                <div className="three" >
                                    <img src="\Group 1523.png" className={this.state.MotocycleActive == "active" ? "one active" : "one"} ref="motorcycle" onClick={this.handleVehicleType2.bind(this)} />
                                </div>
                                <div className="four">
                                    <img src="\Line 515.png" className="two" />
                                </div>

                                <div className="three" >
                                    <img src="\Group 1522.png" className={this.state.TokTokActive == "active" ? "one active" : "one"} ref="toktok" onClick={this.handleVehicleType3.bind(this)} />
                                </div>
                            </div>

                            <input type="text" ref="make" className="CreateBigDivPTLol" />
                            <input type="text" ref="label" className="CreateBigDivPTLol" />
                            <div className="Options-GroupsFi">
                                <div className="OptionsOT">
                                    <Select
                                        ref="startyear"
                                        placeholder="سنة"
                                        className="menu-outer-top"
                                        value={this.state.startyear}
                                        options={this.state.startyearoptions}
                                        onChange={this.handleYearoptions.bind(this, "startyear")}
                                    />
                                </div>

                                <div className="OptionsTT">
                                    <Select
                                        ref="startmonth"
                                        placeholder="شهر"
                                        className="menu-outer-top"
                                        value={this.state.startmonth}
                                        options={this.state.startmonthoptions}
                                        onChange={this.handleMonthoptions.bind(this, "startmonth")}
                                    />
                                </div>

                                <div className="OptionsThT">
                                    <Select
                                        ref="startday"
                                        placeholder="يوم"
                                        className="menu-outer-top"
                                        value={this.state.startday}
                                        options={this.state.startdayoptions}
                                        onChange={this.handleDayoptions.bind(this, "startday")}
                                    />
                                </div>
                            </div>
                            <input type="text" ref="shaseehNo" className="CreateBigDivPTLol" />
                            <input type="text" ref="motorNo" className="CreateBigDivPTLol" />
                        </div>*/}

                    </div>

                </div>


                <br /><br />

                <div className="buttonTT">
                    {/*<input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />*/}
                    <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.openModal.bind(this, "loginErrorModal")} />
                    {/*onClick={this.handleSubmit.bind(this)}*/}
                </div>
            </div>
        );
    }
}

export default AddVehicle;



  /* ReactRouter.goTo('/createUser');*/
