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
            // startdayoptions: [],
            // startmonthoptions: [],
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
            // startday: "",
            // startmonth: "",
            startyear: null,
            // endday: "",
            // endmonth: "",
            // endyear: "",
            userID: this.props.pID,
            blur: "",
            loginErrorModal: false,
            missingRequiredFields: "",
        })


        axios.get('/operator/getDriverById?' + "driverId=" + this.props.pID).then(function (response) {
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

    // handleDayoptions(type, value) {
    //     this.setState({ [type]: value });
    //     //  artistID = value.value;
    //     if (value) {
    //         dayID = value.value;
    //     } else {
    //         dayID = "";
    //     }

    //     console.log(value);
    //     console.log(dayID);
    // }

    // handleMonthoptions(type, value) {
    //     this.setState({ [type]: value });
    //     //  artistID = value.value;
    //     if (value) {
    //         monthID = value.value;
    //     } else {
    //         monthID = "";
    //     }

    //     console.log(value);
    //     console.log(monthID);
    // }

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

    // handleDayoptionsE(type, value) {
    //     this.setState({ [type]: value });
    //     //  artistID = value.value;
    //     if (value) {
    //         dayIDE = value.value;
    //     } else {
    //         dayIDE = "";
    //     }

    //     console.log(value);
    //     console.log(dayIDE);
    // }

    // handleMonthoptionsE(type, value) {
    //     this.setState({ [type]: value });
    //     //  artistID = value.value;
    //     if (value) {
    //         monthIDE = value.value;
    //     } else {
    //         monthIDE = "";
    //     }

    //     console.log(value);
    //     console.log(monthIDE);
    // }

    // handleYearoptionsE(type, value) {
    //     this.setState({ [type]: value });
    //     //  artistID = value.value;
    //     if (value) {
    //         yearIDE = value.value;
    //     } else {
    //         yearIDE = "";
    //     }
    //     this.handleBirthday()
    //     console.log(value);
    //     console.log(yearIDE);
    // }

    handleBirthday() {
        console.log(yearID, monthID - 1, dayID)
        this.setState({
            birthdaydate: new Date(yearID).getTime(),
            birthdaydateE: new Date(yearIDE).getTime(),
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
            let timestamp = Math.floor(this.state.birthdaydate);
            let timestampp = Math.floor(this.state.birthdaydateE);

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

            var labelvalue = this.refs.labelnum1.value + this.refs.labelnum2.value + this.refs.labelnum3.value + this.refs.labeltext.value;

            var object = {
                driver: this.state.userID,
                vehicletype: this.state.vehicleTypee,
                model: timestamp,
                make: this.refs.make.value,
                label: labelvalue,
                vehicleOwner: vehicleOwner,
                shaseehNo: this.refs.shaseehNo.value,
                motorNo: this.refs.motorNo.value
            }
            var UId = this.state.userID;
            console.log(object)
            axios.post('/operator/adddrivervehicle', object).then(function (response) {
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

    lableChange(event) {
        console.log(this.refs.labelnum1.value + this.refs.labelnum2.value + this.refs.labelnum3.value + this.refs.labeltext.value, "label")
    }
    NumericMethod(e) {
        const re = /[0-9]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    }

    CharactersMethod(e) {
        const re = /[a-zA-Z]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
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
                        <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
                        <li className="active li"><a className="active" >السائقين</a></li>
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

                    </div>

                    <div className="CreateBigDiv-left">


                        <div className="Newnewplan">
                            <p className="NewNewCreateBigDivLol">نوع المركبة *</p>
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

                        <div className="newplan" style={{ paddingBottom: "0", minHeight: "40px" }}>
                            <p className="NewNewCreateBigDivLol">ماركة المركبة</p>
                        <input type="text" ref="make" className="NewNewCreateBigDivPTLol" />

                    </div>

                    <div className="newplanPlate" >
                        <p className="NumericClass">الأرقام</p>
                        <p className="CharactersClass">الحروف</p>
                    </div>

                    <div className="newplan">
                        <p className="NewNewCreateBigDivLol">رقم اللوحة</p>
                        <div className="DivNewNewCreateBigDivPTLol123and4">
                            <div className="DivNewNewCreateBigDivPTLol121">  <input type="text" ref="labelnum1" onKeyPress={(e) => this.CharactersMethod(e)} className="NewNewCreateBigDivPTLol123" maxLength="1" onChange={this.lableChange.bind(this)} /> </div>
                            <div className="DivNewNewCreateBigDivPTLol122">  <input type="text" ref="labelnum2" onKeyPress={(e) => this.CharactersMethod(e)} className="NewNewCreateBigDivPTLol1236" maxLength="1" onChange={this.lableChange.bind(this)} /> </div>
                            <div className="DivNewNewCreateBigDivPTLol123">  <input type="text" ref="labelnum3" onKeyPress={(e) => this.CharactersMethod(e)} className="NewNewCreateBigDivPTLol1235" maxLength="1" onChange={this.lableChange.bind(this)} /> </div>
                            <div className="DivNewNewCreateBigDivPTLol124">  <input type="text" ref="labeltext" onKeyPress={(e) => this.NumericMethod(e)} className="NewNewCreateBigDivPTLol1234" maxLength="4" onChange={this.lableChange.bind(this)} /> </div>
                        </div>

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
                        <div className="OptionsOTNewBoomBoom">
                            <Select
                                ref="startyear"
                                placeholder="سنة"
                                // className="menu-outer-top3"
                                value={this.state.startyear}
                                options={this.state.startyearoptions}
                                onChange={this.handleYearoptions.bind(this, "startyear")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <br /> <br />

            <div className="buttonTT">
                {/*<input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />*/}
                <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.openModal.bind(this, "loginErrorModal")} />
            </div>
            </div >
        );
    }
}

export default AddVehicle;



  /* ReactRouter.goTo('/createUser');*/
