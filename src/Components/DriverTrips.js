import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';
import Select from 'react-select';
import SkyLight from 'react-skylight';
var ReactRouter = require('flux-react-router');
// var stylePropType = require('react-style-proptype');
// var injectTapEventPlugin = require("react-tap-event-plugin");
// injectTapEventPlugin();
// var ImageViewer = require ('react-image-viewer');



let searchArray = [];
let dayID = "";
let monthID = "";
let yearID = "";
let dayIDE = "";
let monthIDE = "";
let yearIDE = "";
let from = "";
let to = "";
let showDate = true;
class DriverTrips extends Component {

    constructor(props) {
        super(props);
        var that = this;
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        this.state = {
            id: this.props.pID,
            driverId: this.props.pID,
            startdayoptions: [],
            startmonthoptions: [],
            startyearoptions: [],
        }

    }

    componentWillMount() {
        var that = this;
        this.setState({
            objects: [],
            searchfilter: "",
            driverRating: "",
            driverName: "",
            startday: null,
            startmonth: null,
            startyear: null,
            endday: null,
            endmonth: null,
            endyear: null,
            birthdaydate: null,
            birthdaydateE: null,
            cash: 0,
            tripsCount: 0,
            greaterThanAll: 15,
            lessThanAll: -1,
        })
        var money = 0;
        var tripscounter = 0;
        axios.post('/operator/getPreviousTripsOfDriver', { "id": this.state.id }).then(function (response) {
            console.log(response.data.data, "getPreviousTripsOfDriver Response")
            var x = response.data.data;
            var objects = [];

            x.forEach(function (item) {
                // console.log(item)
                objects.push(item);
                if (item.tripCost) {
                    money = money + item.tripCost;
                }

                tripscounter = tripscounter + 1;

            })
            that.setState({

                objects: objects,
                cash: money,
                tripsCount: tripscounter
            })

        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })

        console.log(this.state.driverId, "driverID")

        axios.get('/operator/getDriverById?' + "driverId=" + this.state.driverId).then(function (response) {
            console.log(response, "getDriverById Response")
            var x = response.data.data;

            that.setState({

                driverRating: x.rating,
                driverName: x.firstName,

            })

        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })

    }
    nextAll(event) {
        var that = this;
        var length = this.state.objects.length;

        if (this.state.lessThanAll + 15 < length) {
            this.setState({
                lessThanAll: this.state.lessThanAll + 15,
                greaterThanAll: this.state.greaterThanAll + 15,
            })
        }
        else {
            this.setState({
                lessThanAll: this.state.lessThanAll,
                greaterThanAll: this.state.greaterThanAll,
            })
        }
    }

