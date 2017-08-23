import React, { Component } from 'react';
import axios from 'axios';
import { render, unmountComponentAtNode } from 'react-dom';
import SkyLight from 'react-skylight';
var ReactRouter = require('flux-react-router');


let imgStyle;
let divStyle;
let isAdmin;
class AddPapers extends Component {

    constructor() {
        super();
        // axios.defaults.baseURL = 'https://halanapp.herokuapp.com/';
        axios.defaults.baseURL = 'http://192.168.1.29:4000';
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
            displayobj: null
        }
        this.setState({
            userID: this.props.pID
        })
    }
    static defaultProps = {

    }
    aoo(event) {

        // var file = event.target.files[0];
        //  console.log(event.target.files[0]);
        // console.log(event.target.files)
        // var files = [];
        // var leng = event.target.files.length;
        // for(var i = 0; i<event.target.files.length;i++){
        //     var item = event.target.files[i];
        //     // files[i] = item;
        //     files.push(item);
        // }
        // var fole = files;
        // console.log(files)
        // console.log(fole[0])
        // // var file = event.target.files;
        // this.setState({
        //     nationalIdimg: files,
        // })
        //    Arrayy.from(event.target.files)
        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            nationalIdimg: Arrayy,
        })
    }


    boo(event) {

        // var file = event.target.files[0];
        // console.log(event.target.files)
        // var file = event.target.files;
        // this.setState({
        //     addressimg: file,
        // })
        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            addressimg: Arrayy,
        })
    }

    coo(event) {

        // var file = event.target.files[0];
        // console.log(event.target.files)
        // var file = event.target.files;
        // this.setState({
        //     drivingLicenseimg: file,
        // })

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            drivingLicenseimg: Arrayy,
        })
    }

    doo(event) {

        // var file = event.target.files[0];
        // console.log(event.target.files)
        // var file = event.target.files;
        // this.setState({
        //     vehicleLicenseimg: file,
        // })

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            vehicleLicenseimg: Arrayy,
        })
    }

    eoo(event) {

        // var file = event.target.files[0];
        // console.log(event.target.files)
        // var file = event.target.files;
        // this.setState({
        //     vehicleOwnerShipimg: file,
        // })

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            vehicleOwnerShipimg: Arrayy,
        })
    }

    foo(event) {

        // var file = event.target.files[0];
        // console.log(event.target.files)
        // var file = event.target.files;
        // this.setState({
        //     criminalRecordimg: file,
        // })

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            criminalRecordimg: Arrayy,
        })
    }

    goo(event) {

        // var file = event.target.files[0];
        // console.log(event.target.files)
        // var file = event.target.files;
        // this.setState({
        //     drugTestimg: file,
        // })

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            drugTestimg: Arrayy,
        })
    }

    hoo(event) {

        // var file = event.target.files[0];
        // console.log(event.target.files)
        // var file = event.target.files;
        // this.setState({
        //     contractimg: file,
        // })

        var Arrayy = Array.from(event.target.files)
        console.log(Arrayy)
        this.setState({
            contractimg: Arrayy,
        })
    }

    // koo(event) {

    //     // var file = event.target.files[0];
    //     var file = event.target.files;
    //     this.setState({
    //         contractimg: file,
    //     })
    // }

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
            for (var i = 0; i < this.state.nationalIdimg.length; i++) {
               data.append('address', this.state.addressimg[i])
            }
            for (var i = 0; i < this.state.nationalIdimg.length; i++) {
                 data.append('drivingLicense', this.state.drivingLicenseimg[i])
            }
            for (var i = 0; i < this.state.nationalIdimg.length; i++) {
                 data.append('vehicleLicense', this.state.vehicleLicenseimg[i])
            }
            for (var i = 0; i < this.state.nationalIdimg.length; i++) {
                 data.append('ownershipDocuments', this.state.vehicleOwnerShipimg[i])
            }
            for (var i = 0; i < this.state.nationalIdimg.length; i++) {
                data.append('criminalRecord', this.state.criminalRecordimg[i])
            }
            for (var i = 0; i < this.state.nationalIdimg.length; i++) {
                data.append('drugTest', this.state.drugTestimg[i])
            }
            for (var i = 0; i < this.state.nationalIdimg.length; i++) {
                 data.append('contract', this.state.contractimg[i])
            }
            // data.append('nationalId', this.state.nationalIdimg)
            data.append('address', this.state.addressimg)
            data.append('drivingLicense', this.state.drivingLicenseimg)
            data.append('vehicleLicense', this.state.vehicleLicenseimg)
            data.append('ownershipDocuments', this.state.vehicleOwnerShipimg)
            data.append('criminalRecord', this.state.criminalRecordimg)
            data.append('drugTest', this.state.drugTestimg)
            data.append('contract', this.state.contractimg)
            
            // console.log("that.state.newEntries")
            // console.log(that.state.newEntries.length)
            // if (that.state.newEntries.length > 0) {
            //     var size = that.state.newEntries.length
            //     var ind = size;
            //     while (size > 0) {
            //         ind = ind - size;
            //         console.log(ind)
            //         console.log("this is TextKey of " + ind)
            //         console.log(that.state["TextKEY" + ind])
            //         console.log("this is File of " + ind)
            //         console.log(that.state["file" + ind])
            //         data.append(that.state["TextKEY" + ind], that.state["file" + ind])
            //         size--

            //     }

            // }

            axios.post('/api/operator/adddriverpapers', data).then(function (response) {
                console.log(response)
                window.localStorage.setItem('sessionToken', response.data);
                that.refs.PromoDialog.show()
                /*ReactRouter.goTo("/DashBoard")*/

            }).catch(function (error) {
                alert(error.message);
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

        return (
            <div>
                <div className="Navdiv">
                    <ul>
                        <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
                        <li className="active li" ><a className="active" onClick={this.handleDrivers.bind(this)} >السائقين</a></li>
                        {/*<li className="active li"><a className="active" href="#home">السائقين</a></li>*/}
                        <li><a href="#news">رحلات</a></li>
                        <li><a href="#contact" onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
                        <li><a href="#about">دعم</a></li>
                        <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
                    </ul>
                </div>
                <br />

                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">
                        <div className="CreateBigDiv-right-right">
                            <p className="CreateBigDiv">بطاقة السائق</p>
                            <p className="CreateBigDiv">رخصة السائق</p>
                            <p className="CreateBigDiv">رخصة المركبة</p>
                            <p className="CreateBigDiv">مستندات التمليك</p>
                        </div>
                        <div className="CreateBigDiv-right-left">
                            <div className="upload-button-div">
                                <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.aoo.bind(this)} multiple="multiple" />
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>
                            </div>

                            <div className="upload-button-div">
                                <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.coo.bind(this)} multiple="multiple"/>
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>
                            </div>

                            <div className="upload-button-div">
                                <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.doo.bind(this)} multiple="multiple"/>
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>
                            </div>

                            <div className="upload-button-div">
                                <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.eoo.bind(this)} multiple="multiple"/>
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>
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
                        <div className="CreateBigDiv-left-left">
                            <div className="upload-button-div">
                                <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.boo.bind(this)} multiple="multiple"/>
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>
                            </div>

                            <div className="upload-button-div">
                                <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.foo.bind(this)} multiple="multiple"/>
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>
                            </div>

                            <div className="upload-button-div">
                                <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.goo.bind(this)} multiple="multiple"/>
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>
                            </div>

                            <div className="upload-button-div">
                                <label className="upload-button">حمل المستندات< input type="file" ref="artwork" onChange={this.hoo.bind(this)} multiple="multiple"/>
                                    <img src="./redashboard/Group 1538.png" className="hello" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>


                <br /><br />

                <div className="buttonT">
                    <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
                    {/*onClick={() => this.refs.PromoDialog.show()} */}
                    {/*onClick={this.handleSubmit.bind(this)}*/}
                </div>



                <SkyLight hideOnOverlayClicked ref="PromoDialog" dialogStyles={sky}>
                    <img src="./redashboard/Group 1549.png" alt="Header Logo" />
                    <p className="Sky-P">تم إنشاء ملف السائق بنجاح</p>
                </SkyLight>


                {/*<div>
                    <label>plus  < input type="button" onClick={this.hoo.bind(this)} /> </label>
                </div>

                <div>
                    {
                        (this.state.displayobj != null) ?
                            this.state.displayobj : null
                    }
                </div>*/}

                {/*<input type="button" value="Submit" onClick={this.handleSubmit.bind(this)} />*/}

                {/*<input type="button" value="Back" onClick={this.handleBack.bind(this)} />*/}

                {/* <div>
                    <label>Driver ID: </label>
                    <input type="text" ref="driver" required />
                </div>
                
                <div>
                    <label>National Id  < input type="file" ref="artwork" onChange={this.aoo.bind(this)} /> </label>
                </div>

                <div>
                    <label>Address related photo:  < input type="file" ref="artwork" onChange={this.boo.bind(this)} /> </label>
                </div>

                <div>
                    <label>Driving License  < input type="file" ref="artwork" onChange={this.coo.bind(this)} /> </label>
                </div>

                <div>
                    <label>Vehicle License   < input type="file" ref="artwork" onChange={this.doo.bind(this)} /> </label>
                </div>

                <div>
                    <label>Vehicle OwnerShip   < input type="file" ref="artwork" onChange={this.eoo.bind(this)} /> </label>
                </div>

                <div>
                    <label>Criminal Record  < input type="file" ref="artwork" onChange={this.foo.bind(this)} /> </label>
                </div>

                <div>
                    <label>Drug Test  < input type="file" ref="artwork" onChange={this.goo.bind(this)} /> </label>
                </div>*/}



            </div>
        );
    }
}

export default AddPapers;



  /* ReactRouter.goTo('/createUser');*/
