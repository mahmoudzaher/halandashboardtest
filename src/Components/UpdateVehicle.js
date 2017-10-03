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

class UpdateVehicle extends Component {

    constructor(props) {
        super(props);
        var that = this;
        console.log(this.props.pID, "aaaaaaaaa");
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        this.state = {
            startdayoptions: [],
            startmonthoptions: [],
            startyearoptions: [],
            vehicleOwnerName: "",
            vehicleOwnerId: "",
            vehicleOwnerPNumber: "",
            vehicleType: "",
            vehicleDateofMake: "",
            vehicleMake: "",
            vehicleLabel: "",
            vehicleLabelnum1: "",
            vehicleLabelnum2: "",
            vehicleLabelnum3: "",
            vehicleLabeltext: "",
            vehicleShaseeh: "",
            vehicleMotor: "",
            TokTokActive: "not",
            TricycleActive: "not",
            MotocycleActive: "not",
            userID: that.props.pID,
            driverId: that.props.pID,
            vehicleId: "",
        };

    }
    // state = {
    //     activeIndex: null
    // }
    getInitialState() {
        return {
            isChecked: true
        };
    }
    handleCheckboxChange(event) {
        console.log("checkbox changed!", event);
        this.setState({ isChecked: event.target.checked });
    }
    componentWillMount() {

        var that = this;
        this.setState({
            startday: "",
            startmonth: "",
            startyear: "",
            endday: "",
            endmonth: "",
            endyear: "",
            unixTimestamp: "",
            img: "",
            imgdata: new FormData(),
            disabledd: "on",
            checked: ''
        })


        axios.get('/operator/getDriverById?' + "driverId=" + this.state.driverId).then(function (response) {
            console.log(response, "getDriverById Response")
            var y = response.data.data;
            // var parser = parseInt(y.birthday)
            // var birthdate = new Date(parser * 1000);

            that.setState({
                vehicleId: y.vehicle._id,
                // driverBirthday: birthdate,
                // Year: birthdate.getFullYear(),
                // Month: birthdate.getMonth() + 1,
                // Day: birthdate.getDate(),


            })

            axios.get('/operator/getdrivervehicle?' + "vehicleId=" + that.state.vehicleId).then(function (response) {
                console.log(response.data, "getdrivervehicle Response")
                var x = response.data;
                // console.log(x, "x Response")
                if (x.vehicleOwner) {
                    that.setState({
                        vehicleOwnerName: x.vehicleOwner.name,
                        vehicleOwnerId: x.vehicleOwner.nationalIdNo,
                        vehicleOwnerPNumber: x.vehicleOwner.phoneNumber,

                    })
                }

                var parser = parseInt(x.model)
                var birthdate = new Date(parser);
                var lebellength = x.label.length - 1;
                var lebellengthlast = lebellength - 4;
                that.setState({
                    vehicleType: x.vehicletype,
                    vehicleDateofMake: x.model,
                    vehicleMake: x.make,
                    vehicleLabel: x.label,
                    vehicleLabelnum1: x.label.substr(0, 1),
                    vehicleLabelnum2: x.label.substr(1, 1),
                    vehicleShaseeh: x.shaseehNo,
                    vehicleMotor: x.motorNo,

                    Year: birthdate.getFullYear(),
                    Month: birthdate.getMonth() + 1,
                    Day: birthdate.getDate(),
                })
                if (typeof x.label.substr(lebellength - 2, 1) === 'string') {
                    that.setState({
                        vehicleLabelnum3: x.label.substr(2, 1),
                        vehicleLabeltext: x.label.substr(3, 4)
                    })
                }
                else {
                    that.setState({
                        vehicleLabelnum3: '',
                        vehicleLabeltext: x.label.substr(lebellength - lebellengthlast, 4, )
                    })
                }

                if (that.state.vehicleType === "toktok") {
                    that.setState({
                        TokTokActive: "active"
                    })
                }
                else if (that.state.vehicleType === "motorcycle") {
                    that.setState({
                        MotocycleActive: "active"
                    })
                }
                else if (that.state.vehicleType === "tricycle") {
                    that.setState({
                        TricycleActive: "active"
                    })
                }

            }).catch(function (error) {
                // alert(error.message, "what");
                console.log(error.message)
            })


        }).catch(function (error) {
            alert(error.message, "what");
            console.log(error.message)
        })
    }