    previousAll(event) {
        var that = this;
        var length = this.state.objects.length;

        if (this.state.lessThanAll > 0) {
            this.setState({
                lessThanAll: this.state.lessThanAll - 15,
                greaterThanAll: this.state.greaterThanAll - 15,
            })
        }
        else {
            this.setState({
                lessThanAll: this.state.lessThanAll,
                greaterThanAll: this.state.greaterThanAll,
            })
        }
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

        console.log(itemIds)
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

    tableActive() {

        var that = this;
        let counter = 0;
        let usedCounter = 0;
        // console.log(this.state.objects);

        return (
            React.DOM.table({ className: "tableclasstwo" },
                React.DOM.thead({ className: "tablehead" },
                    <tr className="tableheadrow">
                        <td className="tableheadDT" >تكلفة الرحلة</td>

                        <td className="tableheadDT" >تقيم</td>

                        <td className="tableheadF" >المدة</td>

                        <td className="tableheadF" >بداية الرحلة</td>

                        <td className="tableheadF" >المسافة</td>

                        <td className="tableheadD" >إلى</td>

                        <td className="tableheadD" >من</td>

                        <td className="tableheadDTR" >رقم الهاتف</td>

                        <td className="tableheadDTR" >العميل</td>

                        <td className="tableheadDTR" >التاريخ</td>
                    </tr>
                ),
                React.DOM.tbody(null,
                    that.state.objects.map(function (row, index) {
                        let re = [];
                        // console.log(row)


                        var datee = new Date(row.date);
                        var Year = datee.getFullYear();
                        var Month = datee.getMonth() + 1;
                        var Day = datee.getDate();
                        var hours = datee.getHours();
                        var minutes = datee.getMinutes();
                        var seconds = datee.getSeconds();
                        var formattedTime = Year + '/' + Month + '/' + Day;




                        var start = new Date(row.tripStartTime);
                        var startYear = start.getFullYear();
                        var startMonth = start.getMonth();
                        var startDay = start.getDay();
                        var starthours = start.getHours();
                        var startminutes = "0" + start.getMinutes();
                        var startseconds = "0" + start.getSeconds();
                        var newStart = starthours + ':' + startminutes.substr(-2) + ':' + startseconds.substr(-2);
                        var startFormattedTime = startDay + '/' + startMonth + '/' + startYear + starthours + ':' + startminutes.substr(-2) + ':' + startseconds.substr(-2);


                        var end = new Date(row.endTime);
                        var endDay = end.getDay();
                        var endMonth = end.getMonth();
                        var endYear = end.getFullYear();
                        var endhours = end.getHours();
                        var endminutes = "0" + end.getMinutes();
                        var endseconds = "0" + end.getSeconds();
                        var endFormattedTime = endDay + '/' + endMonth + '/' + endYear + endhours + ':' + endminutes.substr(-2) + ':' + endseconds.substr(-2);

                        // console.log(newStart, "new Start")
                        // var now = "04/09/2013 15:00:00";
                        // var then = "04/09/2013 14:20:30";
                        moment.utc(moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(start, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
                        var durationtrip = moment.utc(moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(start, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
                        // console.log(moment.utc(moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(start, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"), "duration")
                        // console.log(durationtrip, "duration trip")






                        if (row.user) {


                            if (that.state.lessThanAll < counter && counter < that.state.greaterThanAll) {
                                if (row.user.phoneNumber.includes(that.state.searchfilter)) {
                                    if (that.state.birthdaydate && that.state.birthdaydateE) {
                                        if (that.state.birthdaydate <= row.date && that.state.birthdaydateE >= row.date) {

                                            counter++;
                                            usedCounter++;
                                            re.push(row.tripCost)
                                            re.push(row.userRatingByDriver)
                                            re.push(durationtrip)
                                            re.push(newStart)
                                            if (row.distanceTaken > -1) {
                                                console.log(row.distanceTaken, "distance")
                                                re.push(row.distanceTaken)
                                            }
                                            else {
                                                re.push("-")
                                            }
                                            re.push(row._toString)
                                            re.push(row._fromString)
                                            re.push(row.user.phoneNumber)
                                            re.push(row.user.firstName)
                                            re.push(formattedTime)
                                        }
                                    }
                                    else {
                                        counter++;
                                        usedCounter++;
                                        re.push(row.tripCost)
                                        re.push(row.userRatingByDriver)
                                        re.push(durationtrip)
                                        re.push(newStart)
                                        if (row.distanceTaken >= 0) {
                                            // console.log(row.distanceTaken, "distance")
                                            re.push(row.distanceTaken)
                                        }
                                        else {
                                            re.push("-")
                                        }
                                        re.push(row._toString)
                                        re.push(row._fromString)
                                        re.push(row.user.phoneNumber)
                                        re.push(row.user.firstName)
                                        re.push(formattedTime)
                                    }

                                }
                            } else {
                                counter++;
                            }
                        }
                        var ColImg = "/Path 1236.png";

                        return (
                            <tr key={index}>
                                {
                                    re.map(function (col, index) {
                                        {/*console.log(col,"col")*/ }
                                        if (typeof col === "string" && col.slice(0, 12) === "./Group 1433") {
                                            return <td className="PTDS" key={index} ><img className="tdImg" src={col} onClick={that.SuspendDriver.bind(this, row._id)} /></td>
                                        }


                                        else if (index === 1) {
                                            return <td className="PTDDriver" key={index} >{col} <img className="tdImgDriver" src={ColImg} /></td>
                                        }
                                        else if (index === 1) {
                                            return <td className="PTDDriver" key={index} >{col} <img className="tdImgDriver" src={ColImg} /></td>
                                        }
                                        else if (index === 3) {
                                            return <td className="PTD" key={index}><div className="lolz">{col}</div></td>
                                        }
                                        else if (index === 4) {
                                            return <td className="PTD" key={index}><div className="lolz">{col}</div></td>
                                        }
                                        else {
                                            return <td className="PTD" key={index}><div>{col}</div></td>
                                        }

                                    })
                                }
                            </tr>
                        )

                    })
                )
            ))
    }


    logOut() {
        console.log("log out");
        var myItem = localStorage.getItem('baseURL');
        localStorage.clear();
        localStorage.setItem('baseURL', myItem);
        ReactRouter.goTo('/Login');
    }



    handleUpdate(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/UpdateUser")

        e.preventDefault();
    }



    handlePromo(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/Promo")

        e.preventDefault();
    }

    handleDayoptions(type, value) {
        this.setState({ [type]: value.value });
        if (value) {
            dayID = value.value;
        } else {
            dayID = "";
        }
        // this.handleBirthday()
        console.log(value);
        console.log(dayID);
    }

    handleMonthoptions(type, value) {
        this.setState({ [type]: value.value });
        if (value) {
            monthID = value.value;
        } else {
            monthID = "";
        }
        // this.handleBirthday()
        console.log(value);
        console.log(monthID);
    }

    handleYearoptions(type, value) {
        this.setState({ [type]: value.value });
        if (value) {
            yearID = value.value;
        } else {
            yearID = "";
        }
        // this.handleBirthday()
        console.log(value);
        console.log(yearID);
    }


    handleDayoptionsE(type, value) {
        this.setState({ [type]: value.value });
        if (value) {
            dayIDE = value.value;
        } else {
            dayIDE = "";
        }
        // this.handleBirthday()
        console.log(value);
        console.log(dayIDE);
    }

    handleMonthoptionsE(type, value) {
        this.setState({ [type]: value.value });
        if (value) {
            monthIDE = value.value;
        } else {
            monthIDE = "";
        }
        // this.handleBirthday()
        console.log(value);
        console.log(monthIDE);
    }

    handleYearoptionsE(type, value) {
        this.setState({ [type]: value.value });
        if (value) {
            yearIDE = value.value;
        } else {
            yearIDE = "";
        }
        // this.handleBirthday()
        console.log(value);
        console.log(yearIDE);
    }


    handleBirthday() {
        console.log(this.state.startyear, this.state.startmonth, this.state.startday, "yearID, monthID + 1, dayID")
        console.log(this.state.endyear, this.state.endmonth, this.state.endday, "yearIDE, monthIDE, dayIDE")
        console.log(new Date(this.state.startyear, this.state.startmonth - 1, this.state.startday).getTime(), "yearID, monthID + 1, dayID")
        console.log(new Date(this.state.endyear, this.state.endmonth - 1, this.state.endday).getTime(), "yearIDE, monthIDE, dayIDE")
        from = this.state.startyear + "/" + this.state.startmonth + "/" + this.state.startday
        to = this.state.endyear + "/" + this.state.endmonth + "/" + this.state.endday;
        var that = this;
        let money = 0;
        let tripscounter = 0;
        let newday = dayIDE + 1;
        this.setState({
            birthdaydate: new Date(this.state.startyear, this.state.startmonth - 1, this.state.startday).getTime(),
            birthdaydateE: new Date(this.state.endyear, this.state.endmonth - 1, this.state.endday).getTime(),
        });
        // this.state.birthdaydateE = new Date(yearIDE, monthIDE, newday).getTime()

        console.log(new Date(yearID, monthID - 1, dayID).getTime(), "new Date(yearID, monthID , dayID).getTime()")
        console.log(new Date(yearIDE, monthIDE - 1, dayIDE).getTime(), "new Date(yearIDE, monthIDE , dayIDE).getTime()")
        that.state.objects.forEach(function (item) {
            // console.log(item)
            if (that.state.birthdaydate <= item.date && that.state.birthdaydateE >= item.date) {
                if (item.tripCost) {
                    money = money + item.tripCost;

                }

                tripscounter = tripscounter + 1;
            }



        })

        this.setState({
            cash: money,
            tripsCount: tripscounter
        })

        showDate = false;

        // console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
    }

    searchtable(event) {
        var that = this;
        var searchText = event.target.value;
        var searchTextLength = searchText.length;
        this.setState({
            searchfilter: searchText,
            greaterThanAll: 15,
            lessThanAll: -1,
        })
        console.log(searchTextLength)
        console.log(this.state.objects, "all drivers log")
        console.log(searchText, "searchtext now")
        console.log(searchText, "searchtext now in forEach")
        searchArray = [];
        // this.state.objects.forEach(function (item) {

        //     if (item.phoneNumber.slice(0, searchTextLength) === searchText) {
        //         if (searchArray.indexOf(searchText) === -1) {
        //             searchArray.push(item)
        //         }
        //     }
        //     else {

        //     }
        // })
        console.log(searchArray, "search array")
    }

    handleDrivers(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo('/DashBoard')

        e.preventDefault();
    }
    reset() {
        this.setState({
            birthdaydate: null,
            birthdaydateE: null
        })
        from = "";
        to = "";
        showDate = true;
    }

    render() {
        var sky = {
            width: '40%',
            height: '40%',
            align: 'center',
            textAlign: 'center',
            fontFamily: 'Cairo',
            fontSize: 'large',
            top: '60%',
            marginLeft: '-20%'
        };

        return (
            <div className="thisisnew">

                <div className="Navdiv">
                    <ul className="NavdivUl">
                        <li className="Header Logo"><img src="/Group 11.png" alt="Header Logo" /></li>
                        <li className="active li"><a className="active" onClick={() => { ReactRouter.goTo('/DashBoard') }}>السائقين</a></li>
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
                <div className="Driver" >
                    {/*onClick={this.handleCreate.bind(this)}*/}
                    <div className="DriverRight">
                        {/*<div className="DriverRight-Right" >*/}
                        <div className="DriverRightInner">
                            <div className="DriverI">
                                <img src="/Group 1548.png" id="Driver-Img" />
                            </div>
                            <div className="DriverPDiv">
                                <div className="DriverPTTTNew">
                                    <p className="DriverPParag">{this.state.driverName} </p>
                                </div>
                                <div className="DriverPT">
                                    <p>{this.state.driverRating}  <img src="/Path 1266.png" id="Driver-Rating-Img" /></p>
                                </div>

                            </div>



                        </div>


                        <div className="fake-inputFML">
                            <div className="fake-input-leftFML">
                                <div className="DriverSearchLol">
                                    <img src="/Group 1392.png" />
                                    <input type="text" placeholder="بحث" className="DriverSearchText" onChange={this.searchtable.bind(this)} />

                                </div>
                            </div>
                        </div>



                    </div>

                    <div className="DriverLeft">



                        <div className="yoyom8" >

                            <div className="statistics" >
                                <p className="statisticsP" >إحصائيات</p>
                                <img src="/Group 1793.png" id="statisticsImg" onClick={() => this.refs.PromoDialog.show()} />
                            </div>

                            <div className="statisticstwo" >
                                <p className="statisticsPNew" style={{ paddingLeft: "2%" }}>تصفية حسب التاريخ</p>
                                <img src="/Group 1803.png" id="statisticsImgnew" onClick={() => this.refs.FilterDialog.show()} />
                                <p className="statisticsPNew" style={{ paddingRight: "5%" }} hidden={showDate}> من:</p>
                                <p className="statisticsPNew" style={{ minWidth: "10%" }} hidden={showDate}>{from}</p>
                                <p className="statisticsPNew" hidden={showDate}> إلى:</p>
                                <p className="statisticsPNew" style={{ minWidth: "10%" }} hidden={showDate}>{to}</p>
                                <img src="/Group 1633.png" id="statisticsImgnew" onClick={this.reset.bind(this)} hidden={showDate} />
                            </div>

                        </div>
                    </div>

                </div>



                <div className="fake-input-right22" >
                    <div className="DriversdivNew">
                        {this.tableActive()}
                    </div>

                    <div className="nextprevious" >
                        <button className="nextpreviousButtons" onClick={this.nextAll.bind(this)}>&lt;</button>
                        <p className="nextpreviousP">{this.state.lessThanAll + 2} to {this.state.greaterThanAll}</p>
                        <button className="nextpreviousButtons" onClick={this.previousAll.bind(this)}>&gt;</button>
                    </div>
                </div>

                {/*<br /> <br /> <br />*/}

                <SkyLight hideOnOverlayClicked ref="PromoDialog" dialogStyles={sky}>
                    {/*<img src="/Group 1793.png" id="statisticsImgPop" />*/}
                    <div className="statsPopInnerDiv" >
                        <div className="nnnnnnn">
                            <p className="statisticsP222" >إحصائيات</p>
                            <img src="/Group 1793.png" id="statisticsImg2" />
                        </div>
                        <div className="msam">
                            <div className="statsPopInnerDiv-right">
                                <p className="statsPopInnerDiv-right-p">إجمالي عدد الرحلات</p>
                                <p className="statsPopInnerDiv-right-p">إجمالي تكلفة الرحلات</p>
                            </div>
                            <div className="statsPopInnerDiv-left">
                                <p className="statsPopInnerDiv-left-p">{this.state.tripsCount}</p>
                                <p className="statsPopInnerDiv-left-p">{this.state.cash}</p>
                            </div>
                        </div>

                    </div>
                </SkyLight>


                <SkyLight hideOnOverlayClicked ref="FilterDialog" dialogStyles={sky}>
                    <div className="comeonnnn" >
                        <div className="comeonnnnUnder" >
                            <form className="hahahaxD">



                                <fieldset className="yowazap">
                                    <legend className="heyheyhey" >تاريخ الرحلات</legend>

                                    <div className="rightidkm8">
                                        <div className="idkm8Div">
                                            <p className="idkm8" >من</p>
                                        </div>

                                        <div className="idkm8Div">
                                            <p className="idkm8" >إلى</p>
                                        </div>

                                    </div>

                                    <div className="leftidkm8" >
                                        <div className="Options-GroupsTheyyonew">
                                            <div className="OptionsOTCome">
                                                <Select
                                                    ref="startyear"
                                                    placeholder="سنة"
                                                    value={this.state.startyear}
                                                    options={this.state.startyearoptions}
                                                    onChange={this.handleYearoptions.bind(this, "startyear")}
                                                />
                                            </div>

                                            <div className="OptionsTTCome">
                                                <Select
                                                    ref="startmonth"
                                                    placeholder="شهر"
                                                    value={this.state.startmonth}
                                                    options={this.state.startmonthoptions}
                                                    onChange={this.handleMonthoptions.bind(this, "startmonth")}
                                                />
                                            </div>

                                            <div className="OptionsThTCome">
                                                <Select
                                                    ref="startday"
                                                    placeholder="يوم"
                                                    value={this.state.startday}
                                                    options={this.state.startdayoptions}
                                                    onChange={this.handleDayoptions.bind(this, "startday")}
                                                />
                                            </div>
                                        </div>


                                        <div className="Options-GroupsTheyyoyonew">
                                            <div className="OptionsOTCome">
                                                <Select
                                                    ref="endyear"
                                                    placeholder="سنة"
                                                    className="menu-outer-top"
                                                    value={this.state.endyear}
                                                    options={this.state.endyearoptions}
                                                    onChange={this.handleYearoptionsE.bind(this, "endyear")}
                                                />
                                            </div>

                                            <div className="OptionsTTCome">
                                                <Select
                                                    ref="endmonth"
                                                    placeholder="شهر"
                                                    className="menu-outer-top"
                                                    value={this.state.endmonth}
                                                    options={this.state.endmonthoptions}
                                                    onChange={this.handleMonthoptionsE.bind(this, "endmonth")}
                                                />
                                            </div>

                                            <div className="OptionsThTCome">
                                                <Select
                                                    ref="endday"
                                                    placeholder="يوم"
                                                    className="menu-outer-top"
                                                    value={this.state.endday}
                                                    options={this.state.enddayoptions}
                                                    onChange={this.handleDayoptionsE.bind(this, "endday")}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>

                            </form>
                            <div className="PopUpRow2">
                                <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleBirthday.bind(this)} />
                            </div>
                        </div>
                    </div>
                </SkyLight>


            </div>
        );
    }
}

export default DriverTrips;