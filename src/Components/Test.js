// import React, { Component, PropTypes } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import Modal from 'react-modal';
// import 'react-select/dist/react-select.css';
// var ReactRouter = require('flux-react-router');


// let imgStyle;
// let divStyle;
// let isAdmin;
// let dayID = "";
// let monthID = "";
// let yearID = "";
// let dayIDE = "";
// let monthIDE = "";
// let yearIDE = "";

// class Test extends Component {

//     constructor(props) {
//         super(props);
//         axios.defaults.baseURL = localStorage.getItem('baseURL');
//         /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
//         axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//         this.state = {
//             startdayoptions: [],
//             startmonthoptions: [],
//             startyearoptions: [],
//         };

//     }
//     getInitialState() {
//         return {

//         };
//     }

//     componentWillMount() {
//         var that = this
//         imgStyle = {
//             width: "100%"
//         }
//         divStyle = {
//             width: "50%"
//         }
//         this.state = {
//             unixTimestamp: "",
//             img: "",
//             imgdata: new FormData(),
//         }
//         this.setState({
//             vehicleTypee: "",
//             startday: "",
//             startmonth: "",
//             startyear: "",
//             endday: "",
//             endmonth: "",
//             endyear: "",
//             userID: this.props.pID,
//             blur: "",
//             loginErrorModal: false,
//             missingRequiredFields: "",
//             branchesOptions: [],

//         })
//         this.getBranchesAPI();
//     }



//     openModal(type) {
//         console.log(type);
//         var missingfields = "";

//         if (this.state.vehicleTypee === "") {
//             missingfields = "VehicleType is missing"
//             console.log("VehicleType is missing")
//         }


//         if (missingfields !== "") {
//             this.setState({
//                 [type]: true,
//                 blur: "blur",
//                 missingRequiredFields: missingfields,
//             });
//         }
//         else {
//             console.log("handleSubmit")
//             this.handleSubmit(this)
//         }
//     }

//     closeModal(type) {
//         console.log(type);
//         this.setState({
//             [type]: false,
//             blur: ""
//         });
//     }


//     componentDidMount() {

//     }
//     getBranchesAPI() {
//         var that = this;
//         var allbranchesOptions = [];
//         axios.get('/operator/getAllBranches').then(function (response) {
//             console.log(response, "helloooooooasdgkjuhasghdkjhasghdkjasgdkasgdakljshgdl")
//             var x = response.data.data;
//             var objects = [];
//             x.forEach(function (item, index) {
//                 allbranchesOptions.push(
//                     {
//                         value: item._id,
//                         label: item.name
//                     })
//                 console.log(item)
//             })

//             that.setState({
//                 branchesOptions: allbranchesOptions
//             })

//         }).catch(function (error) {
//             alert(error.message);
//             console.log(error)
//         })
//     }

//     static defaultProps = {


//     }

//     handleAddP(e) {

//         console.log("WoHOOOOOOOOOOOOOOOO");
//         ReactRouter.goTo("/AddDriverPapers")

//         e.preventDefault();
//     }
//     voo(event) {

//         var file = event.target.files[0];
//         this.setState({
//             img: file,
//         })
//     }

//     handleDayoptions(type, value) {
//         this.setState({ [type]: value });
//         if (value) {
//             dayID = value.value;
//         } else {
//             dayID = "";
//         }

//         console.log(value);
//         console.log(dayID);
//     }

//     handleMonthoptions(type, value) {
//         this.setState({ [type]: value });
//         if (value) {
//             monthID = value.value;
//         } else {
//             monthID = "";
//         }

//         console.log(value);
//         console.log(monthID);
//     }

//     handleBranchoptions(type, value) {
//         console.log(value.value)
//         this.setState({ [type]: value.value });
//     }

//     handleDayoptionsE(type, value) {
//         this.setState({ [type]: value });
//         if (value) {
//             dayIDE = value.value;
//         } else {
//             dayIDE = "";
//         }

//         console.log(value);
//         console.log(dayIDE);
//     }

