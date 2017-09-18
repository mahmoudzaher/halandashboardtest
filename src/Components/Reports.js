import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
var ReactRouter = require('flux-react-router');

let imgStyle;
let divStyle;

class Reports extends Component {

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
            data: []
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

    render() {
        if (this.state) {
            return (
                <div>
                    <div className="Navdiv">
                        <ul className="NavdivUl">
                            <li className="Header Logo"><img src="/Group 11.png" alt="Header Logo" /></li>
                            <li className="active li" ><a className="" onClick={this.handleDrivers.bind(this)} >السائقين</a></li>
                            <li><a >رحلات</a></li>
                            <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
                            <li><a >دعم</a></li>
                            <li><a className="active">تقارير</a></li>
                            <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
                        </ul>
                    </div>

                    <div style={{}}>
                        <div style={{ width: "100%", textAlign: "center", color:"#2C2D72" }}>
                            <img src="calendar2.png" style={{ cursor: "pointer", verticalAlign:"middle", width:"40px" }} onClick={() => { this.setState({ openStart: true }) }} />&nbsp;&nbsp;<span style={{marginLeft:"20px", fontSize:"18px"}}>من</span>

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

                            {this.showStartDate()}
                        </div>
                        <div style={{ width: "100%", textAlign: "center", color:"#2C2D72" }}>

                            <img src="calendar2.png" style={{ cursor: "pointer", verticalAlign:"middle", width:"40px" }} onClick={() => { this.setState({ openEnd: true }) }} />&nbsp;&nbsp;<span style={{marginLeft:"20px", fontSize:"18px"}}>إلى</span>

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
                            {this.showEndDate()}
                        </div>


                    </div>
                    {/*<div className="Options-GroupsTheyyonew" style={{ display: "-webkit-box", width:"40%", marginLeft:"30%"  }}>
                            <div className="" style={{ float: "none",marginLeft:"5%", marginRight:"5%" }}>
                                <Select
                                    ref="startyear"
                                    placeholder="سنة"
                                    className="menu-outer-top"
                                    value={this.state.startyear}
                                    options={this.state.startyearoptions}
                                    onChange={this.handleSelectChange.bind(this, "startyear")}
                                />
                            </div>

                            <div className="" style={{ float: "none",marginLeft:"5%", marginRight:"5%" }}>
                                <Select
                                    ref="startmonth"
                                    placeholder="شهر"
                                    className="menu-outer-top"
                                    value={this.state.startmonth}
                                    options={this.state.startmonthoptions}
                                    onChange={this.handleSelectChange.bind(this, "startmonth")}
                                />
                            </div>

                            <div className="" style={{ float: "none",marginLeft:"5%", marginRight:"5%" }}>
                                <Select
                                    ref="startday"
                                    placeholder="يوم"
                                    className="menu-outer-top"
                                    value={this.state.startday}
                                    options={this.state.startdayoptions}
                                    onChange={this.handleSelectChange.bind(this, "startday")}
                                />
                            </div>
                        </div>


                        <div className="Options-GroupsTheyyoyonew" style={{ display: "-webkit-box", width:"40%", marginLeft:"30%"  }}>
                            <div className="" style={{ float: "none",marginLeft:"5%", marginRight:"5%" }}>
                                <Select
                                    ref="endyear"
                                    placeholder="سنة"
                                    className="menu-outer-top"
                                    value={this.state.endyear}
                                    options={this.state.endyearoptions}
                                    onChange={this.handleSelectChange.bind(this, "endyear")}
                                />
                            </div>

                            <div className="" style={{ float: "none",marginLeft:"5%", marginRight:"5%" }}>
                                <Select
                                    ref="endmonth"
                                    placeholder="شهر"
                                    className="menu-outer-top"
                                    value={this.state.endmonth}
                                    options={this.state.endmonthoptions}
                                    onChange={this.handleSelectChange.bind(this, "endmonth")}
                                />
                            </div>

                            <div className="" style={{ float: "none",marginLeft:"5%", marginRight:"5%" }}>
                                <Select
                                    ref="endday"
                                    placeholder="يوم"
                                    className="menu-outer-top"
                                    value={this.state.endday}
                                    options={this.state.enddayoptions}
                                    onChange={this.handleSelectChange.bind(this, "endday")}
                                />
                            </div>
                        </div>*/}
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <input type="button" value="حفظ بيانات" onClick={this.submit.bind(this)} className="gradientButton" style={{cursor:"pointer", border: "none", padding: "0px 20px", borderRadius: "25px", marginTop: "50px", fontSize: "18px", color: "white", fontFamily: "Cairo" }} />
                    </div>

                    <table style={{ width: "50%", marginLeft: "25%", border: "0px", marginTop: "100px" }}>
                        <thead>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px" }}>إجمالي السداد</td>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px" }}>عدد الرحلات</td>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px" }}>نوع المركبة</td>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px" }}>تقييم</td>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px" }}>رقم الهاتف</td>
                            <td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px" }}>السائق</td>
                        </thead>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    showStartDate() {
        if (this.state.startDate) {
            var date = new Date(this.state.startDate._d)
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return (
                <div style={{ width: "100%", display: "-webkit-box", textAlign: "-webkit-center", marginTop:"10px", marginBottom:"10px" }}>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight:"5px", marginLeft:"5px", borderRadius:"10px", border:"2px solid #ccc" }}>{day}</span>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight:"5px", marginLeft:"5px", borderRadius:"10px", border:"2px solid #ccc" }}>{month}</span>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight:"5px", marginLeft:"5px", borderRadius:"10px", border:"2px solid #ccc" }}>{year}</span>
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
                <div style={{ width: "100%", display: "-webkit-box", textAlign: "-webkit-center", marginTop:"10px", marginBottom:"10px" }}>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight:"5px", marginLeft:"5px", borderRadius:"10px", border:"2px solid #ccc" }}>{day}</span>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight:"5px", marginLeft:"5px", borderRadius:"10px", border:"2px solid #ccc" }}>{month}</span>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px", marginRight:"5px", marginLeft:"5px", borderRadius:"10px", border:"2px solid #ccc" }}>{year}</span>
                </div>
            )
        }
    }

    submit() {
        console.log(new Date(this.state.startDate._d).valueOf());
        var start = new Date(this.state.startDate._d).valueOf();
        var end = new Date(this.state.endDate._d).valueOf()
        var that = this;
        console.log(this.state.endDate)
        axios.get('/operator/gettrips?from=' + start + '&to=' + end).then(function (response) {
            console.log(response)
            that.setState({
                data: response.data.data
            })
        }).catch(function (error) {
            // that.openModal("loginErrorModal")
            // alert(error.message);
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
        if (this.state.data.length) {
            return (
                this.state.data.map(function (row) {
                    console.log(row)
                    var imageURL;
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
                    if (row._id.length) {
                        rating = row._id[0].rating.toFixed(1) + "  "
                        number = row._id[0].phoneNumber
                        name = row._id[0].firstName;
                    }
                    return (
                        <tr>
                            <td>{row.total}</td>
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

    handlePromo() {

    }

    handleDrivers() {

    }

    logOut() {
        var myItem = localStorage.getItem('baseURL');
        localStorage.clear();
        localStorage.setItem('baseURL', myItem);
        ReactRouter.goTo('/Login');
    }
}

export default Reports;



  /* ReactRouter.goTo('/createUser');*/
