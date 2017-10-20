import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SkyLight from 'react-skylight';
import 'react-datepicker/dist/react-datepicker.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
var ReactRouter = require('flux-react-router');


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





    tabs() {
        //console.log(this.state)
        return (

            <div id="tabss">
                <Tabs>
                    <TabList>
                        <Tab >تاريخ الرحلات</Tab>
                        <Tab >عدد السائقين</Tab>
                        <Tab >عدد الرحلات</Tab>
                    </TabList>


                    <div id="tabspanels">
                        <TabPanel>


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

                            <table style={{ width: "50%", paddingLeft: "25%", paddingRight: "25%,", border: "0px", paddingTop: "5%", paddingBottom: "5%", height: "567px", display: "table-cell", }}>
                                <thead>
                                    {<td style={{ border: "0px", fontSize: "20px", paddingBottom: "10px" }}>سداد</td>}
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



                        </TabPanel>


                        <TabPanel>


                        </TabPanel>


                        <TabPanel>

                        </TabPanel>
                    </div>
                </Tabs>
            </div>

        )
    }






    render() {
        var sky = {
            width: '50%',
            height: '40%',
            top: '40%',
            // overflow: 'scroll',
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



                    {this.tabs()}



                    <SkyLight hideOnOverlayClicked ref="PaymentDialog" dialogStyles={sky}>
                        <div className="PopClassReports">

                            <div className="block7">
                                <input type="radio" name="AmountRadio" value="FullAmountRadio" className="blockRadio"
                                    checked={this.state.AmountRadio === "FullAmountRadio"}
                                    onChange={this.handleChange.bind(this)} />
                                {/* <input type="radio" name="radgroup" value="A"/> */}
                                <p className="blockP">المبلغ بالكامل</p>
                                <input type="text" className="blockTextImput" value={this.state.DriverToPay} />
                            </div>
                            <div className="block9">
                                <input type="radio" name="AmountRadio" value="SpecifiedAmountRadio" className="blockRadio"
                                    checked={this.state.AmountRadio === "SpecifiedAmountRadio"}
                                    onChange={this.handleChange.bind(this)} />
                                {/* <input type="radio" name="radgroup" value="B"/> */}
                                <p className="blockP">حدد المبلغ</p>
                                {/* <input type="text" className="blockTextImput" value={this.state.SpecifiedAmount} onChange={this.handleOnChange.bind(this, "SpecifiedAmount")}/> */}
                                <input type="text" className="blockTextImput" name="SpecifiedAmount" value={this.state.SpecifiedAmount} onChange={this.handleChange.bind(this)} />
                            </div>

                            <div className="buttonReports">
                                <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.UpdateDriverPayment.bind(this)} />
                                {/*onClick={this.handleSubmit.bind(this)}*/}
                            </div>
                        </div>

                    </SkyLight>


                    <SkyLight hideOnOverlayClicked ref="ReceiptDialog" dialogStyles={sky}>
                        <div className="PopClassReports">
                            <div className="poppyImg" >
                                <img src="/Group 11.png" id="ReceiptDialogImg" />  <p className="poppy p7" >{this.state.currentTime}</p>
                            </div>
                            <div className="poppy2" >
                                <p className="poppy p6" >الفاتورة</p>
                            </div>

                            <div className="poppy" >
                                <p className="poppy p3" >الإسم</p>      <p className="poppy p" >{this.state.DriverName}</p>
                            </div>

                            <div className="poppy3" >
                                <p className="poppy p5" >الفرع</p>       <p className="poppy p" >{this.state.DriverBranchName}</p>
                            </div>
                            <div className="poppy" >
                                <p className="poppy p2" >رقم الهاتف</p>       <p className="poppy p" >{this.state.DriverNumber}</p>
                            </div>

                            <div className="poppy3" >
                                <p className="poppy p5" >  من : </p> <p className="poppy p" >{'\u00A0'} {this.state.StartTime}{'\u00A0'}    -   {'\u00A0'} {this.state.EndTime} </p>
                                {/* <p className="poppy p" >{this.state.DriverName}</p> */}
                            </div>

                            <div className="poppy" >
                                <p className="poppy p2" >عدد الرحلات</p>      <p className="poppy p" >{this.state.DriverTripsCount}</p>
                            </div>

                            <div className="poppy" >
                                <p className="poppy p2" >تم سداد</p>       <p className="poppy p" >{this.state.DriverCredit}</p>
                            </div>
                        </div>

                    </SkyLight>
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
        var CurrentTime = new Date

        var YearCurrent = CurrentTime.getFullYear();
        var MonthCurrent = CurrentTime.getMonth() + 1;
        var DayCurrent = CurrentTime.getDate();
        var formattedTimeCurrent = YearCurrent + '/' + MonthCurrent + '/' + DayCurrent;

        var that = this;
        var reponseData = [];
        var total = 0;
        var trips = 0;
        var objects = [];
        console.log(start)
        console.log(end)


        var dateStart = new Date(start);
        var YearStart = dateStart.getFullYear();
        var MonthStart = dateStart.getMonth() + 1;
        var DayStart = dateStart.getDate();
        var formattedTimeStart = YearStart + '/' + MonthStart + '/' + DayStart;

        var dateEnd = new Date(end);
        var YearEnd = dateEnd.getFullYear();
        var MonthEnd = dateEnd.getMonth() + 1;
        var DayEnd = dateEnd.getDate();
        var formattedTimeEnd = YearEnd + '/' + MonthEnd + '/' + DayEnd;




        var dateBeggining = new Date(0).valueOf();


        var datenow = new Date().valueOf();



        console.log(datenow, "datenow", dateBeggining, "datebeggin")


        console.log(start, end)
        axios.get('/operator/gettrips?from=' + start + '&to=' + end).then(function (response) {
            // axios.get('/operator/gettrips?from=' + dateBeggining + '&to=' + datenow).then(function (response) {
            // axios.get('/operator/gettrips').then(function (response) {
            console.log(response)
            response.data.data.forEach(function (item, index) {
                console.log(item)
                if (item._id) {
                    console.log("has ID")
                    if ((item.total / 5) - item._id.credit > 0) {
                        console.log("all good")
                        objects.push(item)
                        total = total + item.total
                        trips = trips + item.count
                    }
                }
            })
            that.setState({
                data: objects,
                totalMoney: total,
                totalTrips: trips,
                StartTime: formattedTimeStart,
                EndTime: formattedTimeEnd,
                currentTime: formattedTimeCurrent,

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
                this.state.data.map(function (row, index) {
                    // console.log(row, 'row ====== >')
                    // console.log(row)
                    var imageURL;
                    var imageURL2 = "greenTick.png";
                    if (row.vehicleType === "motorcycle") {
                        imageURL = "Group 1523.png"
                    } else if (row.vehicleType === "toktok") {
                        imageURL = "Group 1522.png"
                    } else {
                        imageURL = "Group 1524.png"
                    }
                    var rating = "";
                    var number = "";
                    var name = "";
                    var ID;
                    var Total = row.total / 5;
                    Total = Total - row._id.credit;
                    if (row._id._id) {
                        ID = row._id._id;
                        // console.log(ID, "ID")
                    }
                    if (row._id.length) {
                        // rating = row._id.rating.toFixed(1) + "  "
                        // number = row._id.phoneNumber
                        // name = row._id.firstName;
                    }
                    rating = row._id.rating.toFixed(1) + "  "
                    number = row._id.phoneNumber
                    name = row._id.firstName;
                    console.log(number, name, "number, name");
                    return (
                        <tr>
                            {<td><img src={imageURL2} style={{ paddingTop: "6px", width: "15%" }} onClick={() => that.qq.apply(that, [this, index, row])} /></td>}
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
    qq(event, indexx, row) {
        console.log("hey")
        var branchname;
        if (row._id.operator) {
            if (row._id.operator.branch) {
                if (row._id.operator.branch.name) {
                    branchname = row._id.operator.branch.name
                }
            }
        }
        else {
            branchname = "undefined"
        }
        console.log(branchname, "branchname")
        console.log(event, row, indexx, "event,row,index")
        this.setPromoData(event, row._id._id, (row.total / 5) - row._id.credit, row.count, row._id.credit, row._id.firstName, branchname, indexx, row._id.phoneNumber)
        this.refs.PaymentDialog.show()
    }
    handlePayment(event, ID) {
        console.log("hello")
        console.log(event, "event")
        // console.log(amount,"amount")
    }
    setPromoData(event, index, amount, count, credit, name, branchname, indexx, phoneNumber) {
        var that = this;
        console.info("in the rtight funciton")
        // console.log(this.state.data,"this.state.data")
        // var objArray = this.state.data;
        // console.log(objArray[this.state.index]._id[0].credit, "objArray[this.state.index]._id[0].credit")
        // console.log(objArray[indexx], "objArray[indexx]")
        // console.log(objArray[indexx]._id[0].credit, "objArray[indexx]._id[0].credit")
        // console.log(objArray, "objArray")
        console.log(event, index, amount, count, credit, name, "event, index, amount,count,credit,name")
        var id = index;
        var amountt = amount;
        var countt = count;
        var creditt = credit;
        var namee = name;
        var branchnamee = branchname;
        var index = indexx;
        var phoneNumberr = phoneNumber;
        this.setState({
            DriverID: id,
            DriverToPay: amountt,
            DriverTripsCount: countt,
            DriverCredit: credit,
            DriverName: namee,
            DriverBranchName: branchnamee,
            index: indexx,
            DriverNumber: phoneNumberr

        })


    }

    UpdateDriverPayment() {
        var amount;
        var that = this;
        var objArray = this.state.data;
        amount = parseInt(this.state.SpecifiedAmount)

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
        console.log(objArray, "objArray before  ")
        console.log(this.state.index, "this.state.index")
        console.log(amount, "ammount");
        console.log(objArray[this.state.index]._id.credit, "objArray[this.state.index]._id.credit before");
        objArray[this.state.index]._id.credit = objArray[this.state.index]._id.credit + amount;
        console.log(objArray[this.state.index]._id.credit, "objArray[this.state.index]._id.credit after");
        console.log(objArray, "objArray after")
        axios.post("/operator/receivePayment", object).then(function (response) {
            console.log(response)
            console.log(that.state.data)
            that.setState({
                DriverCredit: that.state.DriverCredit + amount,
                data: objArray,
            }, () => {
                that.refs.ReceiptDialog.show()
                that.refs.PaymentDialog.hide()
            })

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




    submit() {
            
        // var CurrentTime = new Date

        // var YearCurrent = CurrentTime.getFullYear();
        // var MonthCurrent = CurrentTime.getMonth() + 1;
        // var DayCurrent = CurrentTime.getDate();
        // var formattedTimeCurrent = YearCurrent + '/' + MonthCurrent + '/' + DayCurrent;

        var that = this;
        var reponseData = [];
        var total = 0;
        var trips = 0;
        var objects = [];
        // console.log(start)
        // console.log(end)


        // var dateStart = new Date(start);
        // var YearStart = dateStart.getFullYear();
        // var MonthStart = dateStart.getMonth() + 1;
        // var DayStart = dateStart.getDate();
        // var formattedTimeStart = YearStart + '/' + MonthStart + '/' + DayStart;

        // var dateEnd = new Date(end);
        // var YearEnd = dateEnd.getFullYear();
        // var MonthEnd = dateEnd.getMonth() + 1;
        // var DayEnd = dateEnd.getDate();
        // var formattedTimeEnd = YearEnd + '/' + MonthEnd + '/' + DayEnd;




        var dateBeggining = new Date(0).valueOf();


        var datenow = new Date().valueOf();



        console.log(datenow, "datenow", dateBeggining, "datebeggin")


        // console.log(start, end)
        // axios.get('/operator/gettrips?from=' + start + '&to=' + end).then(function (response) {
            axios.get('/operator/gettrips?from=' + dateBeggining + '&to=' + datenow).then(function (response) {
            // axios.get('/operator/gettrips').then(function (response) {
            console.log(response)
            response.data.data.forEach(function (item, index) {
                console.log(item)
                if (item._id) {
                    console.log("has ID")
                    if ((item.total / 5) - item._id.credit > 0) {
                        console.log("all good")
                        objects.push(item)
                        total = total + item.total
                        trips = trips + item.count
                    }
                }
            })
            that.setState({
                data: objects,
                totalMoney: total,
                totalTrips: trips,
                // StartTime: formattedTimeStart,
                // EndTime: formattedTimeEnd,
                // currentTime: formattedTimeCurrent,

            })
        }).catch(function (error) {
            console.log(error)
        })
    }



    // akteb 
    // al 
    // funcitons 
    // beto3ak
    //  hena
    
}

export default Reports;