    componentDidMount() {
        var that = this;
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

        // axios.get('/operator/getDriverById?' + "driverId=" + this.state.driverId).then(function (response) {
        //     console.log(response, "getDriverById Response")
        //     var y = response.data.data;

        //     that.setState({
        //         vehicleId: y.vehicle._id,
        //     })

        //     axios.get('/operator/getdrivervehicle?' + "vehicleId=" + that.state.vehicleId).then(function (response) {
        //         console.log(response.data, "getdrivervehicle Response")
        //         var x = response.data;
        //         // console.log(x, "x Response")
        //         if (x.vehicleOwner) {
        //             that.setState({
        //                 vehicleOwnerName: x.vehicleOwner.name,
        //                 vehicleOwnerId: x.vehicleOwner.nationalIdNo,
        //                 vehicleOwnerPNumber: x.vehicleOwner.phoneNumber,

        //             })
        //         }
        //         that.setState({
        //             vehicleType: x.vehicletype,
        //             vehicleDateofMake: x.model,
        //             vehicleMake: x.make,
        //             vehicleLabel: x.label,
        //             vehicleShaseeh: x.shaseehNo,
        //             vehicleMotor: x.motorNo,

        //         })

        //         if (that.state.vehicleType === "toktok") {
        //             that.setState({
        //                 TokTokActive: "active"
        //             })
        //         }
        //         else if (that.state.vehicleType === "motorcycle") {
        //             that.setState({
        //                 MotocycleActive: "active"
        //             })
        //         }
        //         else if (that.state.vehicleType === "tricycle") {
        //             that.setState({
        //                 TricycleActive: "active"
        //             })
        //         }

        //     }).catch(function (error) {
        //         alert(error.message, "what");
        //         console.log(error.message)
        //     })


        // }).catch(function (error) {
        //     alert(error.message, "what");
        //     console.log(error.message)
        // })


        // console.log(this.state.vehicleId, "this.state.vehicleId")
        // axios.get('/operator/getdrivervehicle?' + "vehicleId=" + this.state.vehicleId).then(function (response) {
        //     console.log(response, "getdrivervehicle Response")
        //     var x = response.data.data;

        //     that.setState({
        //         vehicleOwnerName: x.vehicleOwner.name,
        //         vehicleOwnerId: x.vehicleOwner.nationalIdNo,
        //         vehicleOwnerPNumber: x.vehicleOwner.phoneNumber,
        //         vehicleType: x.vehicletype,
        //         vehicleDateofMake: x.model,
        //         vehicleMake: x.make,
        //         vehicleLabel: x.label,
        //         vehicleShaseeh: x.shaseehNo,
        //         vehicleMotor: x.motorNo,

        //     })

        // }).catch(function (error) {
        //     alert(error.message);
        //     console.log(error)
        // })

        // {this.state.yaaay.bind(this)}


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
        this.setState({
            [type]: value,
            Day: value
        });
        //  artistID = value.value;
        if (value) {
            dayID = value.value;
        } else {
            dayID = "";
        }
        this.handleBirthday()
        console.log(value);
        console.log(dayID);
    }

    handleMonthoptions(type, value) {
        this.setState({
            [type]: value,
            Month: value
        });
        //  artistID = value.value;
        if (value) {
            monthID = value.value;
        } else {
            monthID = "";
        }
        this.handleBirthday()
        console.log(value);
        console.log(monthID);
    }

    handleYearoptions(type, value) {
        this.setState({
            [type]: value,
            Year: value
        });
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
        console.log(yearID)
        this.setState({
            birthdaydate: new Date(yearID).getTime(),
            endday: "sadjkhasdk"
        });
        console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
    }

    // handleVehicleType(event, index) {
    //     if (index === 0) {
    //         this.setState({
    //             vehicleTypee: "tricycle"
    //         })
    //         console.log("tricycle")
    //     }

    //     else if (index == 1) {
    //         this.setState({
    //             vehicleTypee: "motorcycle"
    //         })
    //         console.log("motorcycle")
    //     }

    //     else if (index === 2) {
    //         this.setState({
    //             vehicleTypee: "toktok"
    //         })
    //         console.log("toktok")
    //     }

