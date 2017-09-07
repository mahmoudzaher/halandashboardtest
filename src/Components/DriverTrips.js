import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';
var ReactRouter = require('flux-react-router');



let searchArray = [];
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
        }

    }

    componentWillMount() {
        var that = this;
        this.setState({
            objects: [],
            searchfilter: "",
            driverRating: "",
            driverName: "",
        })

        axios.post('/api/operator/getPreviousTripsOfDriver', { "id": this.state.id }).then(function (response) {
            console.log(response.data.data, "getPreviousTripsOfDriver Response")
            var x = response.data.data;
            var objects = [];

            x.forEach(function (item) {
                // console.log(item)
                objects.push(item);

            })
            that.setState({

                objects: objects,

            })

        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })

        console.log(this.state.driverId, "driverID")

        axios.get('/api/operator/getDriverById?' + "driverId=" + this.state.driverId).then(function (response) {
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

    componentDidMount() {
        var that = this;
        // axios.post('/api/operator/getPreviousTripsOfDriver', { "id": this.state.id }).then(function (response) {
        //     console.log(response.data.data, "getPreviousTripsOfDriver Response")
        //     var x = response.data.data;
        //     var objects = [];

        //     x.forEach(function (item) {
        //         // console.log(item)
        //         objects.push(item);

        //     })
        //     that.setState({

        //         objects: objects,

        //     })

        // }).catch(function (error) {
        //     alert(error.message);
        //     console.log(error)
        // })

        // console.log(this.state.driverId, "driverID")

        // axios.get('/api/operator/getDriverById?' + "driverId=" + this.state.driverId).then(function (response) {
        //     console.log(response, "getDriverById Response")
        //     var x = response.data.data;

        //     that.setState({

        //         driverRating: x.rating,
        //         driverName: x.firstName,

        //     })

        // }).catch(function (error) {
        //     alert(error.message);
        //     console.log(error)
        // })

    }

    static defaultProps = {

    }

    tableActive() {

        var that = this;
        // console.log(this.state.objects);

        return (
            React.DOM.table({ className: "tableclasstwo" },
                React.DOM.thead({ className: "tablehead" },
                    <tr className="tableheadrow">
                        <td className="tableheadDT" >تكلفة الرحلة</td>

                        <td className="tableheadDT" >تقيم</td>

                        <td className="tableheadF" >المدة</td>

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
                        console.log(row)


                        var datee = new Date(row.date);
                        var Year = datee.getFullYear();
                        var Month = datee.getMonth();
                        var Day = datee.getDay();
                        var hours = datee.getHours();
                        var minutes = "0" + datee.getMinutes();
                        var seconds = "0" + datee.getSeconds();
                        var formattedTime = Year + '/' + Month + '/' + Day;
                        // console.log(Year, "Year")
                        // console.log(Month, "Month")
                        // console.log(Day, "Day")
                        // console.log(formattedTime, "date")
                        // console.log(datee, "datee")



                        var start = new Date(row.tripStartTime);
                        var startYear = start.getFullYear();
                        var startMonth = start.getMonth();
                        var startDay = start.getDay();
                        var starthours = start.getHours();
                        var startminutes = "0" + start.getMinutes();
                        var startseconds = "0" + start.getSeconds();
                        var startFormattedTime = startDay + '/' + startMonth + '/' + startYear + starthours + ':' + startminutes.substr(-2) + ':' + startseconds.substr(-2);


                        var end = new Date(row.endTime);
                        var endDay = end.getDay();
                        var endMonth = end.getMonth();
                        var endYear = end.getFullYear();
                        var endhours = end.getHours();
                        var endminutes = "0" + end.getMinutes();
                        var endseconds = "0" + end.getSeconds();
                        var endFormattedTime = endDay + '/' + endMonth + '/' + endYear + endhours + ':' + endminutes.substr(-2) + ':' + endseconds.substr(-2);


                        var now = "04/09/2013 15:00:00";
                        var then = "04/09/2013 14:20:30";
                        moment.utc(moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(start, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
                        var durationtrip = moment.utc(moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(start, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
                        console.log(moment.utc(moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(start, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"), "duration")
                        console.log(durationtrip, "duration trip")


                        if (row.user.phoneNumber.includes(that.state.searchfilter)) {
                            re.push(row.tripCost)
                            re.push(row.userRatingByDriver)
                            re.push(durationtrip)
                            re.push(row._toString)
                            re.push(row._fromString)
                            re.push(row.user.phoneNumber)
                            re.push(row.user.firstName)
                            re.push(formattedTime)
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
                                        else if (index === 3){
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

    searchtable(event) {
        var that = this;
        var searchText = event.target.value;
        var searchTextLength = searchText.length;
        this.setState({
            searchfilter: searchText
        })
        console.log(searchTextLength)
        console.log(this.state.objects, "all drivers log")
        console.log(searchText, "searchtext now")
        console.log(searchText, "searchtext now in forEach")
        searchArray = [];
        this.state.objects.forEach(function (item) {

            if (item.phoneNumber.slice(0, searchTextLength) === searchText) {
                if (searchArray.indexOf(searchText) === -1) {
                    searchArray.push(item)
                }
            }
            else {

            }
        })
        console.log(searchArray, "search array")
    }

  handleDrivers(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo('/DashBoard')

        e.preventDefault();
    }

    render() {

        return (
            <div>

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
                <div className="Driver" >
                    {/*onClick={this.handleCreate.bind(this)}*/}
                    <div className="DriverRight">
                        <div className="DriverRightInner">
                            <div className="DriverI">
                                <img src="/Group 1548.png" id="Driver-Img" />
                            </div>
                            <div className="DriverPDiv">
                                <div className="DriverP">
                                    <p className="DriverPParag">{this.state.driverName} </p>
                                </div>
                                <div className="DriverPT">
                                    <p>{this.state.driverRating}  <img src="/Path 1266.png" id="Driver-Rating-Img" /></p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="DriverLeft">

                    </div>

                </div>

                <br /><br /><br />
                <div className="fake-input">
                    <div className="fake-input-left">
                        <div className="DriverSearchLol">
                            <input type="text" placeholder="بحث" className="DriverSearchText" onChange={this.searchtable.bind(this)} />
                            <img src="/Group 1392.png" />
                        </div>
                    </div>
                    <div className="fake-input-right" >
                        <div className="Driversdiv">
                            {this.tableActive()}
                        </div>
                    </div>
                </div>


                <br /> <br /> <br />
            </div>
        );
    }
}

export default DriverTrips;