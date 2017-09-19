import React, { Component } from 'react';
import axios from 'axios';
import { render, unmountComponentAtNode } from 'react-dom';
import SkyLight from 'react-skylight';
import Lightbox from 'react-image-lightbox';
var ReactRouter = require('flux-react-router');



class UpdateDriverPapers extends Component {

    constructor(props) {
        super(props);
        var that = this;
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('sessionToken');
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    }

    componentWillMount() {
        var that = this;
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
            userID: this.props.pID,
            driverId: this.props.pID,
            vehicleId: "",
            photoIndex: 0,
            isOpen: false,
            images: [
                '/Group 1523.png',
                '/Group 1523.png',
                '/Group 1523.png',
                '/Group 1523.png'
            ],
            nationalIdPhotosArray: [],
            driverLicensePhotosArray: [],
            vehicleLicensePhotosArray: [],
            ownershipDocumentsPhotosArray: [],
            addressPhotosArray: [],
            criminalRecordPhotosArray: [],
            drugTestPhotosArray: [],
            contractPhotosArray: [],
            paperType: "",
            paperDirId: "",
        }
        // this.setState({
        //     userID: this.props.pID
        // })
        var IdArray = []
        var licenseArray = []
        var vehicleLicenseArray = []
        var ownershipDocumentsArray = []
        var addressArray = []
        var criminalRecordArray = []
        var drugTestArray = []
        var contractArray = []
        var paper = ""