    //     // console.log(this.state.vehicleTypee)
    // }


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










    handleDate(e) {

        console.log(this.refs.birthday.value)
    }
    handleBack(e) {
        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/DashBoard")
        e.preventDefault();
    }


    handleOnchangeTextvehicleOwnerName(event) {
        this.setState({ vehicleOwnerName: event.target.value });
    }

    handleOnchangeTextvehicleOwnerId(event) {
        this.setState({ vehicleOwnerId: event.target.value });
    }

    handleOnchangeTextvehicleOwnerPNumber(event) {
        this.setState({ Email: event.target.value });
    }

    handleOnchangeTextvehicleType(event) {
        this.setState({ vehicleType: event.target.value });
    }

    handleOnchangeTextvehicleMake(event) {
        this.setState({ vehicleMake: event.target.value });
    }

    handleOnchangeTextvehicleLabel(type, value) {
        this.setState({ 
            // vehicleLabel: event.target.value,
            [type]: value,
         });
         console.log("type: ",type," value: ",value)
    }

    handleOnchangeTextvehicleShaseeh(event) {
        this.setState({ vehicleShaseeh: event.target.value });
    }

    handleOnchangeTextvehicleMotor(event) {
        this.setState({ vehicleMotor: event.target.value });
    }


    handleSubmit(e) {
        var that = this;

        var tempVehicleOwnerName;
        var tempVehicleOwnerId;
        var tempVehicleOwnerPNumber;
        var tempVehicleType;
        var tempVehicleMake;
        var tempvehicleDateofMake;
        var tempvehicleLabel;
        var tempvehicleShaseeh;
        var tempvehicleMotor;


        let timestamp = Math.floor(this.state.birthdaydate);
        var labelvalue = this.refs.labelnum1.value + this.refs.labelnum2.value + this.refs.labelnum3.value + this.refs.labeltext.value;

        if (this.state.vehicleTypee !== null && this.state.vehicleTypee !== "") {
            tempVehicleType = this.state.vehicleTypee;
        }
        else {
            tempVehicleType = this.state.vehicleType;  //
        }

        if (this.refs.make.value) {
            tempVehicleMake = this.refs.make.value;
        }
        else {
            tempVehicleMake = this.state.vehicleMake.name;  //
        }

        if (timestamp) {
            tempvehicleDateofMake = timestamp;
        }
        else {
            tempvehicleDateofMake = this.state.vehicleDateofMake;  //
        }

        if (labelvalue !== "") {
            tempvehicleLabel = labelvalue;
        }
        else {
            tempvehicleLabel = this.state.vehicleLabel;
        }

        if (this.refs.shaseehNo.value) {
            tempvehicleShaseeh = this.refs.shaseehNo.value;
        }
        else {
            tempvehicleShaseeh = this.state.vehicleShaseeh;
        }

        if (this.refs.motorNo.value) {
            tempvehicleMotor = this.refs.motorNo.value;
        }
        else {
            tempvehicleMotor = this.state.vehicleMotor;
        }

        if (this.refs.oName.value) {
            tempVehicleOwnerName = this.refs.oName.value;
        }
        else {
            tempVehicleOwnerName = this.state.vehicleOwnerName;
        }

        if (this.refs.nID.value) {
            tempVehicleOwnerId = this.refs.nID.value;
        }
        else {
            tempVehicleOwnerId = this.state.vehicleOwnerId;
        }

        if (this.refs.OPNumber.value) {
            tempVehicleOwnerPNumber = this.refs.OPNumber.value;
        }
        else {
            tempVehicleOwnerPNumber = this.state.vehicleOwnerPNumber;
        }



        var vehicleOwner = {
            name: tempVehicleOwnerName,
            phoneNumber: tempVehicleOwnerId,
            nationalIdNo: tempVehicleOwnerPNumber
        }

        var object = {
            driver: this.state.userID,
            vehicletype: tempVehicleType,
            model: tempvehicleDateofMake,
            make: tempVehicleMake,
            label: tempvehicleLabel,
            vehicleOwner: vehicleOwner,
            shaseehNo: tempvehicleShaseeh,
            motorNo: tempvehicleMotor
        }
        var UId = this.state.userID;



        console.log()

        axios.post('/operator/adddrivervehicle', object).then(function (response) {
            console.log(response)
            ReactRouter.goTo(`/UpdateDriverPapers/${UId}`);

        }).catch(function (error) {

            console.log(error)
        })
    }


