import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal'
import Select from 'react-select';
import SkyLight from 'react-skylight';
var ReactRouter = require('flux-react-router');


let searchArray = [];
class Specialists extends Component {

    constructor() {
        super();
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    }

    componentWillMount() {



        this.setState({
            objects: [],
            searchfilter: "",
            lessThanAll: -1,
            greaterThanAll: 15,
            objectsArray: [],
            blur: "",
            successSuspendAllModal: false,
            confirmSuspendAllModal: false,
        })
        this.getSpecialistsAPI();
    }
    getSpecialistsAPI() {
        var that = this;
        axios.get('/operator/getAllSpecialists').then(function (response) {
            console.log(response.data, "getAllSpecialists Response")
            var x = response.data.data;
            var objects = [];
            x.forEach(function (item, index) {
                console.log(item)
                objects.push(item);
            })

            that.setState({
                objects: objects,
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

    handleCreate(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/CreateSpecialist")

        e.preventDefault();
    }

    gotoDriverProfile(event, index) {
        ReactRouter.goTo(`/DriverProfile/${event}`);
    }

    gotoUpdateBranch(event, index) {
        console.log("yahoooooooooooooooooooooooooooooooooo")
        ReactRouter.goTo(`/UpdateSpecialists/${event}`);
    }
    Delete(event, index) {
        var that = this;
        var obj = {
            specialistId: event
        }
        axios.post('/operator/deleteSpecialist', obj).then(function (response) {
            console.log(response)
            that.getSpecialistsAPI();
        }).catch(function (error) {
            that.refs.ErrorDialog.show();
            console.log(error)
        })

    }

    tableAll() {

        var that = this;
        let counter = 0;
        let usedCounter = 0;
        // console.log(this.state.objects);

        return (
            React.DOM.table({ className: "tableclass" },
                React.DOM.thead({ className: "tablehead" },
                    <tr className="tableheadrow">
                        <td className="tableheadDT" >مسح</td>

                        <td className="tableheadDT" >تعديل</td>

                        <td className="tableheadF" >فرع</td>

                        <td className="tableheadD" >رقم الهاتف</td>

                        <td className="tableheadDTR" >الإسم</td>
                    </tr>
                ),
                React.DOM.tbody(null,
                    that.state.objects.map(function (row, index) {
                        let re = [];
                        // console.log(row)
                        if (that.state.lessThanAll < counter && counter < that.state.greaterThanAll) {
                            if ((row.firstName.includes(that.state.searchfilter)) || (row.phoneNumber.includes(that.state.searchfilter))) {
                                counter++;
                                usedCounter++;
                                // console.log(counter)
                                // console.log(row)
                                var Id = row._id;

                                re.push("./Group 1633.png")
                                re.push("./Path 1161.png")
                                // re.push("./Group 1410.png"
                                if (row.branch) {
                                    re.push(row.branch.name)
                                }
                                else {
                                    re.push("-")
                                }
                                if (row.phoneNumber.length < 12) {
                                    re.push(row.phoneNumber)
                                }
                                else {
                                    re.push("-")
                                }
                                re.push(row.firstName)
                            }
                        } else {
                            counter++;
                        }
                        return (
                            <tr key={index}>
                                {
                                    re.map(function (col, index) {
                                        {/*console.log(col)*/ }
                                        {/* if (typeof col === "string" && col.slice(0, 12) === "./Group 1433") {
                                            return <td className="PTDS" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} onClick={that.SuspendDriver.bind(that, row._id, row.firstName)} /></div> </td>
                                        }
                                        else if (typeof col === "string" && col.slice(0, 12) === "./Group 1410") {
                                            return <td className="PTDS" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} onClick={that.GotoShowTripsOfDriverById.bind(that, row._id)} /></div> </td>
                                        }
                                        else if (typeof col === "string" && col.slice(0, 11) === "./Path 1161") {
                                            return <td className="PTDS" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} onClick={that.gotoUpdateDriver.bind(that, row._id)} /></div> </td>
                                        }
                                        else if (typeof col === "string" && col.slice(0, 2) === "./") {
                                            return <td className="PTD" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} /> </div> </td>
                                        }
                                     
                                        else if (index === 5) {
                                            return <td className="PTD" key={index}> <div className="tdDiv" onClick={that.gotoDriverProfile.bind(that, row._id)}>{col}</div></td>
                                        }
                                        else { */}
                                        {/* if (typeof col === "string" && col.slice(0, 12) === "./Group 1633") {
                                            return <td className="PTDS" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} /></div> </td>
                                             }
                                        else  */}
                                        /* if (typeof col === "string" && col.slice(0, 2) === "./") {
                                             return <td className="PTD" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} /> </div> </td>
                                         }
                                         else*/
                                        if (typeof col === "string" && col.slice(0, 12) === "./Group 1633") {
                                            return <td className="PTDS" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} onClick={that.Delete.bind(that, row._id)} /></div> </td>
                                        }
                                        else if (typeof col === "string" && col.slice(0, 11) === "./Path 1161") {
                                            return <td className="PTDS" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} onClick={that.gotoUpdateBranch.bind(that, row._id)} /></div> </td>
                                        }
                                        else {
                                            return <td className="PTD" key={index}><div className="tdDiv"> {col}</div></td>
                                        }

                                        //}


                                    })
                                }
                            </tr>
                        )

                    })
                )
            ))
    }

    tabs() {
        //console.log(this.state)
        return (

            <div id="tabss">
                <Tabs>
                    <TabList>
                        <Tab ></Tab>
                        {/* <Tab >السائقين الناشطين</Tab>
                        <Tab >موقوف</Tab>
                        <Tab >في الإنتظار</Tab> */}

                    </TabList>
                    <div id="tabspanels">
                        <TabPanel>
                            <div className="Tablediv">
                                {this.tableAll()}
                            </div>

                            <div className="nextprevious" >
                                <button className="nextpreviousButtons" onClick={this.nextAll.bind(this)}>&lt;</button>
                                <p className="nextpreviousP">{this.state.lessThanAll + 2} to {this.state.greaterThanAll}</p>
                                <button className="nextpreviousButtons" onClick={this.previousAll.bind(this)}>&gt;</button>
                            </div>
                        </TabPanel>
                        {/* <TabPanel>
                            <div className="Tablediv">
                                {this.tableActive()}
                            </div>

                            <div className="nextprevious" >
                                <button className="nextpreviousButtons" onClick={this.nextActive.bind(this)}>&lt;</button>
                                <p className="nextpreviousP">{this.state.lessThanActive + 2} to {this.state.greaterThanActive}</p>
                                <button className="nextpreviousButtons" onClick={this.previousActive.bind(this)}>&gt;</button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="Tablediv">
                                {this.tableSuspended()}
                            </div>

                            <div className="nextprevious" >
                                <button className="nextpreviousButtons" onClick={this.nextSuspended.bind(this)}>&lt;</button>
                                <p className="nextpreviousP">{this.state.lessThanSuspended + 2} to {this.state.greaterThanSuspended}</p>
                                <button className="nextpreviousButtons" onClick={this.previousSuspended.bind(this)}>&gt;</button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="Tablediv">
                                {this.tablePending()}
                            </div>

                            <div className="nextprevious" >
                                <button className="nextpreviousButtons" onClick={this.nextPending.bind(this)}>&lt;</button>
                                <p className="nextpreviousP">{this.state.lessThanPending + 2} to {this.state.greaterThanPending}</p>
                                <button className="nextpreviousButtons" onClick={this.previousPending.bind(this)}>&gt;</button>
                            </div>
                        </TabPanel> */}
                    </div>
                </Tabs>
            </div>

        )
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


    searchtable(event) {
        var that = this;
        var searchText = event.target.value;
        var searchTextLength = searchText.length;
        var joined = [];
        this.setState({
            searchfilter: searchText,
            lessThanAll: -1,
            greaterThanAll: 15,
            lessThanActive: -1,
            greaterThanActive: 15,
            lessThanSuspended: -1,
            greaterThanSuspended: 15,
            lessThanPending: -1,
            greaterThanPending: 15,
        })
        // if (row.phoneNumber.includes(that.state.searchfilter)) {

        // }
        var getloop = [];


        console.log(searchTextLength)
        console.log(this.state.objects, "all drivers log")
        console.log(searchText, "searchtext now")

        that.state.objects.forEach(function (item) {
            // console.log(item, "item")
            if ((item.firstName.includes(that.state.searchfilter)) || (item.phone.includes(that.state.searchfilter))) {
                if (searchArray.indexOf(searchText) === -1) {
                    joined.push(item)
                    // that.state.objectsArray.push(item)
                }
            }
        })
        that.setState({ objectsArray: joined })
        console.log(this.state.objectsArray, "search array")
    }

    render() {
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
        var sky = {
            // backgroundColor: '#00897B',
            // color: '#ffffff',
            width: '50%',
            height: '400px',
            marginTop: '-300px',
            marginLeft: '-25%',
            // overflow: 'scroll',
            direction: 'rtl',
        };
        return (
            <div>
                <div className={this.state.blur}>
                    <div className="Navdiv">
                        <ul className="NavdivUl">
                            <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
                            <li className="active li"><a onClick={() => { ReactRouter.goTo('/DashBoard') }}>السائقين</a></li>
                            {/*}<li><a >رحلات</a></li>{*/}
                            <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
                            <li><a >دعم</a></li>
                            <li><a onClick={() => { ReactRouter.goTo('/Reports') }}>تقارير</a></li>
                            <li><a onClick={() => { ReactRouter.goTo('/Branches') }}>فروع</a></li>
                            <li><a className="active" onClick={() => { ReactRouter.goTo('/Specialists') }}>الأخصائيين</a></li>
                            <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
                        </ul>
                    </div>
                    <br />
                    <div className="fake-input-right-add" onClick={this.handleCreate.bind(this)}>
                        <div className="profileI">
                            <img src="./Group 1429.png" id="profile-Img2" />
                        </div>

                        <div className="profileP">
                            <p>إنشاء أخصائي</p>
                        </div>
                    </div>

                    <br /><br /><br />
                    <div className="fake-input">
                        <div className="fake-input-left">
                            <div className="fake-input-left-search">
                                <input type="text" placeholder="بحث" className="fake-input-left-text" onChange={this.searchtable.bind(this)} />
                                <img src="./Group 1392.png" />
                            </div>
                        </div>
                        <div className="fake-input-right" >
                            <div className="Driversdiv">
                                {/* <ul className="DriversdivUl">
                <li className="DriversdivLiActive"><p className="DriversdivPActive" >كل السائقين</p></li>
                <li className="DriversdivLi"><p className="DriversdivP"  >السائقين الناشطين</p></li>
                <li className="DriversdivLi"><p className="DriversdivP">موقوف</p></li>
                <li className="DriversdivLi"><p className="DriversdivP">في الإنتظار</p></li>
                              </ul> */}
                                {this.tabs()}
                            </div>
                        </div>
                    </div>
                </div>
                <SkyLight hideOnOverlayClicked ref="ErrorDialog" dialogStyles={sky}>
                    <div className="BranchPopClass">
                        <p className="BranchPopP" >لا يمكن مسح أخصائي تحته سائقين</p>
                    </div>
                </SkyLight>
            </div>
        );
    }
}

export default Specialists;




