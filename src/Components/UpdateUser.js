import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
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
class UpdateUser extends Component {

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
            Name: "",
            PNumber: "",
            Email: "",
            Password: "",
            Address: "",
            LNumber: "",
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
            birthdaydate: "",
            img: "",
            imgdata: new FormData(),
            blur: "",
            loginErrorModal: false,
            missingRequiredFields: "",

        })

        axios.get('/api/operator/getDriverById?' + "driverId=" + this.state.driverId).then(function (response) {
            console.log(response, "getDriverById Response")
            var x = response.data.data;


            //  driverBirthday : new Date(parseInt(x.birthday))
            //     Year : driverBirthday.getFullYear(),
            //     Month : driverBirthday.getMonth() + 1,
            //     Day : driverBirthday.getDate()
            var parser = parseInt(x.birthday)

            var birthdate = new Date(parser * 1000);
            var licenseNumber;
            var LicenseExpDate;
            var parserExp;
            if (x.driverLicense) {
                licenseNumber = x.driverLicense.number;
                // LicenseExpDate = x.driverLicense.expirationDate;
                console.log(x.driverLicense.expirationDate)
                parserExp = parseInt(JSON.parse(x.driverLicense).expirationDate)
                LicenseExpDate = new Date(parserExp * 1000);
                console.log("hello world")
                console.log(LicenseExpDate)
                console.log(x.driverLicense.expirationDate)
                that.setState({
                    driverLicenseExpDate: x.driverLicense,
                    Year2: LicenseExpDate.getFullYear(),
                    Month2: LicenseExpDate.getMonth() + 1,
                    Day2: LicenseExpDate.getDate(),
                })
            }
            console.log(birthdate, "birthdate")
            that.setState({
                driverBirthday: x.birthday,
                Year: birthdate.getFullYear(),
                Month: birthdate.getMonth() + 1,
                Day: birthdate.getDate(),
                Name: x.firstName,
                PNumber: x.phoneNumber,
                Email: x.email,
                Password: x.password,
                Address: x.address,
            })
            if (x.picture) {
                that.setState({
                    driverPicture: x.picture
                })
            }
            else {
                console.log("wtf man wtf")
                that.setState({
                    driverPicture: "/Group 1548.png"
                })
            }
            // if (x.driverLicense) {
            //     that.setState({
            //         DriverLicense: x.driverLicense,
            //         // driverLicenseNo: x.driverLicense.number,
            //         LNumber: x.driverLicense.number,
            //         driverLicenseExpDate: x.driverLicense.expirationDate,
            //     })
            // }
        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })
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

    static defaultProps = {


    }


    openModal(type) {
        console.log(type);
        !isNaN(this.refs.pNumber.value)
        var missingfields = "";
        console.log(this.refs.Fname.value, "this.refs.Fname.value  ", this.refs.pNumber.value, "this.refs.pNumber.value  ", this.refs.password.value, "this.refs.password.value")

        if (!this.refs.Fname.value && !this.refs.pNumber.value && !this.refs.password.value) {
            missingfields = "Name, Phonenumber and Passowrd are missing"
            console.log("Name, Phonenumber and Passowrd are missing")
        }
        else if (!this.refs.Fname.value && !this.refs.pNumber.value) {
            missingfields = "Name and Phonenumber are missing"
            console.log("Name and Phonenumber are missing")
        }

        else if (!this.refs.Fname.value && !this.refs.password.value) {
            missingfields = "Name and Passowrd are missing"
            console.log("Name and Passowrd are missing")
        }
        else if (!this.refs.pNumber.value && !this.refs.password.value) {
            missingfields = "Phonenumber and Passowrd are missing"
            console.log("Phonenumber and Passowrd are missing")
        }
        else if (!this.refs.Fname.value) {
            missingfields = "Name is missing"
            console.log("Name is missing")
        }
        else if (!this.refs.pNumber.value) {
            missingfields = "Phonenumber is missing"
            console.log("Phonenumber is missing")
        }
        else if (!this.refs.password.value) {
            missingfields = "Password is missing"
            console.log("Password is missing")
        }



        if (this.refs.pNumber.value) {
            console.log(" this.refs.pNumber.value exist")
            if (isNaN(this.refs.pNumber.value) || this.refs.pNumber.value.length !== 11) {
                console.log(isNaN(this.refs.pNumber.value))
                missingfields = missingfields + " Phonenumber is wrong"
                console.log(" Phonenumber is wrong 2")
                console.log(!isNaN(this.refs.pNumber.value), "!isNaN(this.refs.pNumber.value)")
                console.log(this.refs.pNumber.value.length, "this.refs.pNumber.value.length)")
                console.log(Number(this.refs.pNumber.value.length) !== 11, "this.refs.pNumber.value.length !== 11")
            }
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



    handleDayoptions(type, value) {
        this.setState({
            [type]: value,
            Day: value
        });
        if (value) {
            dayID = value.value;
        } else {
            dayID = "";
        }

        console.log(value);
        console.log(dayID);
    }

    handleMonthoptions(type, value) {
        this.setState({
            [type]: value,
            Month: value
        });
        if (value) {
            monthID = value.value;
        } else {
            monthID = "";
        }

        console.log(value);
        console.log(monthID);
    }

    handleYearoptions(type, value) {
        this.setState({
            [type]: value,
            Year: value
        });
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
        console.log(yearID, monthID, dayID)
        this.setState({
            birthdaydate: new Date(yearID + 1, monthID - 1, dayID).getTime(),
            birthdaydateE: new Date(yearIDE + 1, monthIDE - 1, dayIDE).getTime(),
        });
        console.log(new Date(yearID, monthID + 1, dayID).getTime(), "new Date(yearID, monthID + 1, dayID).getTime()")
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


    handleDayoptionsE(type, value) {
        this.setState({
            [type]: value,
            Day2: value
        });
        if (value) {
            dayIDE = value.value;
        } else {
            dayIDE = "";
        }

        console.log(value);
        console.log(dayIDE);
    }

    handleMonthoptionsE(type, value) {
        this.setState({
            [type]: value,
            Month2: value
        });
        if (value) {
            monthIDE = value.value;
        } else {
            monthIDE = "";
        }

        console.log(value);
        console.log(monthIDE);
    }

    handleYearoptionsE(type, value) {
        this.setState({
            [type]: value,
            Year2: value
        });
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



    handleOnchangeTextName(event) {
        this.setState({ Name: event.target.value });
    }

    handleOnchangeTextPNumber(event) {
        this.setState({ PNumber: event.target.value });
    }

    handleOnchangeTextEmail(event) {
        this.setState({ Email: event.target.value });
    }

    handleOnchangeTextPword(event) {
        this.setState({ Password: event.target.value });
    }

    handleOnchangeTextAddress(event) {
        this.setState({ Address: event.target.value });
    }

    handleOnchangeTextLNumber(event) {
        this.setState({ LNumber: event.target.value });
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
            // console.log(this.state.birthdaydate, "asdafasdfasdgfasdfjkahsdflkasjnfkl")
















            //        if (this.refs.songname.value) {
            //     if (this.refs.albums.value) {
            //         if (imgpost) {
            //             if (artistID) {
            //                 var track = {
            //                     name: this.refs.songname.value,             //1
            //                     album: this.refs.albums.value,           //2
            //                     picture: imgpost,
            //                     artist: artistID,
            //                     genres: genrez,
            //                     hash: hashz,
            //                     Tags: tagz,
            //                     path: tracka,
            //                     fullSongPath: tracka,
            //                     source: "offline",
            //                     songType: songtyp,
            //                 }
            //             }
            //             else {
            //                 alert("Artist is missing");
            //             }
            //         }
            //         else {
            //             alert("Picture is missing");
            //         }
            //     }
            //     else {
            //         alert("Album is missing");
            //     }
            // }
            // else {
            //     alert("Label is missing");
            // }











            var templicensenumber;
            var templicenseexpdate;
            if (this.state.birthdaydate) {
                var timestampp = Math.floor(this.state.birthdaydate / 1000);
            }
            if (this.state.birthdaydateE) {
                var timestamppE = Math.floor(this.state.birthdaydateE / 1000);
            }


            console.log(this.state.driverBirthday, "driverbirthday")
            console.log(timestampp, "timestampp")

            const data = new FormData();
            data.append('action', 'ADD');
            data.append('param', 0);
            data.append('driverId', this.state.driverId);

            if (this.state.img) {
                data.append('picture', this.state.img)
            }
            else {
                data.append('picture', this.state.driverPicture)
            }

            if (this.refs.Fname.value) {
                data.append('firstName', this.refs.Fname.value)
            }
            else {
                // data.append('firstName', this.state.driverName)
                data.append('firstName', this.state.Name)
            }

            if (this.refs.address.value) {
                data.append('address', this.refs.address.value)
            }
            else {
                // data.append('address', this.state.driverAddress)
                data.append('address', this.state.Address)
            }

            if (this.refs.pNumber.value) {
                data.append('phoneNumber', this.refs.pNumber.value)
            }
            else {
                // data.append('phoneNumber', this.state.driverPNumber)
                data.append('phoneNumber', this.state.PNumber)
            }

            if (this.refs.password.value) {
                data.append('password', this.refs.password.value)
            }
            else {
                // data.append('password', this.state.driverPassword)
                data.append('password', this.state.Password)
            }

            if (timestampp) {
                data.append('birthday', timestampp)
            }
            else {
                data.append('birthday', this.state.driverBirthday)
            }

            if (this.refs.email.value === "" || this.refs.email.value === null) {
                // data.append('email', null)
            }
            else if (this.refs.email.value) {
                data.append('email', this.refs.email.value)
            }
            else {
                // data.append('email', this.state.driverEmail.value)
                data.append('email', this.state.Email.value)
            }


            if (timestamppE) {
                templicenseexpdate = timestamppE;
            }
            else {
                templicenseexpdate = this.state.driverLicenseExpDate;
            }

            if (this.refs.driverLicenseNumber.value) {
                templicensenumber = this.refs.driverLicenseNumber.value;
            }
            else {
                // templicensenumber = that.state.driverLicenseNo;
                templicensenumber = this.state.LNumber;
            }


            var driverLicense = {
                number: templicensenumber,
                expirationDate: templicenseexpdate
            }
            console.log(driverLicense, "driverLicense")
            if (driverLicense) {
                // data.append('driverLicense', JSON.stringify(driverLicense))
                data.append('driverLicense', JSON.stringify(driverLicense))
            }
            else {

            }


            for (var pair of data.entries()) {
                // console.log(pair)
            }
            axios.post('/api/operator/updatedriver', data).then(function (response) {
                console.log(response)
                var ID = response.data.data._id;
                console.log(ID, "Id in post method")
                var ObjectID = {
                    ID: ID
                }
                ReactRouter.goTo(`/UpdateVehicle/${that.state.driverId}`);
            }).catch(function (error) {
                alert(error.message);
                console.log(error)
            })
        }
        // e.preventDefault();
    }



    render() {
        // console.log(this.state.birthdaydate, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
        console.log(this.state.Day, "this.state.Day  ", this.state.Month, "this.state.Month    ", this.state.Year, "this.state.Year  ")
        console.log(this.state.Day2, "this.state.Day2  ", this.state.Month2, "this.state.Month2    ", this.state.Year2, "this.state.Year2  ")


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
                        <li className="active li" ><a className="active" onClick={this.handleDrivers.bind(this)} >السائقين</a></li>
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
                        <li className="active li Sub" ><a className="active selected" >&lt; بيانات شخصية</a> </li>
                        <li className="active li Sub" ><a>&lt; بيانات المركبة</a></li>
                        <li><a href="#news">صور مستندات و أوراق</a></li>
                    </ul>
                </div>

                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">

                        <div className="CreateBigDiv-right-right7aram">
                            <p className="CreateBigDiv7aram">الإسم</p>
                            <p className="CreateBigDiv7aram">رقم الهاتف</p>
                            <p className="CreateBigDiv7aram">البريد الإلكتروني</p>
                            <p className="CreateBigDiv7aram">كلمة المرور</p>
                        </div>

                        <div className="CreateBigDiv-right-left">
                            <div className="CreateBigDivPDiv">
                                <input type="text" className="DriverProfileText" ref="Fname" required value={this.state.Name} onChange={this.handleOnchangeTextName.bind(this)} />
                                <input type="text" className="DriverProfileText" ref="pNumber" required value={this.state.PNumber} onChange={this.handleOnchangeTextPNumber.bind(this)} />
                                <input type="email" className="DriverProfileText" ref="email" value={this.state.Email} onChange={this.handleOnchangeTextEmail.bind(this)} />
                                <input type="password" className="DriverProfileText" ref="password" required value={this.state.Password} onChange={this.handleOnchangeTextPword.bind(this)} />
                            </div>

                        </div>

                    </div>

                    <div className="CreateBigDiv-left-what">

                        <div className="CreateBigDiv-left-right">
                            <p className="CreateBigDivLeft">صورة شخصية</p>
                            <p className="CreateBigDivLeft">تاريخ الميلاد</p>
                            <p className="CreateBigDivLeft">العنوان</p>
                            <p className="CreateBigDivLeft">رقم رخصة السائق</p>
                            <p className="CreateBigDivLeft">تاريخ إنتهاء الرخصة</p>
                        </div>

                        <div className="CreateBigDiv-left-leftLolLol">
                            <div className="custom-file-upload-inner-divLol">
                                <div className="custom-file-upload-inner-div-right">
                                    <label className="custom-file-upload">
                                        <input type="file" onChange={this.voo.bind(this)} />
                                        <img src={this.state.driverPicture} className="custom-file-upload-img" />
                                    </label>
                                </div >
                                <div className="custom-file-upload-inner-div-left">
                                    <p>اضغط لتغير الصورة الشخصية</p>
                                </div>
                            </div>

                            <div className="Options-GroupsT">
                                <div className="OptionsOT">
                                    <Select
                                        ref="startyear"
                                        placeholder="سنة"
                                        className="menu-outer-top"
                                        value={this.state.Year}
                                        options={this.state.startyearoptions}
                                        onChange={this.handleYearoptions.bind(this, "startyear")}
                                    />
                                </div>

                                <div className="OptionsTT">
                                    <Select
                                        ref="startmonth"
                                        placeholder="شهر"
                                        className="menu-outer-top"
                                        value={this.state.Month}
                                        options={this.state.startmonthoptions}
                                        onChange={this.handleMonthoptions.bind(this, "startmonth")}
                                    />
                                </div>

                                <div className="OptionsThT">
                                    <Select
                                        ref="startday"
                                        placeholder="يوم"
                                        className="menu-outer-top"
                                        value={this.state.Day}
                                        options={this.state.startdayoptions}
                                        onChange={this.handleDayoptions.bind(this, "startday")}
                                    />
                                </div>
                            </div>
                            <input type="text" ref="address" className="CreateBigDivPTTT" value={this.state.Address} onChange={this.handleOnchangeTextAddress.bind(this)} />


                            {/*that.setState({
                driverName: x.firstName,
                driverPNumber: x.phoneNumber,
                driverEmail: x.email,
                driverPassword: x.password,
                driverBirthday: x.birthday,
                driverAddress: x.address,
                driverPicture: x.picture,
            })
            if (x.driverLicense) {
                that.setState({
                    DriverLicense: x.driverLicense,
                    driverLicenseNo: x.driverLicense.number,
                    driverLicenseExpDate: x.driverLicense.expirationDate,
                })*/}



                            <input type="text" className="CreateBigDivPTTTT" ref="driverLicenseNumber" required value={this.state.LNumber} onChange={this.handleOnchangeTextLNumber.bind(this)} />
                            <div className="Options-GroupsTTTT">
                                <div className="OptionsOT">
                                    <Select
                                        ref="endyear"
                                        placeholder="سنة"
                                        className="menu-outer-top"
                                        value={this.state.Year2}
                                        options={this.state.endyearoptions}
                                        onChange={this.handleYearoptionsE.bind(this, "endyear")}
                                    />
                                </div>

                                <div className="OptionsTT">
                                    <Select
                                        ref="endmonth"
                                        placeholder="شهر"
                                        className="menu-outer-top"
                                        value={this.state.Month2}
                                        options={this.state.endmonthoptions}
                                        onChange={this.handleMonthoptionsE.bind(this, "endmonth")}
                                    />
                                </div>

                                <div className="OptionsThT">
                                    <Select
                                        ref="endday"
                                        placeholder="يوم"
                                        className="menu-outer-top"
                                        value={this.state.Day2}
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
                    <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.openModal.bind(this, "loginErrorModal")} />
                </div>
            </div>
        );
    }
}

export default UpdateUser;
