import React, { Component } from 'react';
import axios from 'axios';
import { render, unmountComponentAtNode } from 'react-dom';
import SkyLight from 'react-skylight';
import ReactLoading from 'react-loading';
import Lightbox from 'react-image-lightbox';
var ReactRouter = require('flux-react-router');


let imgStyle;
let divStyle;
let isAdmin;
class AddDriverPapers extends Component {

    constructor() {
        super();
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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
            nationalIdimg: [],
            addressimg: [],
            drivingLicenseimg: [],
            vehicleLicenseimg: [],
            vehicleOwnerShipimg: [],
            criminalRecordimg: [],
            drugTestimg: [],
            contractimg: [],
            newimg: "",
            img: "",
            newEntries: [],
            displayobj: null,
            loadinghiden: true,
            photoIndex: 0,
            isOpen: false,
            images: [],
            nationalIdPhotosArray: [],
            picArray: [],
            picArray2: [],
            picArray3: [],
            picArray4: [],
            picArray5: [],
            picArray6: [],
            picArray7: [],
            picArray8: [],
        }
        this.setState({
            userID: this.props.pID
        })
    }
    static defaultProps = {

    }
    // aoo(event) {
    //     var that = this
    //     var Arrayy = Array.from(event.target.files)
    //     console.log(event.target.value)
    //     var newarray = [];

    //     Arrayy.forEach(function (item) {
    //         console.log(item)
    //         // that.state.nationalIdPhotosArray.push(item.name)
    //         newarray.push(item.name)
    //     })
    //     console.log(newarray)
    //     this.setState({
    //         nationalIdimg: Arrayy,
    //         nationalIdPhotosArray: newarray
    //     })
    // }

    aoo(event) {
        var that = this
        var Arrayy = Array.from(event.target.files)
        console.log(event.target.value)
        var newarray = [];

        Arrayy.forEach(function (item) {
            console.log(item)
            // that.state.nationalIdPhotosArray.push(item.name)
            newarray.push(item.name)
        })
        console.log(newarray)
        this.setState({
            nationalIdimg: Arrayy,
            nationalIdPhotosArray: newarray
        })


        if (window.File && window.FileList && window.FileReader) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            var array = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image')) continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target.result;
                    // console.log(picFile)
                    array.push(picFile)
                    // console.log(array)
                    that.setState({
                        picArray: array,
                    })

                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        } else {
            console.log("Your browser does not support File API");
        }
    }


    boo(event) {
        var that = this
        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            addressimg: Arrayy,
        })

        if (window.File && window.FileList && window.FileReader) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            var array = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image')) continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target.result;
                    // console.log(picFile)
                    array.push(picFile)
                    // console.log(array)
                    that.setState({
                        picArray5: array,
                    })

                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        } else {
            console.log("Your browser does not support File API");
        }
    }

    coo(event) {
        var that = this
        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            drivingLicenseimg: Arrayy,
        })

        if (window.File && window.FileList && window.FileReader) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            var array = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image')) continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target.result;
                    // console.log(picFile)
                    array.push(picFile)
                    // console.log(array)
                    that.setState({
                        picArray2: array,
                    })

                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        } else {
            console.log("Your browser does not support File API");
        }
    }

    doo(event) {

        var that = this
        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            vehicleLicenseimg: Arrayy,
        })

        if (window.File && window.FileList && window.FileReader) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            var array = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image')) continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target.result;
                    // console.log(picFile)
                    array.push(picFile)
                    // console.log(array)
                    that.setState({
                        picArray3: array,
                    })

                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        } else {
            console.log("Your browser does not support File API");
        }
    }

    eoo(event) {
        var that = this
        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            vehicleOwnerShipimg: Arrayy,
        })

        if (window.File && window.FileList && window.FileReader) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            var array = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image')) continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target.result;
                    // console.log(picFile)
                    array.push(picFile)
                    // console.log(array)
                    that.setState({
                        picArray4: array,
                    })

                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        } else {
            console.log("Your browser does not support File API");
        }
    }

    foo(event) {

        var that = this
        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            criminalRecordimg: Arrayy,
        })

        if (window.File && window.FileList && window.FileReader) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            var array = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image')) continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target.result;
                    // console.log(picFile)
                    array.push(picFile)
                    // console.log(array)
                    that.setState({
                        picArray6: array,
                    })

                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        } else {
            console.log("Your browser does not support File API");
        }
    }

    goo(event) {

        var that = this
        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            drugTestimg: Arrayy,
        })

        if (window.File && window.FileList && window.FileReader) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            var array = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image')) continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target.result;
                    // console.log(picFile)
                    array.push(picFile)
                    // console.log(array)
                    that.setState({
                        picArray7: array,
                    })

                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        } else {
            console.log("Your browser does not support File API");
        }
    }

    hoo(event) {
        var that = this
        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            contractimg: Arrayy,
        })

        if (window.File && window.FileList && window.FileReader) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            var array = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image')) continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target.result;
                    // console.log(picFile)
                    array.push(picFile)
                    // console.log(array)
                    that.setState({
                        picArray8: array,
                    })

                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        } else {
            console.log("Your browser does not support File API");
        }
    }


    handleSubmit(e) {
        var that = this;
        console.log("asdasd");
        // if (this.refs.email.value === '' || this.refs.password.value === '' || this.refs.Fname.value === '' || this.refs.Lname.value === '') {
        if (false) {
            alert('Something is missing');

        }
        else {
            const data = new FormData();
            data.append('action', 'ADD');
            data.append('param', 0);
            data.append('driver', this.state.userID)
            for (var i = 0; i < this.state.nationalIdimg.length; i++) {
                data.append('nationalId', this.state.nationalIdimg[i])
            }
            for (var i = 0; i < this.state.addressimg.length; i++) {
                data.append('address', this.state.addressimg[i])
            }
            for (var i = 0; i < this.state.drivingLicenseimg.length; i++) {
                data.append('drivingLicense', this.state.drivingLicenseimg[i])
            }
            for (var i = 0; i < this.state.vehicleLicenseimg.length; i++) {
                data.append('vehicleLicense', this.state.vehicleLicenseimg[i])
            }
            for (var i = 0; i < this.state.vehicleOwnerShipimg.length; i++) {
                data.append('ownershipDocuments', this.state.vehicleOwnerShipimg[i])
            }
            for (var i = 0; i < this.state.criminalRecordimg.length; i++) {
                data.append('criminalRecord', this.state.criminalRecordimg[i])
            }
            for (var i = 0; i < this.state.drugTestimg.length; i++) {
                data.append('drugTest', this.state.drugTestimg[i])
            }
            for (var i = 0; i < this.state.contractimg.length; i++) {
                data.append('contract', this.state.contractimg[i])
            }


            if (this.state.nationalIdimg.length > 0 || this.state.addressimg.length > 0 || this.state.drivingLicenseimg.length > 0 || this.state.vehicleLicenseimg.length > 0 ||
                this.state.vehicleOwnerShipimg.length > 0 || this.state.criminalRecordimg.length > 0 || this.state.drugTestimg.length > 0 || this.state.contractimg.length > 0) {
                that.setState({
                    loadinghiden: false,
                })
                axios.post('/operator/adddriverpapers', data).then(function (response) {
                    console.log(response)
                    window.localStorage.setItem('sessionToken', response.data);
                    that.setState({
                        loadinghiden: true,
                    })


                }).catch(function (error) {
                    that.setState({
                        loadinghiden: true,
                    })
                    alert(error.message);
                    console.log(error)
                })
            }
            else {
                that.refs.PromoDialog.show()
            }
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

    // hoo() {
    //     var temp = this.state.newEntries
    //     temp.push("")
    //     this.setState({
    //         newEntries: temp
    //     })
    //     this.setState({ displayobj: this.ioo() })
    // }
    // ioo() {
    //     console.log("asdasdsad")
    //     var that = this;
    //     console.log("WoHOOOOOOOOOOOOOOOO")
    //     console.log(this.state.newEntries)
    //     if (this.state.newEntries.length > 0) {
    //         return (
    //             React.DOM.table(null,
    //                 React.DOM.thead(null,
    //                     <tr>
    //                         <td></td>
    //                         <td></td>
    //                         <td></td>
    //                     </tr>
    //                 ),
    //                 React.DOM.tbody(null,
    //                     that.state.newEntries.map(function (i, index) {
    //                         let re = [];
    //                         that.state["TextKEY" + index + 1] = ""
    //                         that.state["file" + index + 1] = ""
    //                         re.push(<input type="text" key={index} value={that.state["TextKEY" + index]} onChange={that.handleChangetext.bind(that, "TextKEY" + index)} />)
    //                         re.push(<input type="file" key={index} value={that.state["file" + index]} onChange={that.handleChange.bind(that, "file" + index)} />)

    //                         return (
    //                             React.DOM.tr(null,
    //                                 re.map(function (col, index) {
    //                                     console.log(col)
    //                                     return (
    //                                         <td >{col}</td>
    //                                     )
    //                                 }
    //                                 )
    //                             )

    //                         )
    //                     })
    //                 )
    //             )
    //         )
    //     }
    // }
    joo(event) {
        var file = event.target.files[0];
        this.setState({
            drugTestimg: file,
        })
    }
    handleChangetext(type, e) {
        if (this.state) {
            this.setState({
                [type]: e.target.value
            })
        }

    }
    handleChange(type, e) {
        if (this.state) {
            this.setState({
                [type]: e.target.files[0]
            })
        }

        // if (e.keyCode === 13) {
        //     console.log("enter")
        // }
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

        var sky = {
            width: '25%',
            height: '25%',
            align: 'center',
            textAlign: 'center',
            fontFamily: 'Cairo',
            fontSize: 'large'
        };

        return (
            <div>
                <div className="loadingclass" hidden={this.state.loadinghiden}  >
                    <ReactLoading type={"bubbles"} color={"#444"} className="loadingelement" />
                </div>

                <div className="Navdiv">
                    <ul className="NavdivUl">
                         <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
              <li className="active li"><a className="active" >السائقين</a></li>
              <li><a >رحلات</a></li>
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
                        <li ><a >&lt; بيانات المركبة</a></li>
                        <li className="active li Sub"><a className="active selected" >صور مستندات و أوراق</a></li>
                    </ul>
                </div>

                {/*
                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">
                        <div className="CreateBigDiv-right-rightDis">
                            <p className="CreateBigDivDis">بطاقة السائق</p>
                            <p className="CreateBigDivDis">رخصة السائق</p>
                            <p className="CreateBigDivDis">رخصة المركبة</p>
                            <p className="CreateBigDivDis">مستندات التمليك</p>
                        </div>
                        <div className="CreateBigDiv-right-lefthmm">
                            <div className="disdis" >
                                <div className="upload-button-divLolllFml">
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.aoo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>

                                <div className="upload-button-divLolllFml">
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.coo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>

                                <div className="upload-button-divLolllFml">
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.doo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>

                                <div className="upload-button-divLolllFml">
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.eoo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="CreateBigDiv-left">
                        <div className="CreateBigDiv-left-right">
                            <p className="CreateBigDivPapersLol">صورة العنوان</p>
                            <p className="CreateBigDivPapersLol">فيش و تشبيه</p>
                            <p className="CreateBigDivPapersLol">تحليل مخدرات</p>
                            <p className="CreateBigDivPapersLol">عقد شراكة</p>
                        </div>
                        <div className="CreateBigDiv-left-leftLolLolLLL">
                            <div className="whatisthis">
                                <div className="upload-button-divLol">
                                    <label className="upload-buttonWhatisThis">حمل المستندات< input type="file" ref="artwork" onChange={this.boo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="browserLol" />
                                    </label>
                                </div>

                                <div className="upload-button-divLol">
                                    <label className="upload-buttonWhatisThis">حمل المستندات< input type="file" ref="artwork" onChange={this.foo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="browserLol" />
                                    </label>
                                </div>

                                <div className="upload-button-divLol">
                                    <label className="upload-buttonWhatisThis">حمل المستندات< input type="file" ref="artwork" onChange={this.goo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="browserLol" />
                                    </label>
                                </div>

                                <div className="upload-button-divLol">
                                    <label className="upload-buttonWhatisThisLol">حمل المستندات< input type="file" ref="artwork" onChange={this.hoo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>*/}
                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">

                        <div className="CreateBigDiv-right-rightDis">
                            <p className="CreateBigDivDisNewNew22">بطاقة السائق</p>
                            <p className="CreateBigDivDisNewNew22">رخصة السائق</p>
                            <p className="CreateBigDivDisNewNew22">رخصة المركبة</p>
                            <p className="CreateBigDivDisNewNew22">مستندات التمليك</p>
                        </div>
                        <div className="CreateBigDiv-right-lefthmm">

                            <div className="upload-button-divDisHello">
                                <div className="uploadWhat2" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <div className="newpaperclass">
                                        <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.aoo.bind(this)} multiple="multiple" />
                                            <img src="/redashboard/Group 1538.png" className="hello" />
                                        </label>
                                    </div>
                                    {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.aoo.bind(this)} multiple="multiple" />
                                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                                    </label>*/}
                                </div>
                                <img src="/Group 1569.png" className="helloimage" onClick={() => this.setState({ isOpen: true, images: this.state.picArray, paperType: "nationalIdimg" })} />
                            </div>

                            <div className="upload-button-divDisHello">
                                <div className="uploadWhat2" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <div className="newpaperclass">
                                        <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.coo.bind(this)} multiple="multiple" />
                                            <img src="/redashboard/Group 1538.png" className="hello" />
                                        </label>
                                    </div>
                                    {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.coo.bind(this)} multiple="multiple" />
                                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                                    </label>*/}
                                </div>
                                <img src="/Group 1569.png" className="helloimage" onClick={() => this.setState({ isOpen: true, images: this.state.picArray2, paperType: "drivingLicenseimg" })} />
                            </div>

                            <div className="upload-button-divDisHello">
                                <div className="uploadWhat2" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <div className="newpaperclass">
                                        <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.doo.bind(this)} multiple="multiple" />
                                            <img src="/redashboard/Group 1538.png" className="hello" />
                                        </label>
                                    </div>
                                    {/*<label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.doo.bind(this)} multiple="multiple" />
                                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                                    </label>*/}
                                </div>
                                <img src="/Group 1569.png" className="helloimage" onClick={() => this.setState({ isOpen: true, images: this.state.picArray3, paperType: "vehicleLicenseimg" })} />
                            </div>

                            <div className="upload-button-divDisHello">
                                <div className="uploadWhat2" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <div className="newpaperclass">

                                    </div>
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.eoo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimage" onClick={() => this.setState({ isOpen: true, images: this.state.picArray4, paperType: "vehicleOwnerShipimg" })} />
                            </div>
                        </div>
                    </div>

                    <div className="CreateBigDiv-left">
                        <div className="CreateBigDiv-left-rightcool">
                            <p className="CreateBigDiv223">صورة العنوان</p>
                            <p className="CreateBigDiv223">فيش و تشبيه</p>
                            <p className="CreateBigDiv223">تحليل مخدرات</p>
                            <p className="CreateBigDiv223">عقد شراكة</p>
                        </div>
                        <div className="CreateBigDiv-left-leftDis2Cool">
                            <div className="upload-button-divDisHello2">
                                <div className="uploadWhat" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.boo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimage23" onClick={() => this.setState({ isOpen: true, images: this.state.picArray5, paperType: "addressimg" })} />
                            </div>
                            <div className="upload-button-divDisHello2">
                                <div className="uploadWhat" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.foo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimage23" onClick={() => this.setState({ isOpen: true, images: this.state.picArray6, paperType: "criminalRecordimg" })} />
                            </div>
                            <div className="upload-button-divDisHello2">
                                <div className="uploadWhat" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.goo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimage23" onClick={() => this.setState({ isOpen: true, images: this.state.picArray7, paperType: "drugTestimg" })} />
                            </div>
                            <div className="upload-button-divDisHello2">
                                <div className="uploadWhat" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.hoo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimage23" onClick={() => this.setState({ isOpen: true, images: this.state.picArray8, paperType: "contractimg" })} />
                            </div>
                        </div>
                    </div>
                </div>


                <br /><br />


                <div className="buttonTT">
                    <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
                    {/*onClick={() => this.refs.PromoDialog.show()} */}
                    {/*onClick={this.handleSubmit.bind(this)}*/}
                </div>








                <div>
                    {this.state.isOpen &&
                        <Lightbox
                            toolbarButtons={this.loadButtonsArr.apply(this)}
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


                <SkyLight hideOnOverlayClicked ref="PromoDialog" dialogStyles={sky}>
                    <img src="./redashboard/Group 1549.png" alt="Header Logo" />
                    <p className="Sky-P">تم إنشاء ملف السائق بنجاح</p>
                </SkyLight>


            </div>
        );
    }



    loadButtonsArr() {
        let arr = [2];
        console.log(this.state.paperType, "his.state.paperDirId")
        var name = [this.state.paperType]
        //     console.log(this.state.driverId, "this.state.driverId,")
        var array = this.state.images;
        var array2 = this.state[name];
        console.log(this.state[name], "this.state[name]")
        // this.state.[name]
        // this.setState({
        //     sadasfsad: "asdasdasd"
        // })
        return arr.map(function (item) {
            return (
                <button onClick={() => console.log(this.state.photoIndex, array[this.state.photoIndex])}>
                    <p>clickme</p>
                </button> ,

                <img className="deletebutton" src="/Path 1292.png" onClick={() => {
                    array.splice(this.state.photoIndex, 1)
                    array2.splice(this.state.photoIndex, 1)
                    this.setState({
                        [name]: array2
                    })
                }
                }>

                </img>
            )
        }, this)

    }
}

export default AddDriverPapers;