//     handleMonthoptionsE(type, value) {
//         this.setState({ [type]: value });
//         if (value) {
//             monthIDE = value.value;
//         } else {
//             monthIDE = "";
//         }

//         console.log(value);
//         console.log(monthIDE);
//     }

//     handleYearoptionsE(type, value) {
//         this.setState({ [type]: value });
//         if (value) {
//             yearIDE = value.value;
//         } else {
//             yearIDE = "";
//         }
//         this.handleBirthday()
//         console.log(value);
//         console.log(yearIDE);
//     }

//     handleBirthday() {
//         console.log(yearID, monthID - 1, dayID)
//         this.setState({
//             birthdaydate: new Date(yearID).getTime(),
//             birthdaydateE: new Date(yearIDE).getTime(),
//             endday: "sadjkhasdk"
//         });
//         console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
//     }

//     handleVehicleType1(value) {
//         this.setState({
//             vehicleTypee: "tricycle",
//             TricycleActive: "active",
//             MotocycleActive: "not",
//             TokTokActive: "not"
//         })
//         console.log("tricycle")
//     }

//     handleVehicleType2(value) {
//         this.setState({
//             vehicleTypee: "motorcycle",
//             TricycleActive: "not",
//             MotocycleActive: "active",
//             TokTokActive: "not"
//         })
//         console.log("motorcycle")
//     }

//     handleVehicleType3(value) {
//         this.setState({
//             vehicleTypee: "toktok",
//             TricycleActive: "not",
//             MotocycleActive: "not",
//             TokTokActive: "active"
//         })
//         console.log("toktok")
//     }

//     logOut() {
//         console.log("log out");
//         var myItem = localStorage.getItem('baseURL');
//         localStorage.clear();
//         localStorage.setItem('baseURL', myItem);
//         ReactRouter.goTo('/Login');
//     }


//     handlePromo(e) {

//         console.log("WoHOOOOOOOOOOOOOOOO");
//         ReactRouter.goTo("/Promo")

//         e.preventDefault();
//     }

//     handleDrivers(e) {

//         console.log("WoHOOOOOOOOOOOOOOOO");
//         ReactRouter.goTo('/DashBoard')

//         e.preventDefault();
//     }
//     handleSubmit(e) {
//         var that = this;
//         { this.handleBirthday() }
//         console.log("asdasd");
//         if (false) {

//         }
//         else {
//             console.log(this.state.branch, "branch")
//             var object = {
//                 firstName: this.refs.Name.value,
//                 phoneNumber: this.refs.Number.value,
//                 password: this.refs.Password.value,
//                 email: this.refs.email.value,
//                 agentNumber: this.refs.agentNumber.value,
//                 branch: this.state.branch,
//                 isSpecialist: true,
//                 isAdmin: false,
//                 isFinance: false,
//                 isSuperAdmin: false,
//                 isSupport: false
//             }
//             console.log(object)
//             axios.post("/operator/createSpecialist", object).then(function (response) {
//                 console.log(response.data.data, "createSpecialist Response")
//                 var x = response.data.data;
//             }).catch(function (error) {
//                 alert(error.message, "what");
//                 console.log(error.message)
//             })

//         }
//     }
//     handleBack(e) {
//         console.log("WoHOOOOOOOOOOOOOOOO");
//         ReactRouter.goTo("/DashBoard")
//         e.preventDefault();
//     }
//     NumericMethod(e) {
//         const re = /[0-9]+/g;
//         if (!re.test(e.key)) {
//             e.preventDefault();
//         }
//     }

//     CharactersMethod(e) {
//         const re = /[a-zA-Z]+/g;
//         if (!re.test(e.key)) {
//             e.preventDefault();
//         }
//     }
//     render() {
//         const customStyles = {
//             overlay: {
//                 background: "transparent"
//             },
//             content: {
//                 top: '30%',
//                 marginLeft: '35%',
//                 marginRight: '35%',
//                 left: "0px",
//                 right: "0px",
//                 bottom: 'auto',
//                 width: '30%',
//                 borderRadius: '10px',
//                 border: "2px solid #cbcbcb",
//                 padding: "0px"
//             },
//         };
//         return (
//             <div>



