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
            SpecialistsOptions: [],
            Specialists: [],
            Specialist: "",
            AllSpecialists: [],
            branchesOptions: [],
            Branch: "",
            AllBranches: [],
            currentBranch: null,
            CurrentSpecialist: null,
            driverPicture: "/Group 1548.png"
        })
        // this.getSpecialistsAPI();
        // this.getBranchesAPI();
        var allbranchesOptions = [];
        var branchesoptions2 = [];
        axios.get('/operator/getAllBranches').then(function (response) {
            // console.log(response, "getAllBranches Response")
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
                // console.log(item)
            })
            branchesoptions2 = objects
            that.setState({
                branchesOptions: allbranchesOptions,
                AllBranches: objects
            })

            var SpecialistsList = []
            var allSpecialistsOptions = [];
            axios.get('/operator/getAllSpecialists').then(function (response) {
                // console.log(response.data, "getAllSpecialists Response")
                var z = response.data.data;
                // console.log(x, "x")
                var objects = [];
                z.forEach(function (item, index) {
                    // console.log(item)
                    objects.push(item)
                    allSpecialistsOptions.push(
                        {
                            value: item._id,
                            label: item.firstName
                        })
                    // console.log(item)
                })
                SpecialistsList = objects
                that.setState({
                    Specialists: allSpecialistsOptions,
                    AllSpecialists: objects
                })

                axios.get('/operator/getDriverById?' + "driverId=" + that.state.driverId).then(function (response) {
                    console.log(response, "getDriverById Response")
                    var y = response.data.data;


                    //  driverBirthday : new Date(parseInt(x.birthday))
                    //     Year : driverBirthday.getFullYear(),
                    //     Month : driverBirthday.getMonth() + 1,
                    //     Day : driverBirthday.getDate()
                    var parser = parseInt(y.birthday)

                    var birthdate = new Date(parser);
                    var driverlicensex;
                    var licenseNumber;
                    var LicenseExpDate;
                    var parserExp;
                    if (y.driverLicense) {
                        // console.log(JSON.parse(y.driverLicense),"driverlicense")
                        // driverlicensex = JSON.parse(y.driverLicense);
                        driverlicensex = y.driverLicense;
                        licenseNumber = driverlicensex.number;
                        // LicenseExpDate = x.driverLicense.expirationDate;
                        // console.log(x.driverLicense.expirationDate)
                        // parserExp = parseInt(JSON.parse(x.driverLicense).expirationDate)
                        parserExp = parseInt(driverlicensex.expirationDate)
                        LicenseExpDate = new Date(parserExp);
                        // console.log("hello world")
                        // console.log(LicenseExpDate)
                        // console.log(x.driverLicense.expirationDate)
                        that.setState({
                            driverLicenseExpDate: driverlicensex,
                            LNumber: licenseNumber,
                            Year2: LicenseExpDate.getFullYear(),
                            Month2: LicenseExpDate.getMonth() + 1,
                            Day2: LicenseExpDate.getDate(),
                            birthdaydateE: new Date(LicenseExpDate.getFullYear(), LicenseExpDate.getMonth() + 1, LicenseExpDate.getDate()).getTime()
                        })
                        if (y.operator) {
                            var opID = y.operator;

                            // console.log(opID, "opID")
                            // console.log("hello")
                            // console.log(SpecialistsList)
                            SpecialistsList.forEach(function (item, index) {
                                if (item.branch) {
                                    var res = item._id.toString();
                                    // console.log(res,"res")
                                    // console.log(item._id,"branchId")
                                    if (opID === res) {
                                        // console.log(item, "item")
                                        // console.log(item.branch._id, "branchId")
                                        // console.log(item.branch.name, "branchName")
                                        // console.log(opID, "opID")
                                        that.setState({
                                            currentBranch: {
                                                value: item.branch._id,
                                                label: item.branch.name
                                            },
                                            CurrentSpecialist: {
                                                value: item._id,
                                                label: item.firstName
                                            }
                                        })
                                    }
                                }
                            })


                        }
                        // if (y.branch) {
                        //     console.log(y.branch, "x.branch")
                        //     that.setState({
                        //         Branch: y.branch
                        //     })
                        // }
                    }
                    // console.log(birthdate, "birthdate")
                    that.setState({
                        driverBirthday: y.birthday,
                        Year: birthdate.getFullYear(),
                        Month: birthdate.getMonth() + 1,
                        Day: birthdate.getDate(),
                        Name: y.firstName,
                        PNumber: y.phoneNumber,
                        Email: y.email,
                        Password: y.password,
                        Address: y.address,
                        nationalIdNo: y.nationalIdNo,
                    })
                    if (y.picture) {
                        that.setState({
                            driverPicture: y.picture
                        })
                    }
                    else {
                        that.setState({
                            driverPicture: "Group 1548.png"
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

            }).catch(function (error) {
                alert(error.message);
                console.log(error)
            })
        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })
        // axios.get('/operator/getDriverById?' + "driverId=" + this.state.driverId).then(function (response) {
        //     console.log(response, "getDriverById Response")
        //     var x = response.data.data;


        //     //  driverBirthday : new Date(parseInt(x.birthday))
        //     //     Year : driverBirthday.getFullYear(),
        //     //     Month : driverBirthday.getMonth() + 1,
        //     //     Day : driverBirthday.getDate()
        //     var parser = parseInt(x.birthday)

        //     var birthdate = new Date(parser);
        //     var licenseNumber;
        //     var LicenseExpDate;
        //     var parserExp;
        //     if (x.driverLicense) {
        //         licenseNumber = x.driverLicense.number;
        //         // LicenseExpDate = x.driverLicense.expirationDate;
        //         // console.log(x.driverLicense.expirationDate)
        //         // parserExp = parseInt(JSON.parse(x.driverLicense).expirationDate)
        //         parserExp = parseInt(x.driverLicense.expirationDate)
        //         LicenseExpDate = new Date(parserExp);
        //         // console.log("hello world")
        //         // console.log(LicenseExpDate)
        //         // console.log(x.driverLicense.expirationDate)
        //         that.setState({
        //             driverLicenseExpDate: x.driverLicense,
        //             Year2: LicenseExpDate.getFullYear(),
        //             Month2: LicenseExpDate.getMonth() + 1,
        //             Day2: LicenseExpDate.getDate(),
        //         })
        //         if (x.operator) {
        //             console.log("hello")
        //             console.log(branchesoptions2)
        //             branchesoptions2.forEach(function (item, index) {
        //                 console.log(item,"item")
        //                if(x.operator === item._id){
        //                    console.log(item,"branchName")
        //                 that.setState({
        //                     currentBranch: {
        //                         value: item._id,
        //                         label: item.firstName
        //                     }

        //                 })
        //                }
        //             })


        //         }
        //         if (x.branch) {
        //             console.log(x.branch, "x.branch")
        //             that.setState({
        //                 Branch: x.branch
        //             })
        //         }
        //     }
        //     // console.log(birthdate, "birthdate")
        //     that.setState({
        //         driverBirthday: x.birthday,
        //         Year: birthdate.getFullYear(),
        //         Month: birthdate.getMonth() + 1,
        //         Day: birthdate.getDate(),
        //         Name: x.firstName,
        //         PNumber: x.phoneNumber,
        //         Email: x.email,
        //         Password: x.password,
        //         Address: x.address,
        //     })
        //     if (x.picture) {
        //         that.setState({
        //             driverPicture: x.picture
        //         })
        //     }
        //     else {
        //         that.setState({
        //             driverPicture: "/Group 1548.png"
        //         })
        //     }
        //     // if (x.driverLicense) {
        //     //     that.setState({
        //     //         DriverLicense: x.driverLicense,
        //     //         // driverLicenseNo: x.driverLicense.number,
        //     //         LNumber: x.driverLicense.number,
        //     //         driverLicenseExpDate: x.driverLicense.expirationDate,
        //     //     })
        //     // }
        // }).catch(function (error) {
        //     alert(error.message);
        //     console.log(error)
        // })

    }

    getSpecialistsAPI() {
        var that = this;
        var allSpecialistsOptions = [];
        axios.get('/operator/getAllSpecialists').then(function (response) {
            // console.log(response.data, "getAllSpecialists Response")
            var x = response.data.data;
            // console.log(x, "x")
            var objects = [];
            x.forEach(function (item, index) {
                // console.log(item)
                objects.push(item)
                allSpecialistsOptions.push(
                    {
                        value: item._id,
                        label: item.firstName
                    })
                // console.log(item)
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
            // console.log(response, "getAllBranches Response")
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
                // console.log(item)
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
                    // console.log(item)
                }
            }
        })

        this.setState({
            SpecialistsOptions: Specialistss,
            Specialists: Specialistss

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

        // console.log(itemIds)
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
        // this.setState({
        //     // [type]: value,
        //     Day: value.value
        // });
        const _this = this;
        if (value.value < 10) {
            // dayID = '0' + value.value;
            _this.setState({
                // [type]: value,
                [type]: parseInt('0' + value.value)
            }, () => {
                _this.handleBirthday()
            });
        }
        else {
            _this.setState({
                // [type]: value,
                [type]: value.value
            }, () => {
                _this.handleBirthday()
            });
        }

        // console.log(value);
        // console.log(type);
    }


    // async handleDayoptions(type, value) {
    //     // this.setState({
    //     //     // [type]: value,
    //     //     Day: value.value
    //     // });
    //    const _this = this;
    //         if (value.value < 10) {
    //             // dayID = '0' + value.value;
    //          await   _this.setState({
    //                 // [type]: value,
    //                 [type] : parseInt('0' + value.value)
    //             }, ()=>{
    //                 _this.handleBirthday()
    //             });
    //         }
    //         else {
    //             await   _this.setState({
    //                 // [type]: value,
    //                 [type] : value.value
    //             });
    //         }
    //         _this.handleBirthday()

    //     console.log(value);
    //     console.log(type);
    // }

    handleMonthoptions(type, value) {
        // this.setState({
        //     // [type]: value,
        //     Month: value.value
        // });
        const _this = this;
        if (value.value < 10) {
            // dayID = '0' + value.value;
            _this.setState({
                // [type]: value,
                [type]: parseInt('0' + value.value)
            }, () => {
                _this.handleBirthday()
            });
        }
        else {
            _this.setState({
                // [type]: value,
                [type]: value.value
            }, () => {
                _this.handleBirthday()
            });
        }
        // console.log(value);
        // console.log(monthID);
    }

    handleYearoptions(type, value) {
        // this.setState({
        //     // [type]: value,
        //     Year: value.value
        // });
        const _this = this;

        _this.setState({
            // [type]: value,
            [type]: value.value
        }, () => {
            _this.handleBirthday()
        });

        // if (value) {
        //     yearID = value.value;
        // } else {
        //     yearID = "";
        // }
        console.log(value);
        // console.log(yearID);
    }

    handleBirthday() {
        // console.log(yearID, monthID, dayID) 
        // console.log(this.state.Year,"this.state.Year")
        // console.log(this.state.Month,"this.state.Month")
        // console.log(this.state.Day,"this.state.Day")
        this.setState({
            birthdaydate: new Date(this.state.Year, this.state.Month - 1, this.state.Day).getTime(),
            birthdaydateE: new Date(this.state.Year2, this.state.Month2 - 1, this.state.Day2).getTime(),
        });
        var x = new Date(this.state.Year, this.state.Month - 1, this.state.Day).getTime()
        //var y = new Date(monthID,dayID,yearID)
        // console.log(dayID)
        // console.log(yearID)
        // console.log(monthID)
        console.log(x, "new Date(yearID, monthID - 1, dayID).getTime()")
        //console.log(y.valueOf(), "new Date(yearID, monthID - 1, dayID).getTime()")

        // console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
    }


    voo(event) {

        var file = event.target.files[0];
        this.setState({
            img: file,
        })
    }
    handleAddV(e) {

        // console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/AddVehicle")

        e.preventDefault();
    }


    handleAddP(e) {

        // console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/AddDriverPapers")

        e.preventDefault();
    }


    handleDayoptionsE(type, value) {
        const _this = this;
        if (value.value < 10) {
            // dayID = '0' + value.value;
            _this.setState({
                // [type]: value,
                [type]: parseInt('0' + value.value)
            }, () => {
                _this.handleBirthday()
            });
        }
        else {
            _this.setState({
                // [type]: value,
                [type]: value.value
            }, () => {
                _this.handleBirthday()
            });
        }

        // this.setState({
        //     [type]: value,
        //     Day2: value
        // });
        // if (value) {
        //     if (value.value < 10) {
        //         dayIDE = '0' + value.value;
        //     }
        //     else {
        //         dayIDE = value.value;
        //     }
        // } else {
        //     dayIDE = "";
        // }
        // this.handleBirthday()
        console.log(value);
        console.log(type);
    }

    handleMonthoptionsE(type, value) {
        const _this = this;
        if (value.value < 10) {
            // dayID = '0' + value.value;
            _this.setState({
                // [type]: value,
                [type]: parseInt('0' + value.value)
            }, () => {
                _this.handleBirthday()
            });
        }
        else {
            _this.setState({
                // [type]: value,
                [type]: value.value
            }, () => {
                _this.handleBirthday()
            });
        }
        console.log(value);
        console.log(monthIDE);
    }

    handleYearoptionsE(type, value) {
        const _this = this;

        _this.setState({
            // [type]: value,
            [type]: value.value
        }, () => {
            _this.handleBirthday()
        });
        // console.log(value);
        // console.log(yearIDE);
    }

    handleDate(e) {

        // console.log(this.refs.birthday.value)
    }
    handleBack(e) {
        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/DashBoard")
        e.preventDefault();
    }
    handleDrivers(e) {

        // console.log("WoHOOOOOOOOOOOOOOOO");
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
    handleOnchangeTextNID(event) {
        this.setState({ nationalIdNo: event.target.value });
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

        // console.log("asdasd");
        // if (this.refs.email.value === '' || this.refs.password.value === '' || this.refs.Fname.value === '' || this.refs.Lname.value === '') {
        if (false) {
            alert('Something is missing');

        }
        else {
            const data = new FormData();
            data.append('action', 'ADD');
            data.append('param', 0);
            data.append('driverId', this.state.driverId);

            var templicensenumber;
            var templicenseexpdate;
            if (this.state.birthdaydate) {
                var timestampp = Math.floor(this.state.birthdaydate);
            }
            else {
                var timestampp = this.state.driverBirthday;
            }

            if (this.state.birthdaydateE) {
                var timestamppE = Math.floor(this.state.birthdaydateE);
            }
            else {
                var timestamppE = this.state.driverLicenseExpDate;
            }



            var driverLicense = {};
            if (this.state.birthdaydateE && this.state.LNumber) {
                console.log("hey")
                driverLicense = {
                    number: that.state.LNumber,
                    expirationDate: that.state.birthdaydateE
                }
                console.log(driverLicense,"drivelicense")
                data.append('driverLicense', JSON.stringify(driverLicense))
            }
            else {
                if (that.refs.driverLicenseNumber.value) {
                    driverLicense["number"] = that.state.LNumber
                    data.append('driverLicense', JSON.stringify(driverLicense))
                }
                if (that.state.birthdaydateE) {
                    driverLicense["expirationDate"] = that.state.birthdaydateE
                    data.append('driverLicense', JSON.stringify(driverLicense))
                }
            }


            // console.log(this.state.driverBirthday, "driverbirthday")
            // console.log(timestampp, "timestampp")

            // const data = new FormData();
            // data.append('action', 'ADD');
            // data.append('param', 0);
            // data.append('driverId', this.state.driverId);
            // console.log(typeof(this.state.CurrentSpecialist),"currentSpecialist")
            if (typeof (this.state.CurrentSpecialist) === "object") {
                // console.log("its object")
                // console.log(this.state.CurrentSpecialist.value)
                data.append('operator', this.state.CurrentSpecialist.value)
            }
            else {
                data.append('operator', this.state.CurrentSpecialist.value)
                // console.log("its not an object")
            }
            // console.log(this.state.CurrentSpecialist,"currentSpecialist")


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






            // if (timestamppE) {
            //     templicenseexpdate = timestamppE;
            // }
            // else {
            //     templicenseexpdate = this.state.driverLicenseExpDate;
            // }

            // if (this.refs.driverLicenseNumber.value) {
            //     templicensenumber = this.refs.driverLicenseNumber.value;
            // }
            // else {
            //     templicensenumber = this.state.LNumber;
            // }


            // var driverLicense = {
            //     number: templicensenumber,
            //     expirationDate: templicenseexpdate
            // }
            // if (driverLicense) {
            //     data.append('driverLicense', JSON.stringify(driverLicense))
            // }
            // else {

            // }


            for (var pair of data.entries()) {
                // console.log(pair)
            }
            axios.post('/operator/updatedriver', data).then(function (response) {
                // console.log(response)
                var ID = response.data.data._id;
                // console.log(ID, "Id in post method")
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
        // console.log(this.state.Day, "this.state.Day  ", this.state.Month, "this.state.Month    ", this.state.Year, "this.state.Year  ")
        // console.log(this.state.Day2, "this.state.Day2  ", this.state.Month2, "this.state.Month2    ", this.state.Year2, "this.state.Year2  ")


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
                        <li className="active li Sub" ><a className="active selected" >&lt; بيانات شخصية</a> </li>
                        <li className="active li Sub" ><a>&lt; بيانات المركبة</a></li>
                        <li><a href="#news">صور مستندات و أوراق</a></li>
                    </ul>
                </div>

                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right2">




                        <div className="NewCreateBigDiv7aram">
                            <p className="NewNewNewCreateBigDiv7aram">الإسم *</p>
                            <input type="text" className="NewDriverProfileText" ref="Fname" required value={this.state.Name} onChange={this.handleOnchangeTextName.bind(this)} />
                        </div>

                        <div className="NewCreateBigDiv7aram">
                            <p className="NewNewNewCreateBigDiv7aram">رقم الهاتف *</p>
                            <input type="text" className="NewDriverProfileText" ref="pNumber" required value={this.state.PNumber} onChange={this.handleOnchangeTextPNumber.bind(this)} />
                        </div>

                        <div className="NewCreateBigDiv7aram">
                            <p className="NewNewNewCreateBigDiv7aram">الرقم القومي *</p> 
                            <input type="text" className="NewDriverProfileText" ref="nationalIdNo" required value={this.state.nationalIdNo}  onChange={this.handleOnchangeTextNID.bind(this)}/>
                        </div>

                        <div className="NewCreateBigDiv7aram">
                            <p className="NewNewNewCreateBigDiv7aram">البريد الإلكتروني</p>
                            <input type="email" className="NewDriverProfileText" ref="email" value={this.state.Email} onChange={this.handleOnchangeTextEmail.bind(this)} />
                        </div>

                        <div className="NewCreateBigDiv7aram">
                            <p className="NewNewNewCreateBigDiv7aram">كلمة المرور *</p>
                            <input type="password" className="NewDriverProfileText" ref="password" required value={this.state.Password} onChange={this.handleOnchangeTextPword.bind(this)} />
                        </div>

                        <div className="NewCreateBigDiv7aram">
                            <p className="NewNewNewCreateBigDiv7aram">إختر الفرع</p>
                            <div className="OptionsRightboom">
                                <Select
                                    ref="Branch"
                                    placeholder="فرع"
                                    className="menu-outer-top4"
                                    value={this.state.currentBranch}
                                    options={this.state.branchesOptions}
                                    onChange={this.handleBranchoptions.bind(this, "currentBranch")}
                                />
                            </div>
                        </div>

                        <div className="NewCreateBigDiv7aram">
                            <p className="NewNewNewCreateBigDiv7aram">إختر أخصائي</p>
                            <div className="OptionsRightboom">
                                <Select
                                    ref="Specialist"
                                    placeholder="الأخصائي"
                                    className="menu-outer-top4"
                                    value={this.state.CurrentSpecialist}
                                    options={this.state.SpecialistsOptions}
                                    onChange={this.handleSpecialitsoptions.bind(this, "CurrentSpecialist")}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="CreateBigDiv-left-what2">



                        {/* <div className="NewClassUser" >
                            <p className="NewNewNewCreateBigDivLeft">صورة شخصية</p>
                            <div className="NewNewNewcustom-file-upload-inner-divLol">
                                <div className="NewNewNewcustom-file-upload-inner-div-right">
                                    <label className="NewNewNewcustom-file-upload">
                                        <input type="file" onChange={this.voo.bind(this)} />
                                        <img src={this.state.driverPicture} className="NewNewNewcustom-file-upload-img" />
                                    </label>
                                </div >
                                <div className="NewNewNewcustom-file-upload-inner-div-left">
                                    <p className="ANewClass">اضغط لتغير الصورة الشخصية</p>
                                </div>
                            </div>
                        </div> */}

                        <div className="NewClassUser" >
                            <p className="NewNewNewCreateBigDivLeft">صورة شخصية</p>
                            <div className="NewNewNewcustom-file-upload-inner-divLol">
                                <div className="NewNewNewcustom-file-upload-inner-div-right">
                                    <label className="NewNewNewcustom-file-upload">
                                        <input type="file" onChange={this.voo.bind(this)} />
                                        <img src={this.state.driverPicture} className="NewNewNewcustom-file-upload-img" />
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
                                        value={this.state.Year}
                                        options={this.state.startyearoptions}
                                        onChange={this.handleYearoptions.bind(this, "Year")}
                                    />
                                </div>

                                <div className="OptionsTTNewNewtruecomecome ">
                                    <Select
                                        ref="startmonth"
                                        placeholder="شهر"
                                        value={this.state.Month}
                                        options={this.state.startmonthoptions}
                                        onChange={this.handleMonthoptions.bind(this, "Month")}
                                    />
                                </div>

                                <div className="OptionsThTNewNewcomecome ">
                                    <Select
                                        ref="startday"
                                        placeholder="يوم"
                                        value={this.state.Day}
                                        options={this.state.startdayoptions}
                                        onChange={this.handleDayoptions.bind(this, "Day")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="NewClassUserNew22" >
                            <p className="NewNewNewCreateBigDivLeft22">العنوان</p>
                            <input type="text" ref="address" className="NewNewNewNewCreateBigDivPTTT2comecome22" value={this.state.Address} onChange={this.handleOnchangeTextAddress.bind(this)} />
                        </div>

                        <div className="NewClassUseryay" >
                            <p className="NewNewNewCreateBigDivLeft">رقم رخصة السائق</p>
                            <input type="text" className="NewNewNewNewCreateBigDivPTTT2comecome" ref="driverLicenseNumber" required value={this.state.LNumber} onChange={this.handleOnchangeTextLNumber.bind(this)} />
                        </div>

                        <div className="NewClassUserHelloz" >
                            <p className="NewNewNewCreateBigDivLeftNew">تاريخ إنتهاء الرخصة</p>
                            <div className="Options-GroupsTNewNewcomecome">
                                <div className="OptionsOTNewNewcomecome">
                                    <Select
                                        ref="endyear"
                                        placeholder="سنة"
                                        value={this.state.Year2}
                                        options={this.state.endyearoptions}
                                        onChange={this.handleYearoptionsE.bind(this, "Year2")}
                                    />
                                </div>

                                <div className="OptionsTTNewNewtruecomecome">
                                    <Select
                                        ref="endmonth"
                                        placeholder="شهر"
                                        value={this.state.Month2}
                                        options={this.state.endmonthoptions}
                                        onChange={this.handleMonthoptionsE.bind(this, "Month2")}
                                    />
                                </div>
                                <div className="OptionsThTNewNewcomecome">
                                    <Select
                                        ref="endday"
                                        placeholder="يوم"
                                        value={this.state.Day2}
                                        options={this.state.enddayoptions}
                                        onChange={this.handleDayoptionsE.bind(this, "Day2")}
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