    handleChangeDisable() {
        console("fk meeeeeeeeee")
        // this.setState({disabledd: e.target.value})
        console.log("helloooooooooooooooooooooooooooooooo")
    }

    render() {




        return (


            <div>

                <div className="Navdiv">
                    <ul className="NavdivUl">
                        <li className="Header Logo"><img src="/Group 11.png" alt="Header Logo" /></li>
                        <li className="active li"><a className="active" onClick={()=>{ReactRouter.goTo('/DashBoard')}}>السائقين</a></li>
                        {/*}<li><a >رحلات</a></li>{*/}
              <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
              <li><a >دعم</a></li>
              <li><a onClick={()=>{ReactRouter.goTo('/Reports')}}>تقارير</a></li>
              <li><a onClick={()=>{ReactRouter.goTo('/Branches')}}>فروع</a></li>
              <li><a onClick={()=>{ReactRouter.goTo('/Specialists')}}>الأخصائيين</a></li>
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
                            <input type="text" className="NewCreateBigDivP" ref="oName" value={this.state.vehicleOwnerName}
                                onChange={this.handleOnchangeTextvehicleOwnerName.bind(this)} disabled={this.state.isChecked} />
                        </div>

                        <div className="Test">
                            <p className="NewCreateBigDivNewLol">رقم المالك</p>
                            <input type="text" className="NewCreateBigDivP" ref="OPNumber" value={this.state.vehicleOwnerPNumber}
                                onChange={this.handleOnchangeTextvehicleOwnerPNumber.bind(this)} disabled={this.state.isChecked} />
                        </div>

                        <div className="Test">
                            <p className="NewCreateBigDivNewLol">رقم بطاقة المالك</p>
                            <input type="text" className="NewCreateBigDivP" ref="nID" value={this.state.vehicleOwnerId}
                                onChange={this.handleOnchangeTextvehicleOwnerId.bind(this)} disabled={this.state.isChecked} />
                        </div>

                        {/*<input type="checkbox" className="checkmate" onChange={this.handleCheckboxChange.bind(this)} checked={this.state.isChecked} />*/}
                        {/*<p className="CreateBigDivNewLol" >أسم مالك المركبة</p>*/}
                        {/*<p className="CreateBigDivNewLol">رقم المالك</p>*/}
                        {/*<p className="CreateBigDivNewLol">رقم بطاقة المالك</p>*/}

                        {/*<div className="NewBOOMMM"><p className="NewCreateBigDivPIdk">هل السائق هو نفس مالك المركبة</p></div>*/}

                        {/*<input type="text" className="CreateBigDivP" ref="oName" value={this.state.vehicleOwnerName} onChange={this.handleOnchangeTextvehicleOwnerName.bind(this)} disabled={this.state.isChecked} />*/}
                        {/*<input type="text" className="CreateBigDivP" ref="OPNumber" value={this.state.vehicleOwnerPNumber} onChange={this.handleOnchangeTextvehicleOwnerPNumber.bind(this)} disabled={this.state.isChecked} />*/}
                        {/*<input type="text" className="CreateBigDivP" ref="nID" value={this.state.vehicleOwnerId} onChange={this.handleOnchangeTextvehicleOwnerId.bind(this)} disabled={this.state.isChecked} />*/}



                        {/*<div className="CreateBigDiv-right-right">
                            <input type="checkbox" className="checkmate" onChange={this.handleCheckboxChange.bind(this)} checked={this.state.isChecked} />
                            <p className="CreateBigDivNewLol" >أسم مالك المركبة</p>
                            <p className="CreateBigDivNewLol">رقم المالك</p>
                            <p className="CreateBigDivNewLol">رقم بطاقة المالك</p>
                        </div>

                        <div className="CreateBigDiv-right-left">
                            <div className="CreateBigDivPDiv">
                                <div className="BOOMMM">
                                    <p className="CreateBigDivPIdk">هل السائق هو نفس مالك المركبة</p>
                                </div>
                                <input type="text" className="CreateBigDivP" ref="oName" value={this.state.vehicleOwnerName} onChange={this.handleOnchangeTextvehicleOwnerName.bind(this)} disabled={this.state.isChecked} />
                                <input type="text" className="CreateBigDivP" ref="OPNumber" value={this.state.vehicleOwnerPNumber} onChange={this.handleOnchangeTextvehicleOwnerPNumber.bind(this)} disabled={this.state.isChecked} />
                                <input type="text" className="CreateBigDivP" ref="nID" value={this.state.vehicleOwnerId} onChange={this.handleOnchangeTextvehicleOwnerId.bind(this)} disabled={this.state.isChecked} />
                            </div>

                        </div>*/}

                    </div>




                    <div className="CreateBigDiv-leftNewNew">









                        <div className="Newnewplan">
                            <p className="NewNewCreateBigDivLol">نوع المركبة</p>
                            <div id="maincontainerLolNewNew">
                                <div className="threeNewNew" >
                                    <img src="\Group 1522.png" className={this.state.TokTokActive === "active" ? "one active" : "one"} ref="toktok" onClick={this.handleVehicleType3.bind(this)} />
                                </div>
                                <div className="fourNew">
                                    <img src="\Line 515.png" className="twoNew" />
                                </div>

                                <div className="threeNew" >
                                    <img src="\Group 1523.png" className={this.state.MotocycleActive === "active" ? "one active" : "one"} ref="motorcycle" onClick={this.handleVehicleType2.bind(this)} />
                                </div>
                                <div className="fourNew">
                                    <img src="\Line 515.png" className="twoNew" />
                                </div>
                                <div className="threeNew" >
                                    <img src="\Group 1524.png" className={this.state.TricycleActive === "active" ? "one active" : "one"} ref="tricycle" onClick={this.handleVehicleType1.bind(this)} />
                                </div>

                            </div>

                        </div>

                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">ماركة المركبة</p>
                            <input type="text" ref="make" className="NewNewCreateBigDivPTLol" value={this.state.vehicleMake} onChange={this.handleOnchangeTextvehicleMake.bind(this)} />

                        </div>

                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">رقم اللوحة</p> 
                            <div className="DivNewNewCreateBigDivPTLol123and4">
                                <div className="DivNewNewCreateBigDivPTLol121">    <input type="text" ref="labelnum1" className="NewNewCreateBigDivPTLol123" value={this.state.vehicleLabelnum1} onChange={(e) => {this.setState({vehicleLabelnum1: e.target.value})}} />  </div>
                                <div className="DivNewNewCreateBigDivPTLol122">  <input type="text" ref="labelnum2" className="NewNewCreateBigDivPTLol1236" value={this.state.vehicleLabelnum2} onChange={(e) => {this.setState({vehicleLabelnum2: e.target.value})}} />    </div>
                                <div className="DivNewNewCreateBigDivPTLol123">   <input type="text" ref="labelnum3" className="NewNewCreateBigDivPTLol1235" value={this.state.vehicleLabelnum3} onChange={(e) => {this.setState({vehicleLabelnum3: e.target.value})}} />   </div>
                                <div className="DivNewNewCreateBigDivPTLol124">   <input type="text" ref="labeltext" className="NewNewCreateBigDivPTLol1234"  value={this.state.vehicleLabeltext} onChange={(e) => {this.setState({vehicleLabeltext: e.target.value})}} />   </div>
                            </div>
                            {/* <input type="text" ref="label" className="NewNewCreateBigDivPTLol" value={this.state.vehicleLabel} onChange={this.handleOnchangeTextvehicleLabel.bind(this)} /> */}

                        </div>


                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">رقم الشاسيه</p>
                            <input type="text" ref="shaseehNo" className="NewNewCreateBigDivPTLol" value={this.state.vehicleShaseeh} onChange={this.handleOnchangeTextvehicleShaseeh.bind(this)} />

                        </div>

                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">رقم الموتور</p>
                            <input type="text" ref="motorNo" className="NewNewCreateBigDivPTLol" value={this.state.vehicleMotor} onChange={this.handleOnchangeTextvehicleMotor.bind(this)} />
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
                                            value={this.state.Year}
                                            options={this.state.startyearoptions}
                                            onChange={this.handleYearoptions.bind(this, "startyear")}
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>





                        {/*<p className="CreateBigDivLol">نوع المركبة</p>*/}
                        {/*<p className="CreateBigDivLol">الموديل</p>*/}
                        {/*<p className="CreateBigDivLol">رقم اللوحة</p>*/}
                        {/*<p className="CreateBigDivLol">تاريخ الإنتاج</p>*/}
                        {/*<p className="CreateBigDivLol">رقم الشاسيه</p>*/}
                        {/*<p className="CreateBigDivLol">رقم الموتور</p>*/}

















                        {/*<div id="maincontainerLol">
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

                        </div>*/}

                        {/*<input type="text" ref="make" className="CreateBigDivPTLol" value={this.state.vehicleMake} onChange={this.handleOnchangeTextvehicleMake.bind(this)} />*/}
                        {/*<input type="text" ref="label" className="CreateBigDivPTLol" value={this.state.vehicleLabel} onChange={this.handleOnchangeTextvehicleLabel.bind(this)} />*/}

                        {/*<div className="Options-GroupsFi">
                            <div className="OptionsOT">
                                <Select
                                    ref="startyear"
                                    placeholder="سنة"
                                    value={this.state.Year}
                                    options={this.state.startyearoptions}
                                    onChange={this.handleYearoptions.bind(this, "startyear")}
                                />
                            </div>

                            <div className="OptionsTT">
                                <Select
                                    ref="startmonth"
                                    placeholder="شهر"
                                    value={this.state.Month}
                                    options={this.state.startmonthoptions}
                                    onChange={this.handleMonthoptions.bind(this, "startmonth")}
                                />
                            </div>

                            <div className="OptionsThT">
                                <Select
                                    ref="startday"
                                    placeholder="يوم"
                                    value={this.state.Day}
                                    options={this.state.startdayoptions}
                                    onChange={this.handleDayoptions.bind(this, "startday")}
                                />
                            </div>
                        </div>*/}
                        {/*<input type="text" ref="shaseehNo" className="CreateBigDivPTLol" value={this.state.vehicleShaseeh} onChange={this.handleOnchangeTextvehicleShaseeh.bind(this)} />*/}
                        {/*<input type="text" ref="motorNo" className="CreateBigDivPTLol" value={this.state.vehicleMotor} onChange={this.handleOnchangeTextvehicleMotor.bind(this)} />*/}



















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

                            <input type="text" ref="make" className="CreateBigDivPTLol" value={this.state.vehicleMake} onChange={this.handleOnchangeTextvehicleMake.bind(this)} />
                            <input type="text" ref="label" className="CreateBigDivPTLol" value={this.state.vehicleLabel} onChange={this.handleOnchangeTextvehicleLabel.bind(this)} />

                            <div className="Options-GroupsFi">
                                <div className="OptionsOT">
                                    <Select
                                        ref="startyear"
                                        placeholder="سنة"
                                        value={this.state.Year}
                                        options={this.state.startyearoptions}
                                        onChange={this.handleYearoptions.bind(this, "startyear")}
                                    />
                                </div>

                                <div className="OptionsTT">
                                    <Select
                                        ref="startmonth"
                                        placeholder="شهر"
                                        value={this.state.Month}
                                        options={this.state.startmonthoptions}
                                        onChange={this.handleMonthoptions.bind(this, "startmonth")}
                                    />
                                </div>

                                <div className="OptionsThT">
                                    <Select
                                        ref="startday"
                                        placeholder="يوم"
                                        value={this.state.Day}
                                        options={this.state.startdayoptions}
                                        onChange={this.handleDayoptions.bind(this, "startday")}
                                    />
                                </div>
                            </div>
                            <input type="text" ref="shaseehNo" className="CreateBigDivPTLol" value={this.state.vehicleShaseeh} onChange={this.handleOnchangeTextvehicleShaseeh.bind(this)} />
                            <input type="text" ref="motorNo" className="CreateBigDivPTLol" value={this.state.vehicleMotor} onChange={this.handleOnchangeTextvehicleMotor.bind(this)} />
                        </div>*/}
                    </div>

                </div>


                <br /> <br />

                <div className="buttonTT">
                    <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
                </div>
            </div >
        );
    }
}



export default UpdateVehicle;
