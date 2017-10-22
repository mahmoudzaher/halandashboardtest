import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {CSVLink, CSVDownload} from 'react-csv';
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
            objects: [],
            alloprators: [],
            drivercounter: [],
            drivercounter2: [],
            allbranchs:[],
            sel: 0,
            countt:0,
            csvdata1:[],
            toktoks:[],
            motors:[],
            toktoks1:[],
            motors1:[],


        })
        this.driversapi();
      
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
                            {<div className="showdrivers">
                            <div  className="radiodivs" >
                            <div className="newlab" >
                            <label  className="totallabel" >
                                اجمالي عدد السائقين  {this.state.objects.length}                                        
                            </label>
                            </div>
                                <div className="radio">
                                    <label>
                                        كل اخصائي
                                        <input type="radio" value="option1" name="myGroupName" onClick={()=>{this.setState({sel:1,})}} />
                                       
                                       </label>
                                </div>
                                <div className="radio1">
                                       <label>
                                           كل فرع
                                        <input type="radio" value="option2" name="myGroupName" onClick={()=>{this.setState({sel:2,})}} />
                                        
                                      </label>
                                       </div>
                                  
                         
                            </div >                                     
                            {this.handleradio() }
                            {/* {<button onClick={()=>{this.loadda()}} >هنا</button>} */}
                            <CSVLink  data={this.state.csvdata1} onClick={()=>{this.loadda()}}  >تحميل التقرير</CSVLink>
                            </div>
                           }
                           
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


//---------------------------------------------------

    driversapi() {
        var that = this;
        axios.get('/operator/getalldrivers').then(function (response) {
            var x = response.data.data;
            
            var objects = [];
            var oprats = [];
            var opids = [];
            var countrs = [];
            var counttoktok=[];
            var countmotor=[];
            var counttoktok1=[];
            var countmotor1=[];
            var countrs2=[];
            var branchs = [];
            var brids = [];
            x.forEach(function (item, index) {
                objects.push(item);
                if (!opids.includes(item.operator._id)) {
                    oprats.push(item.operator);
                    opids.push(item.operator._id);
                    countrs.push(0);
                    counttoktok.push(0);
                    countmotor.push(0);
                }
                if (!brids.includes(item.operator.branch._id)) {
                    branchs.push(item.operator.branch);
                    brids.push(item.operator.branch._id);
                    countrs2.push(0);
                    counttoktok1.push(0);
                    countmotor1.push(0);
                }
            })
            x.forEach(function (item, index) {
                if (opids.includes(item.operator._id)) {
                    var a = opids.indexOf(item.operator._id);
                    countrs[a]++;
                    if(item.vehicle && item.vehicle[0]){
                    if(item.vehicle[0].vehicletype==="motorcycle"){   
                       
                        countmotor[a]++;
                    }
                    else if(item.vehicle[0].vehicletype==="toktok"){
                        
                        counttoktok[a]++;
                    }
                }
                   
                }
                if (brids.includes(item.operator.branch._id)) {
                    var a = brids.indexOf(item.operator.branch._id);
                    countrs2[a]++;
                    if(item.vehicle && item.vehicle[0]){
                        if(item.vehicle[0].vehicletype==="motorcycle"){   
                           
                            countmotor1[a]++;
                        }
                        else if(item.vehicle[0].vehicletype==="toktok"){
                            
                            counttoktok1[a]++;
                        }
                    }
                }

            })
          
            console.log("gotalldata")
            that.setState({
                objects: objects,
                alloprators: oprats,
                drivercounter: countrs,
                allbranchs:branchs,
                drivercounter2:countrs2,
               toktoks:counttoktok,
               motors:countmotor,
               toktoks1:counttoktok1,
               motors1:countmotor1,
            })



        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })

     
    }

 
   handleradio() {  
     if(this.state.sel===1){
        
     return(this.tablespecialists())
    }
     if(this.state.sel===2){
     return(this.tablebranches())
}
    }