//                 <Modal
//                     isOpen={this.state.loginErrorModal}
//                     onRequestClose={this.closeModal.bind(this, "loginErrorModal")}
//                     style={customStyles}
//                 >
//                     <div>
//                         <span className="modalXButton" onClick={this.closeModal.bind(this, "loginErrorModal")}>&times;</span>
//                         <br />
//                         <div style={{ width: "100%", textAlign: "-webkit-center" }}>
//                             <img style={{ width: "20%" }} src="./redX.png" />
//                             <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width: "80%" }}>{this.state.missingRequiredFields}</div>
//                             <input type="button" value="حاول مرة أخرى" className="modalButton" onClick={this.closeModal.bind(this, "loginErrorModal")} />
//                         </div>
//                     </div>
//                 </Modal>

//                 <div className="Navdiv">
//                     <ul className="NavdivUl">
//                         <li className="Header Logo"><img src="/Group 11.png" alt="Header Logo" /></li>
//                         <li className="active li"><a className="active" >السائقين</a></li>
//                         <li><a >رحلات</a></li>
//                         <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
//                         <li><a >دعم</a></li>
//                         <li><a >تقارير</a></li>
//                         <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
//                     </ul>
//                 </div>

//                 <div className="CreateBigDiv">
//                     <div className="Allnew">
//                         <Select
//                             ref="branch"
//                             placeholder="فرع"
//                             value={this.state.branch}
//                             options={this.state.branchesOptions}
//                             onChange={this.handleBranchoptions.bind(this, "branch")}
//                         />
//                     </div>

//                     <input ref="third" type="text" placeholder="hey" onKeyPress={(e) => this.CharactersMethod(e)} />
//                     <input ref="fourth" type="text" onKeyPress={(e) => this.NumericMethod(e)} />
//                 </div>
//                 <br /><br />

//                 <div className="buttonTT">
//                     <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
//                 </div>
//             </div>
//         );
//     }
// }

// export default Test;



//   /* ReactRouter.goTo('/createUser');*/


















































import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SkyLight from 'react-skylight';
import 'react-datepicker/dist/react-datepicker.css';
var ReactRouter = require('flux-react-router');

let imgStyle;
let divStyle;

class Test extends Component {

    constructor() {
        super();
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('sessionToken');
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    }