        axios.get('/operator/getdriverpapers?' + "driverId=" + this.state.driverId).then(function (response) {
            console.log(response, "getdriverpapers Response")
            var x = response.data.data;

            paper = x._id;
            console.log(x._id, "x._id")


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
                paperDirId: paper,
            })


        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })




        // this.setState({
        //     nationalIdPhotosArray: IdArray,
        //     driverLicensePhotosArray: licenseArray,
        //     vehicleLicensePhotosArray: vehicleLicenseArray,
        //     ownershipDocumentsPhotosArray: ownershipDocumentsArray,
        //     addressPhotosArray: addressArray,
        //     criminalRecordPhotosArray: criminalRecordArray,
        //     drugTestPhotosArray: drugTestArray,
        //     contractPhotosArray: contractArray,
        //     paperDirId: paper,
        // })

    }

    componentDidMount() {
        var that = this;

        // axios.get('/operator/getdriverpapers?' + "driverId=" + this.state.driverId).then(function (response) {
        //     console.log(response, "getdriverpapers Response")
        //     var x = response.data.data;

        //     // that.setState({
        //     //     // driverName: x.firstName,
        //     //     // driverPNumber: x.phoneNumber,
        //     //     // driverEmail: x.email,
        //     //     // driverPassword: x.password,
        //     //     driverBirthday: x.birthday,
        //     //     // driverAddress: x.address,
        //     //     driverPicture: x.picture,


        //     //     Name: x.firstName,
        //     //     PNumber: x.phoneNumber,
        //     //     Email: x.email,
        //     //     Password: x.birthday,
        //     //     Address: x.address,
        //     // })
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
    static defaultProps = {

    }
    imageviewer(e) {


    }


    aoo(event) {

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            nationalIdimg: Arrayy,
        })
    }


    boo(event) {

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            addressimg: Arrayy,
        })
    }

    coo(event) {

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            drivingLicenseimg: Arrayy,
        })
    }

    doo(event) {


        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            vehicleLicenseimg: Arrayy,
        })
    }

    eoo(event) {

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            vehicleOwnerShipimg: Arrayy,
        })
    }

    foo(event) {


        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            criminalRecordimg: Arrayy,
        })
    }

    goo(event) {


        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            drugTestimg: Arrayy,
        })
    }

    hoo(event) {

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            contractimg: Arrayy,
        })
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
            // data.append('address', this.state.addressimg)
            // data.append('drivingLicense', this.state.drivingLicenseimg)
            // data.append('vehicleLicense', this.state.vehicleLicenseimg)
            // data.append('ownershipDocuments', this.state.vehicleOwnerShipimg)
            // data.append('criminalRecord', this.state.criminalRecordimg)
            // data.append('drugTest', this.state.drugTestimg)
            // data.append('contract', this.state.contractimg)

              if (this.state.nationalIdimg.length > 0 || this.state.addressimg.length > 0 || this.state.drivingLicenseimg.length > 0 || this.state.vehicleLicenseimg.length > 0 ||
                this.state.vehicleOwnerShipimg.length > 0 || this.state.criminalRecordimg.length > 0 || this.state.drugTestimg.length > 0 || this.state.contractimg.length > 0) {
                axios.post('/operator/adddriverpapers', data).then(function (response) {
                    console.log(response)
                    window.localStorage.setItem('sessionToken', response.data);
                    that.refs.PromoDialog.show()

                }).catch(function (error) {
                    alert(error.message);
                    console.log(error)
                })
            }
            else {
                that.refs.PromoDialog.show()
            }
            // axios.post('/operator/adddriverpapers', data).then(function (response) {
            //     console.log(response)
            //     window.localStorage.setItem('sessionToken', response.data);
            //     that.refs.PromoDialog.show()

            // }).catch(function (error) {
            //     alert(error.message);
            //     console.log(error)
            // })
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

    hoo() {
        var temp = this.state.newEntries
        temp.push("")
        this.setState({
            newEntries: temp
        })
        this.setState({ displayobj: this.ioo() })
    }
    ioo() {
        console.log("asdasdsad")
        var that = this;
        console.log("WoHOOOOOOOOOOOOOOOO")
        console.log(this.state.newEntries)
        if (this.state.newEntries.length > 0) {
            return (
                React.DOM.table(null,
                    React.DOM.thead(null,
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ),
                    React.DOM.tbody(null,
                        that.state.newEntries.map(function (i, index) {
                            let re = [];
                            that.state["TextKEY" + index + 1] = ""
                            that.state["file" + index + 1] = ""
                            re.push(<input type="text" key={index} value={that.state["TextKEY" + index]} onChange={that.handleChangetext.bind(that, "TextKEY" + index)} />)
                            re.push(<input type="file" key={index} value={that.state["file" + index]} onChange={that.handleChange.bind(that, "file" + index)} />)

                            return (
                                React.DOM.tr(null,
                                    re.map(function (col, index) {
                                        console.log(col)
                                        return (
                                            <td >{col}</td>
                                        )
                                    }
                                    )
                                )

                            )
                        })
                    )
                )
            )
        }
    }
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
        // const {
        //     photoIndex,
        //     isOpen,
        // } = this.state;
        console.log(this.state.paperDirId, "paperDirId")
        return (
            <div>
                <div className="Navdiv">
                    <ul className="NavdivUl">
                        <li className="Header Logo"><img src="/Group 11.png" alt="Header Logo" /></li>
                        <li className="active li" ><a className="active" onClick={this.handleDrivers.bind(this)} >السائقين</a></li>
                        {/*<li className="active li"><a className="active" href="#home">السائقين</a></li>*/}
                        <li><a  >رحلات</a></li>
                        <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
                        <li><a  >دعم</a></li>
                        <li><a >تقارير</a></li>
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

                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">



                        {/*<div className="goodMor">
                            <p className="CreateBigDivDisNewNew">بطاقة السائق</p>
                            <div className="upload-button-divDisHelloGood">
                                <div className="uploadWhatGood" >
                                    <label className="upload-buttonGood">حمل المستندات< input type="file" ref="artwork" onChange={this.aoo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="helloGood" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimageGood" onClick={() => this.setState({ isOpen: true, images: this.state.nationalIdPhotosArray, paperType: "nationalId" })} />
                            </div>
                        </div>

                        <div className="goodMor">
                            <p className="CreateBigDivDisNewNew">رخصة السائق</p>
                            <div className="upload-button-divDisHelloGood">
                                <div className="uploadWhatGood" >
                                    <label className="upload-buttonGood">حمل المستندات< input type="file" ref="artwork" onChange={this.coo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="helloGood" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimageGood" onClick={() => this.setState({ isOpen: true, images: this.state.driverLicensePhotosArray, paperType: "licenseArray" })} />
                            </div>
                        </div>

                        <div className="goodMor">
                            <p className="CreateBigDivDisNewNew">رخصة المركبة</p>
                            <div className="upload-button-divDisHelloGood">
                                <div className="uploadWhatGood" >
                                    <label className="upload-buttonGood">حمل المستندات< input type="file" ref="artwork" onChange={this.doo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="helloGood" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimageGood" onClick={() => this.setState({ isOpen: true, images: this.state.vehicleLicensePhotosArray, paperType: "vehicleLicence" })} />
                            </div>
                        </div>

                        <div className="goodMor">
                            <p className="CreateBigDivDisNewNew">مستندات التمليك</p>
                            <div className="upload-button-divDisHelloGood">
                                <div className="uploadWhatGood" >
                                    <label className="upload-buttonGood">حمل المستندات< input type="file" ref="artwork" onChange={this.eoo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="helloGood" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimageGood" onClick={() => this.setState({ isOpen: true, images: this.state.ownershipDocumentsPhotosArray, paperType: "ownershipDocuments" })} />
                            </div>
                        </div>*/}



                        <div className="CreateBigDiv-right-rightDis">
                            <p className="CreateBigDivDisNewNew">بطاقة السائق</p>
                            <p className="CreateBigDivDisNewNew">رخصة السائق</p>
                            <p className="CreateBigDivDisNewNew">رخصة المركبة</p>
                            <p className="CreateBigDivDisNewNew">مستندات التمليك</p>
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
                                <img src="/Group 1569.png" className="helloimage" onClick={() => this.setState({ isOpen: true, images: this.state.nationalIdPhotosArray, paperType: "nationalId" })} />
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
                                <img src="/Group 1569.png" className="helloimage" onClick={() => this.setState({ isOpen: true, images: this.state.driverLicensePhotosArray, paperType: "licenseArray" })} />
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
                                <img src="/Group 1569.png" className="helloimage" onClick={() => this.setState({ isOpen: true, images: this.state.vehicleLicensePhotosArray, paperType: "vehicleLicence" })} />
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
                                <img src="/Group 1569.png" className="helloimage" onClick={() => this.setState({ isOpen: true, images: this.state.ownershipDocumentsPhotosArray, paperType: "ownershipDocuments" })} />
                            </div>
                        </div>
                    </div>

                    <div className="CreateBigDiv-left">
                        <div className="CreateBigDiv-left-right">
                            <p className="CreateBigDiv">صورة العنوان</p>
                            <p className="CreateBigDiv">فيش و تشبيه</p>
                            <p className="CreateBigDiv">تحليل مخدرات</p>
                            <p className="CreateBigDiv">عقد شراكة</p>
                        </div>
                        <div className="CreateBigDiv-left-leftDis2">
                            <div className="upload-button-divDisHello2">
                                <div className="uploadWhat" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.boo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimage2" onClick={() => this.setState({ isOpen: true, images: this.state.addressPhotosArray, paperType: "address" })} />
                            </div>
                            <div className="upload-button-divDisHello2">
                                <div className="uploadWhat" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.foo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimage2" onClick={() => this.setState({ isOpen: true, images: this.state.criminalRecordPhotosArray, paperType: "criminalRecord" })} />
                            </div>
                            <div className="upload-button-divDisHello2">
                                <div className="uploadWhat" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.goo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimage2" onClick={() => this.setState({ isOpen: true, images: this.state.drugTestPhotosArray, paperType: "drugTest" })} />
                            </div>
                            <div className="upload-button-divDisHello2">
                                <div className="uploadWhat" >
                                    {/*<img src="/browser.png" className="browserDis" />*/}
                                    <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.hoo.bind(this)} multiple="multiple" />
                                        <img src="/redashboard/Group 1538.png" className="hello" />
                                    </label>
                                </div>
                                <img src="/Group 1569.png" className="helloimage2" onClick={() => this.setState({ isOpen: true, images: this.state.contractPhotosArray, paperType: "contract" })} />
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
        console.log(this.state.paperDirId, "his.state.paperDirId"),
            console.log(this.state.driverId, "this.state.driverId,")
        var object = {
            driver: this.state.driverId,
            paperDirId: this.state.paperDirId,
            urlsAndTypes: {
                url: this.state.images[this.state.photoIndex],
                paperType: this.state.paperType
            }
        }
        // this.setState({
        //     sadasfsad: "asdasdasd"
        // })
        return arr.map(function (item) {
            return (
                // <button onClick={() => console.log(this.state.photoIndex, this.state.images[this.state.photoIndex])}>
                //     <p>clickme</p>
                // </button>

                <img className="deletebutton" src="/Path 1292.png" onClick={() =>
                    axios.post('/operator/deletedriverpapers', object).then(function (response) {
                        console.log(response)
                    }).catch(function (error) {
                        alert(error.message);
                        console.log(error)
                    })
                }>

                </img>
            )
        }, this)

    }
}

export default UpdateDriverPapers;

