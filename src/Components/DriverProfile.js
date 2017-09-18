import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment';
import Lightbox from 'react-image-lightbox';
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
class DriverProfile extends Component {

    constructor(props) {
        super(props);
        var that = this;
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
            userID: that.props.pID,
            driverId: that.props.pID,

        };
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
            unixTimestamp: "",
            birthdaydate: "",
            img: "",
            photoIndex: 0,
            isOpen: false,
            nationalIdPhotosArray: [],
            driverLicensePhotosArray: [],
            vehicleLicensePhotosArray: [],
            ownershipDocumentsPhotosArray: [],
            addressPhotosArray: [],
            criminalRecordPhotosArray: [],
            drugTestPhotosArray: [],
            contractPhotosArray: [],
            images: [],
            imgdata: new FormData()

        })
        imgStyle = {
            width: "100%"
        }
        divStyle = {
            width: "50%"
        }

        var IdArray = []
        var licenseArray = []
        var vehicleLicenseArray = []
        var ownershipDocumentsArray = []
        var addressArray = []
        var criminalRecordArray = []
        var drugTestArray = []
        var contractArray = []

        axios.get('/operator/getDriverById?' + "driverId=" + this.state.driverId).then(function (response) {
            console.log(response, "getDriverById Response")
            var y = response.data.data;
            var parser = parseInt(y.birthday)
            var birthdate = new Date(parser * 1000);
            var parser3;
            var birthdate3;
            // var parser3 = parseInt(y.driverLicense.expirationDate)
            // var birthdate3 = new Date(parser3 * 1000);
            var licenserakam;
            var licenseDate;
            if (y.driverLicense) {
                licenserakam = y.driverLicense.number;
                licenseDate = y.driverLicense.expirationDate
                parser3 = parseInt(y.driverLicense.expirationDate)
                birthdate3 = new Date(parser3 * 1000);

                that.setState({
                    driverLicenseExpDate: licenseDate,
                    driverLicenseNumber: licenserakam,
                    Year3: birthdate3.getFullYear(),
                    Month3: birthdate3.getMonth() + 1,
                    Day3: birthdate3.getDate(),
                })

            }
            that.setState({
                vehicleId: y.vehicle._id,
                driverName: y.firstName,
                driverPNumber: y.phoneNumber,
                driverEmail: y.email,
                driverPassword: y.password,
                driverBirthday: y.birthday,
                driverAddress: y.address,
                driverImg: y.picture,
                // driverLicenseExpDate: y.driverLicense.expirationDate,
                // driverLicenseNumber: y.driverLicense.number,
                driverLicenseExpDate: licenseDate,
                driverLicenseNumber: licenserakam,
                // Year3: birthdate3.getFullYear(),
                // Month3: birthdate3.getMonth() + 1,
                // Day3: birthdate3.getDate(),
                // driverEmail: x.email,
                datee: birthdate,
                Year: birthdate.getFullYear(),
                Month: birthdate.getMonth() + 1,
                Day: birthdate.getDate(),
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
                console.log(x.model, "x.model")
                var parser2 = parseInt(x.model)
                var birthdate2 = new Date(parser2 * 1000);

                that.setState({
                    vehicleType: x.vehicletype,
                    vehicleDateofMake: x.model,
                    vehicleMake: x.make,
                    vehicleLabel: x.label,
                    vehicleShaseeh: x.shaseehNo,
                    vehicleMotor: x.motorNo,

                    Year2: birthdate2.getFullYear(),
                    Month2: birthdate2.getMonth() + 1,
                    Day2: birthdate2.getDate(),



                })

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
                alert(error.message, "what");
                console.log(error.message)
            })

        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })



        axios.get('/operator/getdriverpapers?' + "driverId=" + this.state.driverId).then(function (response) {
            console.log(response, "getdriverpapers Response")
            var x = response.data.data;


            x.nationalId.forEach(function (item) {
                console.log(item.url, "item url")
                IdArray.push(item.url)
            })

            x.drivingLicense.forEach(function (item) {
                licenseArray.push(item.url)

            })

            x.vehicleLicence.forEach(function (item) {
                vehicleLicenseArray.push(item.url)

            })

            x.ownershipDocuments.forEach(function (item) {
                ownershipDocumentsArray.push(item.url)

            })

            x.address.forEach(function (item) {
                addressArray.push(item.url)

            })

            x.criminalRecord.forEach(function (item) {
                criminalRecordArray.push(item.url)

            })

            x.drugTest.forEach(function (item) {
                drugTestArray.push(item.url)

            })

            x.contract.forEach(function (item) {
                contractArray.push(item.url)

            })



            that.setState({
                nationalIdPhotosArray: IdArray,
                driverLicensePhotosArray: licenseArray,
                vehicleLicensePhotosArray: vehicleLicenseArray,
                ownershipDocumentsPhotosArray: ownershipDocumentsArray,
                addressPhotosArray: addressArray,
                criminalRecordPhotosArray: criminalRecordArray,
                drugTestPhotosArray: drugTestArray,
                contractPhotosArray: contractArray,
            })


        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })

        // that.setState({
        //     Year: this.state.datee.getFullYear(),
        //     Month: that.state.datee.getMonth(),
        //     Day: that.state.datee.getDay(),
        // })

    }



    componentDidMount() {
        var that = this;
        var itemIds = [];
        var itemIds2 = [];
        var itemIds3 = [];
        var itemIds4 = [];
        var itemIds5 = [];
        var itemIds6 = [];
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

        for (var i = 0; i < 32; i++) {
            itemIds4.push(
                {
                    value: i,
                    label: i
                }
            );
        }
        for (var i = 0; i < 13; i++) {
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

        // axios.get('/operator/getDriverById?' + "driverId=" + this.state.driverId).then(function (response) {
        //     console.log(response, "getDriverById Response")
        //     var x = response.data.data;

        //     that.setState({
        //         driverName: x.firstName,
        //         driverPNumber: x.phoneNumber,
        //         driverEmail: x.email,
        //         driverPassword: x.password,
        //         driverBirthday: x.birthday,
        //         driverAddress: x.address,
        //         // driverEmail: x.email,

        //     })

        // }).catch(function (error) {
        //     alert(error.message);
        //     console.log(error)
        // })




        console.log(itemIds)
        var x = itemIds3 + 10
        this.setState({
            startdayoptions: itemIds,
            startmonthoptions: itemIds2,
            startyearoptions: itemIds3,
            enddayoptions: itemIds4,
            endmonthoptions: itemIds5,
            endyearoptions: itemIds6,
            // Year: this.state.datee.getFullYear(),
            // Month: this.state.datee.getMonth(),
            // Day: this.state.datee.getDay(),
        })

    }




    static defaultProps = {


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




    // handleSubmit(e) {
    //     var that = this;
    //     { this.handleBirthday() }

    //     console.log("asdasd");
    //     // if (this.refs.email.value === '' || this.refs.password.value === '' || this.refs.Fname.value === '' || this.refs.Lname.value === '') {
    //     if (false) {
    //         alert('Something is missing');

    //     }
    //     else {
    //         this.state.unixTimestamp = new Date().getTime();
    //         console.log(this.state.birthdaydate, "asdafasdfasdgfasdfjkahsdflkasjnfkl")
    //         let timestampp = Math.floor(this.state.birthdaydate / 1000);
    //         let timestamppE = Math.floor(this.state.birthdaydate / 1000);
    //         var Form = this.state.imgdata;

    //         var vehicleLicence = {
    //             number: this.refs.driverLicenseNumber.value,
    //             expirationDate: timestamppE
    //         }
    //         const data = new FormData();
    //         data.append('picture', this.state.img)
    //         data.append('action', 'ADD');
    //         data.append('param', 0);
    //         data.append('firstName', this.refs.Fname.value)
    //         data.append('address', this.refs.address.value)
    //         data.append('password', this.refs.password.value)
    //         data.append('phoneNumber', this.refs.pNumber.value)
    //         data.append('birthday', timestampp)
    //         if (this.refs.email.value === "" || this.refs.email.value === null) {
    //             // data.append('email', null)
    //         }
    //         else {
    //             data.append('email', this.refs.email.value)
    //         }

    //         data.append('driverLicense', vehicleLicence)

    //         for (var pair of data.entries()) {
    //             console.log(pair)
    //         }
    //         axios.post('/operator/adddriver', data).then(function (response) {
    //             console.log(response)
    //             var ID = response.data.data._id;
    //             console.log(ID)
    //             var ObjectID = {
    //                 ID: ID
    //             }
    //             ReactRouter.goTo(`/AddVehicle/${ID}`);
    //         }).catch(function (error) {
    //             alert(error.message);
    //             console.log(error)
    //         })
    //     }








    //     e.preventDefault();
    // }




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
        console.log(this.state.datee, "birthdate")
        console.log(this.state.Year, "Year")
        console.log(this.state.Month, "Month")
        console.log(this.state.Day, "Day")
        return (
            <div>

                <div className="Navdiv">
                    <ul className="NavdivUl">
                        <li className="Header Logo"><img src="/Group 11.png" alt="Header Logo" /></li>
                        <li className="active li" ><a className="active" onClick={this.handleDrivers.bind(this)} >السائقين</a></li>
                        {/*<li className="active li"><a className="active" href="#home">السائقين</a></li>*/}
                        <li><a href="#news">رحلات</a></li>
                        <li><a href="#contact" onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
                        <li><a href="#about">دعم</a></li>
                        <li><a >تقارير</a></li>
                        <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
                    </ul>
                </div>
                <br />


                {/*<div className="custom-file-upload-inner-div-right-Driver">*/}
                <div className="what">
                    <div className="boomboom">
                        <div className="whatwhat">
                            <label className="whatsup">
                                <img src={this.state.driverImg} className="dudeHello" />
                            </label>
                        </div >
                        <div className="duuuude">
                            <p className="dudeP">بيانات شخصية</p>
                        </div>
                    </div>

                </div>
                {/*</div>*/}
                <br />
                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">

                        <div className="CreateBigDiv-right-right">
                            <div className="custom-file-upload-inner-div-right-Driver">
                                <div className="custom-file-upload-inner-div">

                                </div>
                                <div className="Driver-Right-Right-P">
                                    <p className="CreateBigDiv">الإسم</p>
                                    <p className="CreateBigDiv">رقم الهاتف</p>
                                    <p className="CreateBigDiv">البريد الإلكتروني</p>
                                </div>

                                {/*<p className="CreateBigDiv">كلمة المرور</p>*/}
                            </div>
                        </div>
                        <div className="CreateBigDiv-right-left">
                            <div className="CreateBigDivPDiv">
                                <input type="text" className="DriverProfileText" ref="Fname" value={this.state.driverName} />
                                <input type="text" className="DriverProfileText" ref="pNumber" value={this.state.driverPNumber} />
                                <input type="email" className="DriverProfileText" ref="email" value={this.state.driverEmail} />
                                {/*<input type="password" className="CreateBigDivP" ref="password" />*/}
                            </div>

                        </div>

                    </div>

                    <div className="CreateBigDiv-left-what">

                        <div className="CreateBigDiv-left-rightNewwwww">
                            {/*<p className="CreateBigDiv">صورة شخصية</p>*/}
                            <p className="CreateBigDivLeftNewNewNewNewNew">تاريخ الميلاد</p>
                            <p className="CreateBigDivLeftNewNewNewNewNew">العنوان</p>
                            <p className="CreateBigDivLeftNewNewNewNewNew">رقم رخصة السائق</p>
                            <p className="CreateBigDivLeftNewNewNewNewNew">تاريخ إنتهاء الرخصة</p>
                        </div>

                        <div className="CreateBigDiv-left-leftLolLol">

                            <div className="Options-GroupsT">
                                <div className="OptionsOT">
                                    <input type="text" value={this.state.Year} className="x" />
                                </div>

                                <div className="OptionsTT">
                                    <input type="text" value={this.state.Month} className="x" />
                                </div>

                                <div className="OptionsThT">
                                    <input type="text" value={this.state.Day} className="x" />
                                </div>
                            </div>
                            <input type="text" ref="address" className="DriverProfileTextT" value={this.state.driverAddress} />

                            <input type="text" className="DriverProfileTextF" ref="driverLicenseNumber" value={this.state.driverLicenseNumber} required />
                            <div className="Options-GroupsF">
                                <div className="OptionsOT">
                                    <input type="text" value=" hello" value={this.state.Year3} className="x" />
                                </div>

                                <div className="OptionsTT">
                                    <input type="text" value=" hello" value={this.state.Month3} className="x" />
                                </div>

                                <div className="OptionsThT">
                                    <input type="text" value=" hello" value={this.state.Day3} className="x" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>














                <div className="dunno">
                    {/*<img src="\Line 515.png" className="lol" />*/}
                </div>
                {/*<br /><br />*/}




















                <div className="supman">
                    <p className="supP" >بيانات المركبة</p>
                </div>


                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">

                        <div className="CreateBigDiv-right-right">

                            {/*<input type="checkbox" />*/}
                            <p className="CreateBigDivNew">أسم مالك المركبة</p>
                            <p className="CreateBigDivNew">رقم المالك</p>
                            <p className="CreateBigDivNew">رقم بطاقة المالك</p>
                        </div>

                        <div className="CreateBigDiv-right-left">
                            <div className="CreateBigDivPDiv">
                                {/*<div className="BOOMMM">
                                    <p className="CreateBigDivP">هل السائق هو نفس مالك المركبة</p>
                                </div>*/}
                                <input type="text" className="CreateBigDivP" ref="oName" value={this.state.vehicleOwnerName} />
                                <input type="text" className="CreateBigDivP" ref="OPNumber" value={this.state.vehicleOwnerPNumber} />
                                <input type="text" className="CreateBigDivP" ref="nID" value={this.state.vehicleOwnerId} />
                            </div>

                        </div>

                    </div>

                    <div className="CreateBigDiv-leftLol">

                        <div className="CreateBigDiv-left-rightLol">
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
                                    <img src="\Group 1524.png" className={this.state.TricycleActive == "active" ? "one active" : "one"} ref="tricycle" />
                                </div>
                                <div className="four">
                                    <img src="\Line 515.png" className="two" />
                                </div>

                                <div className="three" >
                                    <img src="\Group 1523.png" className={this.state.MotocycleActive == "active" ? "one active" : "one"} ref="motorcycle" />
                                </div>
                                <div className="four">
                                    <img src="\Line 515.png" className="two" />
                                </div>

                                <div className="three" >
                                    <img src="\Group 1522.png" className={this.state.TokTokActive == "active" ? "one active" : "one"} ref="toktok" />
                                </div>

                            </div>



                            <input type="text" ref="make" className="CreateBigDivPTLol" value={this.state.vehicleMake} />
                            <input type="text" ref="label" className="CreateBigDivPTLol" value={this.state.vehicleLabel} />
                            <div className="Options-GroupsFi">
                                <div className="OptionsOT">
                                    {/*<Select
                                        ref="startyear"
                                        placeholder="سنة"
                                        value={this.state.startyear}
                                        options={this.state.startyearoptions}
                                        onChange={this.handleYearoptions.bind(this, "startyear")}
                                    />*/}
                                    <input type="text" value={this.state.Year2} className="x" />
                                </div>

                                <div className="OptionsTT">
                                    {/*<Select
                                        ref="startmonth"
                                        placeholder="شهر"
                                        value={this.state.startmonth}
                                        options={this.state.startmonthoptions}
                                        onChange={this.handleMonthoptions.bind(this, "startmonth")}
                                    />*/}
                                    <input type="text" value={this.state.Month2} className="x" />
                                </div>

                                <div className="OptionsThT">
                                    {/*<Select
                                        ref="startday"
                                        placeholder="يوم"
                                        value={this.state.startday}
                                        options={this.state.startdayoptions}
                                        onChange={this.handleDayoptions.bind(this, "startday")}
                                    />*/}
                                    <input type="text" value={this.state.Day2} className="x" />
                                </div>
                            </div>
                            <input type="text" ref="shaseehNo" className="CreateBigDivPTLol" value={this.state.vehicleShaseeh} />
                            <input type="text" ref="motorNo" className="CreateBigDivPTLol" value={this.state.vehicleMotor} />

                            {/*that.setState({
                    vehicleOwnerName: x.vehicleOwner.name,
                    vehicleOwnerId: x.vehicleOwner.nationalIdNo,
                    vehicleOwnerPNumber: x.vehicleOwner.phoneNumber,

                }) 
                }
                that.setState({
                    vehicleType: x.vehicletype,
                    vehicleDateofMake: x.model,
                    vehicleMake: x.make,
                    vehicleLabel: x.label,
                    vehicleShaseeh: x.shaseehNo,
                    vehicleMotor: x.motorNo,

                })*/}
                        </div>
                    </div>

                </div>




                <div className="dunno">
                    {/*<img src="\Line 515.png" className="lol" />*/}
                </div>

                <div className="supman">
                    <p className="supP" >صور مستندات و أوراق</p>
                </div>















                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">
                        <div className="CreateBigDiv-right-right">
                            <p className="CreateBigDivPapersTotallyNew">بطاقة السائق</p>
                            <p className="CreateBigDivPapersTotallyNew">رخصة السائق</p>
                            <p className="CreateBigDivPapersTotallyNew">رخصة المركبة</p>
                            <p className="CreateBigDivPapersTotallyNew">مستندات التمليك</p>
                        </div>
                        <div className="CreateBigDiv-right-left">
                            <div className="upload-button-div">
                                <img src="/Group 1569.png" className="browser" onClick={() => this.setState({ isOpen: true, images: this.state.nationalIdPhotosArray })} />
                                {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.aoo.bind(this)} multiple="multiple" />*/}
                                {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork"/>
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>*/}
                            </div>

                            <div className="upload-button-div">
                                <img src="/Group 1569.png" className="browser" onClick={() => this.setState({ isOpen: true, images: this.state.driverLicensePhotosArray })} />
                                {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork" />
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>*/}

                            </div>

                            <div className="upload-button-div">
                                <img src="/Group 1569.png" className="browser" onClick={() => this.setState({ isOpen: true, images: this.state.vehicleLicensePhotosArray })} />
                                {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork" />
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>*/}
                            </div>

                            <div className="upload-button-div">
                                <img src="/Group 1569.png" className="browser" onClick={() => this.setState({ isOpen: true, images: this.state.ownershipDocumentsPhotosArray })} />
                                {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork"  />
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>*/}
                            </div>
                        </div>
                    </div>

                    <div className="CreateBigDiv-left">
                        <div className="CreateBigDiv-left-rightNewwwww2">
                            <p className="CreateBigDivPapersLolBoom">صورة العنوان</p>
                            <p className="CreateBigDivPapersLolBoom">فيش و تشبيه</p>
                            <p className="CreateBigDivPapersLolBoom">تحليل مخدرات</p>
                            <p className="CreateBigDivPapersLolBoom">عقد شراكة</p>
                        </div>
                        <div className="CreateBigDiv-left-leftLolLolNew">
                            <div className="upload-button-divLol">
                                <img src="/Group 1569.png" className="browserLolTotallyNew" onClick={() => this.setState({ isOpen: true, images: this.state.addressPhotosArray })} />
                                {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork" />
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>*/}
                            </div>

                            <div className="upload-button-divLol">
                                <img src="/Group 1569.png" className="browserLolTotallyNew" onClick={() => this.setState({ isOpen: true, images: this.state.criminalRecordPhotosArray })} />
                                {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork"/>
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>*/}
                            </div>

                            <div className="upload-button-divLol">
                                <img src="/Group 1569.png" className="browserLolTotallyNew" onClick={() => this.setState({ isOpen: true, images: this.state.drugTestPhotosArray })} />
                                {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork" />
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>*/}
                            </div>

                            <div className="upload-button-divLol">
                                <img src="/Group 1569.png" className="browserLolTotallyNew" onClick={() => this.setState({ isOpen: true, images: this.state.contractPhotosArray })} />
                                {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork" />
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>*/}
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    {this.state.isOpen &&
                        <Lightbox

                            mainSrc={this.state.images[this.state.photoIndex]}
                            nextSrc={this.state.images[(this.state.photoIndex + 1) % this.state.images.length]}
                            prevSrc={this.state.images[(this.state.photoIndex + this.state.images.length - 1) % this.state.images.length]}

                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() => this.setState({
                                photoIndex: (this.state.photoIndex + this.state.images.length - 1) % this.state.images.length,
                            })}
                            onMoveNextRequest={() => this.setState({
                                photoIndex: (this.state.photoIndex + 1) % this.state.images.length,
                            })}
                        />
                    }
                </div>





                <br /> <br />
            </div>
        );
    }
}

export default DriverProfile;