loadda(){
    var that=this;
   var operators= that.state.alloprators;
   var brachs=that.state.allbranchs;
   if(that.state.sel===1){
    var reportdata=[["motorcyle","tokok","Drivers","Branch","Phone","Name"]];
    var couter=that.state.drivercounter;
    var c1=that.state.toktoks;
    var c2=that.state.motors; 
       operators.forEach(function (item, index) {
    var g=[];
    g.push(c2[index])
    g.push(c1[index])
    g.push(couter[index])
    g.push(item.branch.name)
    if (item.phoneNumber.length < 12) {
        g.push(item.phoneNumber)
    }
    else {
        g.push("-")
    }
    
    g.push(item.firstName) 
    
    reportdata.push(g);
    })
    that.setState({
        csvdata1:reportdata,
    })
   }
   if(that.state.sel===2){
    var reportdata=[["motorcycle","tokok","Drivers","Address","Phone","Name"]];
    var couter=that.state.drivercounter2;
    var c1=that.state.toktoks1;
    var c2=that.state.motors1;
    brachs.forEach(function (item, index) {
    var g=[];
    g.push(c2[index])
    g.push(c1[index])
    g.push(that.state.drivercounter2[index])
    if(item.address)
    {g.push(item.address)} 
    else{
        g.push("-")
    }
     if (item.phone.length < 12) {
         g.push(item.phone)
     }
     else {
         g.push("-")
     }

     g.push(item.name)
    
    reportdata.push(g);
    })
    that.setState({
        csvdata1:reportdata,
    })
}
}

    tablespecialists() {
        var that = this;
        var opreators = that.state.alloprators;
        return (
            React.DOM.table({ className: "tableclass" },
                React.DOM.thead({ className: "tablehead" },
                    <tr className="tableheadrow">
                        <td className="tableheadD"  > <img src="./Group 1355.png"></img></td>
                       <td className="tableheadD"  > <img src="./Group 1367.png"></img></td>
                        <td className="tableheadD" >عدد السائقين</td>

                        <td className="tableheadD" >الفرع</td>

                        <td className="tableheadD" >رقم الهاتف</td>

                        <td className="tableheadDTR" >الإسم</td>
                    </tr>
                ),
                React.DOM.tbody(null,
                    that.state.alloprators.map(function (row, index) {
                        let re = [];   
                        re.push(that.state.motors[index])
                        re.push(that.state.toktoks[index])
                        re.push(that.state.drivercounter[index])
                        re.push(row.branch.name)
                        if (row.phoneNumber.length < 12) {
                            re.push(row.phoneNumber)
                        }
                        else {
                            re.push("-")
                        }

                        re.push(row.firstName)    
                        return (
                            <tr key={index}>
                                {
                                    re.map(function (col, index) {
                                        return React.DOM.td({ key: index }, col);
                                    })
                                }
                            </tr>
                        )
                    })
                )
            )
        )

    }
    tablebranches() {
        var that = this;
        var opreators = that.state.allbranchs;
        return (
            React.DOM.table({ className: "tableclass" },
                React.DOM.thead({ className: "tablehead" },
                    <tr className="tableheadrow">
                       <td className="tableheadD"  > <img src="./Group 1355.png"></img></td>
                       <td className="tableheadD"  > <img src="./Group 1367.png"></img></td>
                        <td className="tableheadD" >عدد السائقين</td>

                        <td className="tableheadD" >العنوان</td>

                        <td className="tableheadD" >رقم الهاتف</td>

                        <td className="tableheadDTR" >الإسم</td>
                    </tr>
                ),
                React.DOM.tbody(null,
                    that.state.allbranchs.map(function (row, index) {
                        let re = [];
                        re.push(that.state.motors1[index])
                        re.push(that.state.toktoks1[index])
                        re.push(that.state.drivercounter2[index])
                       if(row.address)
                       {re.push(row.address)} 
                       else{
                           re.push("-")
                       }
                        if (row.phone.length < 12) {
                            re.push(row.phone)
                        }
                        else {
                            re.push("-")
                        }

                        re.push(row.name)
                        return (
                            <tr key={index}>
                                {
                                    re.map(function (col, index) {
                                        return React.DOM.td({ key: index }, col);
                                    })
                                }
                            </tr>
                        )
                    })
                )
            ))

    }
}

export default Reports;