    componentWillMount() {


        this.setState({
            startday: 0,
            endday: 0,
            startmonth: 0,
            endmonth: 0,
            startyear: 0,
            endyear: 0,
            ready: true,
            startDate: "",
            endDate: "",
            data: [],
            totalMoney: 0,
            totalTrips: 0,
            SpecifiedAmount: 0,
        })


    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date,
            openStart: false
        });
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date,
            openEnd: false
        });
    }

    hey() {
        document.getElementById("Print").onclick = this.printElement(document.getElementById("printThis"));
        // this.printElement(document.getElementById("Print").onclick)
        console.log("homaso")

    }
    printElement(elem) {
        var domClone = elem.cloneNode(true);
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
        $printSection.innerHTML = "";
        $printSection.appendChild(domClone);
        window.print();
        console.log("homaso homaso")
    }



    render() {
        var sky = {
            width: '50%',
            height: '45%',
            top: '40%',
            left: 'none',
        };
        if (this.state) {
            return (
                <div>
                    <div className="Navdiv">
                        <ul className="NavdivUl">
                            <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
                            <li className="active li"><a onClick={() => { ReactRouter.goTo('/DashBoard') }}>السائقين</a></li>
                            {/*}<li><a >رحلات</a></li>{*/}
                            <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
                            <li><a >دعم</a></li>
                            <li><a className="active" onClick={() => { ReactRouter.goTo('/Reports') }}>تقارير</a></li>
                            <li><a onClick={() => { ReactRouter.goTo('/Branches') }}>فروع</a></li>
                            <li><a onClick={() => { ReactRouter.goTo('/Specialists') }}>الأخصائيين</a></li>
                            <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
                        </ul>
                    </div>

                    <div style={{ color: "#2C2D72", textAlign: "center", fontSize: "25px", marginTop: "15px", marginBottom: "15px" }}>تاريخ الرحلات</div>

                    <div style={{}}>
                        <div style={{ width: "100%", textAlign: "center", color: "#2C2D72", display: "-webkit-inline-box", textAlign: "-webkit-center" }}>
                            {this.showStartDate()}
                            <img src="calendar2.png" style={{ cursor: "pointer", verticalAlign: "middle", width: "40px" }} onClick={() => { this.setState({ openStart: true }) }} />&nbsp;&nbsp;<span style={{ marginLeft: "20px", fontSize: "18px" }}>من</span>


                            {this.state.openStart &&
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDateChange.bind(this)}
                                    dateFormat="DD/MM/YYYY"
                                    inline
                                    showYearDropdown
                                    showMonthDropdown
                                    withPortal
                                    onClickOutside={() => { this.setState({ openStart: false }) }}
                                />
                            }

                        </div>
                        <div style={{ width: "100%", textAlign: "center", color: "#2C2D72", display: "-webkit-inline-box", textAlign: "-webkit-center" }}>
                            {this.showEndDate()}


                            <img src="calendar2.png" style={{ cursor: "pointer", verticalAlign: "middle", width: "40px" }} onClick={() => { this.setState({ openEnd: true }) }} />&nbsp;&nbsp;<span style={{ marginLeft: "20px", fontSize: "18px" }}>إلى</span>

                            {this.state.openEnd &&
                                <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleEndDateChange.bind(this)}
                                    dateFormat="DD/MM/YYYY"
                                    inline
                                    showYearDropdown
                                    showMonthDropdown
                                    withPortal
                                    onClickOutside={() => { this.setState({ openEnd: false }) }}
                                />
                            }
                        </div>


                    </div>

                    <div style={{ width: "100%", textAlign: "center" }}>
                        <input type="button" value="عرض بيانات" onClick={this.submit.bind(this)} className="gradientButton" style={{ cursor: "pointer", border: "none", padding: "0px 20px", borderRadius: "25px", marginTop: "50px", fontSize: "18px", color: "white", fontFamily: "Cairo" }} />

                    </div>

                    <table style={{ width: "50%", paddingLeft: "15%", paddingRight: "15%,", border: "0px", paddingTop: "5%", paddingBottom: "5%", height: "567px", display: "table-cell", }}>
                        <thead>
                            {<td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px" }}>سداد</td>}
                            {/* <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px" }}>إجمالي السداد</td> */}
                            {<td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px", paddingLeft: "75px" }}>إجمالي السداد</td>}
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px", paddingLeft: "75px" }}>عدد الرحلات</td>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px", paddingLeft: "75px" }}>نوع المركبة</td>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px", paddingLeft: "75px" }}>تقييم</td>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px", paddingLeft: "75px" }}>رقم الهاتف</td>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px", paddingLeft: "75px" }}>السائق</td>
                        </thead>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>

                    <div className="TotalDiv">
                        <p className="TotalP" >Total Trips:   {this.state.totalTrips}</p>
                        <p className="TotalP">Total Money:   {this.state.totalMoney}</p>

                    </div>

                    <SkyLight hideOnOverlayClicked ref="PaymentDialog" dialogStyles={sky}>
                        <div className="PopClassReports">

                            <div className="block">
                                <input type="radio" name="AmountRadio" value="FullAmountRadio" className="blockRadio"
                                    checked={this.state.AmountRadio === "FullAmountRadio"}
                                    onChange={this.handleChange.bind(this)} />
                                {/* <input type="radio" name="radgroup" value="A"/> */}
                                <p className="blockP">Full Payment </p>
                                <input type="text" className="blockTextImput" value={this.state.DriverToPay} />
                            </div>
                            <div className="block">
                                <input type="radio" name="AmountRadio" value="SpecifiedAmountRadio" className="blockRadio"
                                    checked={this.state.AmountRadio === "SpecifiedAmountRadio"}
                                    onChange={this.handleChange.bind(this)} />
                                {/* <input type="radio" name="radgroup" value="B"/> */}
                                <p className="blockP">Specify Amount  </p>
                                {/* <input type="text" className="blockTextImput" value={this.state.SpecifiedAmount} onChange={this.handleOnChange.bind(this, "SpecifiedAmount")}/> */}
                                <input type="text" className="blockTextImput" name="SpecifiedAmount" value={this.state.SpecifiedAmount} onChange={this.handleChange.bind(this)} />
                            </div>

                            <div className="buttonReports">
                                <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.UpdateDriverPayment.bind(this)} />
                                {/*onClick={this.handleSubmit.bind(this)}*/}
                            </div>
                        </div>

                    </SkyLight>


                    {/* <SkyLight hideOnOverlayClicked ref="PrintDialog" dialogStyles={sky}>
                        <div className="PopClassReports">
                            <div className="block">
                                <input type="radio" name="AmountRadio" value="FullAmountRadio" className="blockRadio"
                                    checked={this.state.AmountRadio === "FullAmountRadio"}
                                    onChange={this.handleChange.bind(this)} />
                                <p className="blockP">Full Payment </p>
                                <input type="text" className="blockTextImput" value={this.state.DriverToPay} />
                            </div>
                            <div className="block">
                                <input type="radio" name="AmountRadio" value="SpecifiedAmountRadio" className="blockRadio"
                                    checked={this.state.AmountRadio === "SpecifiedAmountRadio"}
                                    onChange={this.handleChange.bind(this)} />
                                <p className="blockP">Specify Amount  </p>
                                <input type="text" className="blockTextImput" name="SpecifiedAmount" value={this.state.SpecifiedAmount} onChange={this.handleChange.bind(this)} />
                            </div>

                            <div className="buttonReports">
                                <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.UpdateDriverPayment.bind(this)} />
                            </div>
                        </div>
                    </SkyLight> */}
                </div>
            )
        }
    }
    handleOnChange(type, value) {
        this.setState({ [type]: value });
        console.log("type: ", type, " value: ", value)
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.name, "name", e.target.value, "value")
    }
    showStartDate() {
        if (this.state.startDate) {
            var date = new Date(this.state.startDate._d)
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return (
                <div style={{ marginTop: "10px", marginBottom: "10px", display: "-webkit-inline-box" }}>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight: "5px", marginLeft: "5px", borderRadius: "10px", border: "2px solid #ccc" }}>{day}</span>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight: "5px", marginLeft: "5px", borderRadius: "10px", border: "2px solid #ccc" }}>{month}</span>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight: "5px", marginLeft: "5px", borderRadius: "10px", border: "2px solid #ccc" }}>{year}</span>

                </div>
            )
        }
    }
    showEndDate() {
        if (this.state.endDate) {
            var date = new Date(this.state.endDate._d)
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return (
                <div style={{ marginTop: "10px", marginBottom: "10px", display: "-webkit-inline-box" }}>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight: "5px", marginLeft: "5px", borderRadius: "10px", border: "2px solid #ccc" }}>{day}</span>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight: "5px", marginLeft: "5px", borderRadius: "10px", border: "2px solid #ccc" }}>{month}</span>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight: "5px", marginLeft: "5px", borderRadius: "10px", border: "2px solid #ccc" }}>{year}</span>

                </div>
            )
        }
    }

    submit() {
        console.log(new Date(this.state.startDate._d).valueOf());
        var start = new Date(this.state.startDate._d).valueOf();
        var end = new Date(this.state.endDate._d).valueOf()
        var that = this;
        var reponseData = [];
        var total = 0;
        var trips = 0;
        var objects = [];
        console.log(this.state.endDate)
        axios.get('/operator/gettrips?from=' + start + '&to=' + end).then(function (response) {
            console.log(response)
            response.data.data.forEach(function (item, index) {
                // console.log(item)
                if (item._id[0]) {
                    objects.push(item)
                    total = total + item.total
                    trips = trips + item.count
                }
            })
            that.setState({
                data: objects,
                totalMoney: total,
                totalTrips: trips

            })
        }).catch(function (error) {
            console.log(error)
        })
    }

    handleSelectChange(value) {
        this.setState({
            type: value
        })
        console.log(value);
    }

    createTable() {
        var that = this;
        if (this.state.data.length) {
            return (
                this.state.data.map(function (row) {
                    // console.log(row)
                    var imageURL;
                    var imageURL2 = "greenTick.png";
                    if (row.vehicleType === "motorcycle") {
                        imageURL = "Group 1522.png"
                    } else if (row.vehicleType === "toktok") {
                        imageURL = "Group 1523.png"
                    } else {
                        imageURL = "Group 1524.png"
                    }
                    var rating = "";
                    var number = "";
                    var name = "";
                    var ID;
                    var Total = row.total / 5;
                    if (row._id[0]._id) {
                        ID = row._id[0]._id;
                        // console.log(ID, "ID")
                    }
                    if (row._id.length) {
                        rating = row._id[0].rating.toFixed(1) + "  "
                        number = row._id[0].phoneNumber
                        name = row._id[0].firstName;
                    }
                    return (
                        <tr>
                            {<td><img src={imageURL2} style={{ paddingTop: "6px", width: "15%" }} onClick={() => that.qq.apply(that, [this, row])} /></td>}
                            <td>{Total}</td>
                            <td>{row.count}</td>
                            <td><img src={imageURL} style={{ paddingTop: "6px" }} /></td>
                            <td>{rating}<img src="Path 1236.png" style={{ paddingLeft: "0px" }} /></td>
                            <td>{number}</td>
                            <td>{name}</td>
                        </tr>
                    )
                })
            )
        }
    }
    qq(event, row) {
        console.log("hey")
        this.setPromoData(event,row,row._id[0]._id, row.total / 5)
        this.refs.PaymentDialog.show()
    }
    handlePayment(event, ID) {
        console.log("hello")
        console.log(event, "event")
        // console.log(amount,"amount")
    }
    setPromoData(event,row, index, amount) {
        var that = this;
        console.info("in the rtight funciton")
        console.log(event,row, index, amount, "event,row,  index", "amount")
        var id = index;
        var amountt = amount;
        this.setState({
            DriverID: id,
            DriverToPay: amountt,
            row: row
        })


    }

    UpdateDriverPayment() {
        var amount;
        if (this.state.AmountRadio === "SpecifiedAmountRadio") {
            amount = parseInt(this.state.SpecifiedAmount)
        }
        else if (this.state.AmountRadio === "FullAmountRadio") {
            amount = parseInt(this.state.DriverToPay)
        }
        var object = {
            driverId: this.state.DriverID,
            amount: amount
        }
        axios.post("/operator/receivePayment", object).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

    handlePromo() {
        ReactRouter.goTo('/Promo')
    }

    handleDrivers() {
        ReactRouter.goTo('/DashBoard')
    }

    logOut() {
        var myItem = localStorage.getItem('baseURL');
        localStorage.clear();
        localStorage.setItem('baseURL', myItem);
        ReactRouter.goTo('/Login');
    }
}

export default Test;


















// hey() {
//     document.getElementById("Print").onclick = this.printElement(document.getElementById("printThis"));
//     // this.printElement(document.getElementById("Print").onclick)
//     console.log("homaso")

// }
// printElement(elem) {
//     var domClone = elem.cloneNode(true);
//     var $printSection = document.createElement("div");
//     $printSection.id = "printSection";
//     document.body.appendChild($printSection);
//     $printSection.innerHTML = "";
//     $printSection.appendChild(domClone);
//     window.print();
//     console.log("homaso homaso")
// }