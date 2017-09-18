import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal'
import Select from 'react-select';
let yearID = "";
var ReactRouter = require('flux-react-router');



let searchArray = [];
class Dashboard extends Component {

  constructor() {
    super();
    axios.defaults.baseURL = localStorage.getItem('baseURL');
    /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  }

  componentWillMount() {

    var itemIds3 = [];



    itemIds3.push(
      {
        value: "firstName",
        label: "الإسم"
      }
    );
    itemIds3.push(
      {
        value: "phoneNumber",
        label: "رقم الهاتف"
      }
    );


    this.setState({
      objects: [],
      objectsActive: [],
      objectsSuspended: [],
      objectsPending: [],
      activeN: 0,
      pendingN: 0,
      suspendedN: 0,
      activeStart: 0,
      pendingStart: 0,
      suspendedStart: 0,
      playlists: "PlayW.png",
      a: "UpB.png",
      b: "RepB.png",
      c: "NotB.png",
      searchfilter: "",
      lessThanAll: -1,
      greaterThanAll: 15,
      lessThanActive: -1,
      greaterThanActive: 15,
      lessThanSuspended: -1,
      greaterThanSuspended: 15,
      lessThanPending: -1,
      greaterThanPending: 15,
      objectsArray: [],
      blur: "",
      successSuspendAllModal: false,
      confirmSuspendAllModal: false,
      suspendedDriverName: "",
      startyearoptions: itemIds3,
    })
    this.getDriversAPI();

  }
  handleYearoptions(type, value) {
    this.setState({
      [type]: value,
      Year: value
    });
    //  artistID = value.value;
    console.log(value.value, "option")
    if (value) {
      yearID = value.value;
    } else {
      yearID = "";
    }
    console.log(value);
    console.log(yearID);
  }
  getDriversAPI() {
    var that = this;
    axios.get('/operator/getalldrivers').then(function (response) {
      console.log(response, "helloooooooasdgkjuhasghdkjhasghdkjasgdkasgdakljshgdl")
      var x = response.data.data;
      var objects = [];
      var objectsActive = [];
      var objectsSuspended = [];
      var objectsPending = [];
      var active = 0;
      var pending = 0;
      var suspended = 0;
      x.forEach(function (item, index) {
        // console.log(item)
        objects.push(item);

        if (item.status === "active") {
          objectsActive.push(item);
        }



        else if (item.status === "suspended") {
          objectsSuspended.push(item);
        }


        else if (item.status === "pending") {
          objectsPending.push(item);

        }

      })

      that.setState({

        objects: objects,
        objectsActive: objectsActive,
        objectsSuspended: objectsSuspended,
        objectsPending: objectsPending,
        activeN: active,
        pendingN: pending,
        suspendedN: suspended,
      })

    }).catch(function (error) {
      alert(error.message);
      console.log(error)
    })
  }
  static defaultProps = {

  }

  openModal(type) {
    console.log(type);
    this.setState({
      [type]: true,
      blur: "blur"
    });
  }

  closeModal(type) {
    console.log(type);
    this.setState({
      [type]: false,
      blur: ""
    });
  }

  confirmSuspend() {
    var that = this;
    var object = {
      driverId: that.state.suspendedDriverId,
      newStatus: "suspended"
    }
    axios.post('operator/changedriverstatus', object).then(function (response) {
      console.log(response)
      that.getDriversAPI()
      that.setState({
        confirmSuspendAllModal: false,
        successSuspendAllModal: true
      })
      // window.localStorage.setItem('sessionToken', response.data);
    }).catch(function (error) {
      alert(error.message);
      console.log(error)
    })
  }

  SuspendDriver(event, name, id) {
    console.log(event, id)
    this.setState({
      blur: "blur",
      confirmSuspendAllModal: true,
      suspendedDriverName: name,
      suspendedDriverId: event
    })
  }

  ReactivateDriver(event, id) {
    console.log(event, id)
    var object = {
      driverId: event,
      newStatus: "active"
    }
    axios.post('operator/changedriverstatus', object).then(function (response) {
      console.log(response)
      // window.localStorage.setItem('sessionToken', response.data);
      alert("dirver suspended")
    }).catch(function (error) {
      alert(error.message);
      console.log(error)
    })
  }


  // ReactivateDriver(event, id) {
  //   console.log(event, id)
  //   var object = {
  //     driverId: event,
  //     newStatus: "active"
  //   }
  //   axios.post('operator/changedriverstatus', object).then(function (response) {
  //     console.log(response)
  //     // window.localStorage.setItem('sessionToken', response.data);
  //     alert("dirver reactivated")
  //   }).catch(function (error) {
  //     alert(error.message);
  //     console.log(error)
  //   })
  // }


  GotoShowTripsOfDriverById(event, id) {
    console.log(event, id)
    var id = event;
    console.log("WoHOOOOOOOOOOOOOOOO");
    // ReactRouter.goTo("/DriverTrips")
    ReactRouter.goTo(`/DriverTrips/${event}`);
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

  nextActive(event) {
    var that = this;
    var length = this.state.objectsActive.length;

    if (this.state.lessThanActive + 15 < length) {
      this.setState({
        lessThanActive: this.state.lessThanActive + 15,
        greaterThanActive: this.state.greaterThanActive + 15,
      })
    }
    else {
      this.setState({
        lessThanActive: this.state.lessThanActive,
        greaterThanActive: this.state.greaterThanActive,
      })
    }
  }

  previousActive(event) {
    var that = this;
    var length = this.state.objectsActive.length;

    console.log(length, "length")
    if (this.state.lessThanActive > 0) {
      this.setState({
        lessThanActive: this.state.lessThanActive - 15,
        greaterThanActive: this.state.greaterThanActive - 15,
      })
    }
    else {
      this.setState({
        lessThanActive: this.state.lessThanActive,
        greaterThan: this.state.greaterThan,
      })
    }
  }

  nextSuspended(event) {
    var that = this;
    var length = this.state.objectsSuspended.length;

    if (this.state.lessThanSuspended + 15 < length) {
      this.setState({
        lessThanSuspended: this.state.lessThanSuspended + 15,
        greaterThanSuspended: this.state.greaterThanSuspended + 15,
      })
    }
    else {
      this.setState({
        lessThanSuspended: this.state.lessThanSuspended,
        greaterThanSuspended: this.state.greaterThanSuspended,
      })
    }
  }

  previousSuspended(event) {
    var that = this;
    var length = this.state.objectsSuspended.length;

    if (this.state.lessThanSuspended > 0) {
      this.setState({
        lessThanSuspended: this.state.lessThanSuspended - 15,
        greaterThanSuspended: this.state.greaterThanSuspended - 15,
      })
    }
    else {
      this.setState({
        lessThan: this.state.lessThan,
        greaterThanSuspended: this.state.greaterThanSuspended,
      })
    }
  }

  nextPending(event) {
    var that = this;
    var length = this.state.objectsPending.length;

    if (this.state.lessThanPending + 15 < length) {
      this.setState({
        lessThanPending: this.state.lessThanPending + 15,
        greaterThanPending: this.state.greaterThanPending + 15,
      })
    }
    else {
      this.setState({
        lessThanPending: this.state.lessThanPending,
        greaterThanPending: this.state.greaterThanPending,
      })
    }
  }

  previousPending(event) {
    var that = this;
    var length = this.state.objectsPending.length;

    if (this.state.lessThanPending > 0) {
      this.setState({
        lessThanPending: this.state.lessThanPending - 15,
        greaterThanPending: this.state.greaterThanPending - 15,
      })
    }
    else {
      this.setState({
        lessThanPending: this.state.lessThanPending,
        greaterThanPending: this.state.greaterThanPending,
      })
    }
  }

  gotoDriverProfile(event, index) {
    ReactRouter.goTo(`/DriverProfile/${event}`);
  }

  gotoUpdateDriver(event, index) {
    console.log("yahoooooooooooooooooooooooooooooooooo")
    ReactRouter.goTo(`/UpdateUser/${event}`);
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
            <td className="tableheadDT" >وقف</td>

            <td className="tableheadDT" >تعديل</td>

            <td className="tableheadF" >عرض الرحلات</td>

            <td className="tableheadD" >رقم الهاتف</td>

            <td className="tableheadD" >نوع المركبة</td>

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

                re.push("./Group 1433.png")
                re.push("./Path 1161.png")
                re.push("./Group 1410.png")
                if (row.phoneNumber.length < 12) {
                  re.push(row.phoneNumber)
                }
                else {
                  re.push("-")
                }
                if (row.vehicle) {
                  if (row.vehicle.vehicletype === "toktok") {

                    re.push("./Group 1367.png")
                  }

                  if (row.vehicle.vehicletype === "motorcycle") {

                    re.push("./Group 1355.png")
                  }

                  if (row.vehicle.vehicletype === "tricycle") {

                    re.push("./Group 1368.png")
                  }
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
                    if (typeof col === "string" && col.slice(0, 12) === "./Group 1433") {
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
                    // else if (index === 1) {
                    //  return <td className="PTD" key={index}> <div onClick={that.gotoUpdateDriver.bind(that, row._id)}>{col}</div></td>
                    //  }
                    else if (index === 5) {
                      return <td className="PTD" key={index}> <div className="tdDiv" onClick={that.gotoDriverProfile.bind(that, row._id)}>{col}</div></td>
                    }
                    else {
                      return <td className="PTD" key={index}><div className="tdDiv"> {col}</div></td>
                    }


                  })
                }
              </tr>
            )

          })
        )
      ))
  }



  tableActive() {

    var that = this;
    let counter = 0;
    // console.log(this.state.objects);

    return (
      React.DOM.table({ className: "tableclass" },
        React.DOM.thead({ className: "tablehead" },
          <tr className="tableheadrow">
            <td className="tableheadDT" >وقف</td>

            <td className="tableheadDT" >تعديل</td>

            <td className="tableheadF" >عرض الرحلات</td>

            <td className="tableheadD" >رقم الهاتف</td>

            <td className="tableheadD" >نوع المركبة</td>

            <td className="tableheadDTR" >الإسم</td>
          </tr>
        ),
        React.DOM.tbody(null,
          that.state.objectsActive.map(function (row, index) {
            let re = [];
            // console.log(row)

            if (that.state.lessThanActive < counter && counter < that.state.greaterThanActive) {
               if ((row.firstName.includes(that.state.searchfilter)) || (row.phoneNumber.includes(that.state.searchfilter))) {
                counter++;
                re.push("./Group 1433.png")
                re.push("./Path 1161.png")
                re.push("./Group 1410.png")
                if (row.phoneNumber.length < 12) {
                  re.push(row.phoneNumber)
                }
                else {
                  re.push("-")
                }
                if (row.vehicle) {
                  if (row.vehicle.vehicletype === "toktok") {

                    re.push("./Group 1367.png")
                  }

                  if (row.vehicle.vehicletype === "motorcycle") {

                    re.push("./Group 1355.png")
                  }

                  if (row.vehicle.vehicletype === "tricycle") {

                    re.push("./Group 1368.png")
                  }
                }
                else {
                  re.push("-")
                }
                re.push(row.firstName)
              }
            }
            else {
              counter++;
            }
            return (
              <tr key={index}>
                {
                  re.map(function (col, index) {
                    {/*console.log(col)*/ }
                    if (typeof col === "string" && col.slice(0, 12) === "./Group 1433") {
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
                    // else if (index === 1) {
                    //  return <td className="PTD" key={index}> <div onClick={that.gotoUpdateDriver.bind(that, row._id)}>{col}</div></td>
                    //  }
                    else if (index === 5) {
                      return <td className="PTD" key={index}> <div className="tdDiv" onClick={that.gotoDriverProfile.bind(that, row._id)}>{col}</div></td>
                    }
                    else {
                      return <td className="PTD" key={index}><div className="tdDiv"> {col}</div></td>
                    }

                  })
                }
              </tr>
            )

          })
        )
      ))
  }



  tableSuspended() {

    var that = this;
    let counter = 0;
    // console.log(this.state.objects);

    return (
      React.DOM.table({ className: "tableclass" },
        React.DOM.thead({ className: "tablehead" },
          <tr className="tableheadrow">
            <td className="tableheadDT" >وقف</td>

            <td className="tableheadDT" >تعديل</td>

            <td className="tableheadF" >عرض الرحلات</td>

            <td className="tableheadD" >رقم الهاتف</td>

            <td className="tableheadD" >نوع المركبة</td>

            <td className="tableheadDTR" >الإسم</td>
          </tr>
        ),
        React.DOM.tbody(null,
          that.state.objectsSuspended.map(function (row, index) {
            let re = [];
            // console.log(index, "index of suspended driver")

            // console.log(that.state.suspendedN, "suspendedN")
            if (that.state.lessThanSuspended < counter && counter < that.state.greaterThanSuspended) {
               if ((row.firstName.includes(that.state.searchfilter)) || (row.phoneNumber.includes(that.state.searchfilter))) {
                counter++;
                re.push("./Group 1792.png")
                re.push("./Path 1161.png")
                re.push("./Group 1410.png")
                if (row.phoneNumber.length < 12) {
                  re.push(row.phoneNumber)
                }
                else {
                  re.push("-")
                }
                if (row.vehicle) {
                  if (row.vehicle.vehicletype === "toktok") {

                    re.push("./Group 1367.png")
                  }

                  if (row.vehicle.vehicletype === "motorcycle") {

                    re.push("./Group 1355.png")
                  }

                  if (row.vehicle.vehicletype === "tricycle") {

                    re.push("./Group 1368.png")
                  }
                }
                else {
                  re.push("-")
                }
                re.push(row.firstName)
              }
            }
            else {
              counter++;
            }
            return (
              <tr key={index}>
                {
                  re.map(function (col, index) {
                    {/*console.log(col)*/ }
                    if (typeof col === "string" && col.slice(0, 12) === "./Group 1792") {
                      return <td className="PTDS" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} onClick={that.ReactivateDriver.bind(that, row._id)} /> </div> </td>
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
                    // else if (index === 1) {
                    //  return <td className="PTD" key={index}> <div onClick={that.gotoUpdateDriver.bind(that, row._id)}>{col}</div></td>
                    //  }
                    else if (index === 5) {
                      return <td className="PTD" key={index}> <div className="tdDiv" onClick={that.gotoDriverProfile.bind(that, row._id)}>{col}</div></td>
                    }
                    else {
                      return <td className="PTD" key={index}><div className="tdDiv"> {col}</div></td>
                    }
                    {/*else if (typeof col === "string" && col.slice(0, 2) === "./") {
                      return <td className="PTD" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} /> </div> </td>
                    }
                    else {
                      return <td className="PTD" key={index}> <div className="tdDiv"> {col}</div>  </td>
                    }*/}

                  })
                }
              </tr>
            )

          })
        )
      ))
  }


  tablePending() {

    var that = this;
    let counter = 0;
    // console.log(this.state.objects);

    return (
      React.DOM.table({ className: "tableclass" },
        React.DOM.thead({ className: "tablehead" },
          <tr className="tableheadrow">

            <td className="tableheadDT" >تعديل</td>

            <td className="tableheadF" >عرض الرحلات</td>

            <td className="tableheadD" >رقم الهاتف</td>

            <td className="tableheadD" >نوع المركبة</td>

            <td className="tableheadDTR" >الإسم</td>
          </tr>
        ),
        React.DOM.tbody(null,
          that.state.objectsPending.map(function (row, index) {
            let re = [];
            // console.log(row)
            // console.log(that.state.pendingN, "pendingN")
            if (that.state.lessThanPending < counter && counter < that.state.greaterThanPending) {
               if ((row.firstName.includes(that.state.searchfilter)) || (row.phoneNumber.includes(that.state.searchfilter))) {
                counter++;
                re.push("./Path 1161.png")
                re.push("./Group 1410.png")
                if (row.phoneNumber.length < 12) {
                  re.push(row.phoneNumber)
                }
                else {
                  re.push("-")
                }
                if (row.vehicle) {
                  if (row.vehicle.vehicletype === "toktok") {

                    re.push("./Group 1367.png")
                  }

                  if (row.vehicle.vehicletype === "motorcycle") {

                    re.push("./Group 1355.png")
                  }

                  if (row.vehicle.vehicletype === "tricycle") {

                    re.push("./Group 1368.png")
                  }
                }
                else {
                  re.push("-")
                }
                re.push(row.firstName)
              }
            }
            else {
              counter++;
            }
            return (
              <tr key={index}>
                {
                  re.map(function (col, index) {
                    {/*console.log(col)*/ }


                    if (typeof col === "string" && col.slice(0, 12) === "./Group 1410") {
                      return <td className="PTDS" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} onClick={that.GotoShowTripsOfDriverById.bind(this, row._id)} /></div> </td>
                    }
                    else if (typeof col === "string" && col.slice(0, 11) === "./Path 1161") {
                      return <td className="PTDS" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} onClick={that.gotoUpdateDriver.bind(this, row._id)} /></div> </td>
                    }
                    else if (typeof col === "string" && col.slice(0, 2) === "./") {
                      return <td className="PTD" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} /> </div> </td>
                    }
                    // else if (index === 1) {
                    //  return <td className="PTD" key={index}> <div onClick={that.gotoUpdateDriver.bind(this, row._id)}>{col}</div></td>
                    //  }
                    else if (index === 4) {
                      return <td className="PTD" key={index}> <div className="tdDiv" onClick={that.gotoDriverProfile.bind(this, row._id)}>{col}</div></td>
                    }
                    else {
                      return <td className="PTD" key={index}><div className="tdDiv"> {col}</div></td>
                    }

                    {/*if (typeof col === "string" && col.slice(0, 2) === "./") {
                      return <td className="PTD" key={index} > <div className="tdDiv"> <img className="tdImg" src={col} /> </div> </td>
                    }
                    else {
                      return <td className="PTD" key={index}><div className="tdDiv">{col}</div></td>
                    }*/}

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
            <Tab >كل السائقين</Tab>
            <Tab >السائقين الناشطين</Tab>
            <Tab >موقوف</Tab>
            <Tab >في الإنتظار</Tab>

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
            <TabPanel>
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
            </TabPanel>
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


  handleCreate(e) {

    console.log("WoHOOOOOOOOOOOOOOOO");
    ReactRouter.goTo("/CreateUser")

    e.preventDefault();
  }


  handleUpdate(e) {

    console.log("WoHOOOOOOOOOOOOOOOO");
    ReactRouter.goTo("/UpdateUser")

    e.preventDefault();
  }

  handleAddV(e) {

    console.log("WoHOOOOOOOOOOOOOOOO");
    ReactRouter.goTo("/AddVehicle")

    e.preventDefault();
  }

  handleAddP(e) {

    console.log("WoHOOOOOOOOOOOOOOOO");
    ReactRouter.goTo("/AddDriverPapers")

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
    // console.log(searchText, "searchtext now in forEach")
    // searchArray = [];
    // this.state.objects.forEach(function (item) {

    //   if (item.phoneNumber.slice(0, searchTextLength) === searchText) {
    //     if (searchArray.indexOf(searchText) === -1) {
    //       searchArray.push(item)
    //     }
    //   }
    //   else {

    //   }
    // })

    that.state.objects.forEach(function (item) {
      // console.log(item, "item")
      if ((item.firstName.includes(that.state.searchfilter)) || (item.phoneNumber.includes(that.state.searchfilter))) {
        if (searchArray.indexOf(searchText) === -1) {
          joined.push(item)
          // that.state.objectsArray.push(item)
        }
      }
    })
    that.setState({ objectsArray: joined })
    console.log(this.state.objectsArray, "search array")
  }

  table() {

    var that = this;
    // console.log(this.state.objects);

    return (
      React.DOM.table({ className: "tableclass" },
        React.DOM.thead({ className: "tablehead" },
          <tr className="tableheadrow">
            <td className="tableheadDT" >وقف</td>

            <td className="tableheadDT" >تعديل</td>

            <td className="tableheadF" >عرض الرحلات</td>

            <td className="tableheadD" >رقم الهاتف</td>

            <td className="tableheadD" >نوع المركبة</td>

            <td className="tableheadDTR" >الإسم</td>
          </tr>
        ),
        React.DOM.tbody(null,
          that.state.objects.map(function (row, index) {
            let re = [];
            // console.log(row)



            re.push("./Group 1433.png")
            re.push("./Path 1161.png")
            re.push("./Group 1410.png")
            if (row.phoneNumber.length < 12) {
              re.push(row.phoneNumber)
            }
            else {
              re.push("-")
            }
            if (row.vehicle) {
              if (row.vehicle.vehicletype === "toktok") {

                re.push("./Group 1367.png")
              }

              if (row.vehicle.vehicletype === "motorcycle") {

                re.push("./Group 1355.png")
              }

              if (row.vehicle.vehicletype === "tricycle") {

                re.push("./Group 1368.png")
              }
            }
            else {
              re.push("-")
            }
            re.push(row.firstName)
            // re.push("محمد")
            {/*<img src="./Group 1433.png" />*/ }
            return (
              <tr key={index}>
                {
                  re.map(function (col, index) {
                    {/*console.log(col)*/ }
                    if (typeof col === "string" && col.slice(0, 2) === "./") {
                      return <td className="PTD" key={index} ><img className="tdImg" src={col} /></td>
                    }
                    else {
                      return <td className="PTD" key={index}><div >{col}</div></td>
                    }

                  })
                }
              </tr>
            )

          })
        )
      ))
  }

  render() {
    // console.log(this.state.objectsSuspended, "objectsSuspended: [],")
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
    return (
      <div>

        <Modal
          isOpen={this.state.confirmSuspendAllModal}
          onRequestClose={this.closeModal.bind(this, "confirmSuspendAllModal")}
          style={customStyles}
        >
          <div>
            <span className="modalXButton" onClick={this.closeModal.bind(this, "confirmSuspendAllModal")}>&times;</span>
            <br />
            <div style={{ width: "100%", textAlign: "-webkit-center" }}>
              <img style={{ width: "20%" }} src="./redX.png" />
              <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width: "80%" }}>هل أنت متأكد من وقف {this.state.suspendedDriverName}</div>
              <input type="button" value="لا" className="modalButton" onClick={this.closeModal.bind(this, "confirmSuspendAllModal")} style={{ width: "30%" }} />
              <input type="button" value="نعم" className="modalButton" onClick={this.confirmSuspend.bind(this)} style={{ marginLeft: "20px", width: "30%" }} />
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.successSuspendAllModal}
          onRequestClose={this.closeModal.bind(this, "successSuspendAllModal")}
          style={customStyles}
        >
          <div>
            <span className="modalXButton" onClick={this.closeModal.bind(this, "successSuspendAllModal")}>&times;</span>
            <br />
            <div style={{ width: "100%", textAlign: "-webkit-center" }}>
              <img style={{ width: "20%" }} src="./greenTick.png" />
              <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width: "80%" }}>تم وقف السائق بنجاح</div>
              <input type="button" value="تمام" className="modalButton" onClick={this.closeModal.bind(this, "successSuspendAllModal")} style={{ width: "30%" }} />
            </div>
          </div>
        </Modal>
        <div className={this.state.blur}>
          <div className="Navdiv">
            <ul className="NavdivUl">
              <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
              <li className="active li"><a className="active" >السائقين</a></li>
              <li><a >رحلات</a></li>
              <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
              <li><a >دعم</a></li>
              <li><a onClick={()=>{ReactRouter.goTo('/Reports')}}>تقارير</a></li>
              <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
            </ul>
          </div>
          <br />
          <div className="fake-input-right-add" onClick={this.handleCreate.bind(this)}>
            <div className="profileI">
              <img src="./Group 1429.png" id="profile-Img" />
            </div>

            <div className="profileP">
              <p>إنشاء ملف شخصي </p>
            </div>
          </div>

          <br /><br /><br />
          <div className="fake-input">
            <div className="fake-input-left">
              <div className="fake-input-left-search">
                <input type="text" placeholder="بحث" className="fake-input-left-text" onChange={this.searchtable.bind(this)} />
                <img src="./Group 1392.png" />
              </div>
              {/*<div>
                <div className="OptionsOTNewYolo">
                  <Select
                    ref="startyear"
                    placeholder="إختار"
                    className="menu-outer-top3"
                    value={this.state.Year}
                    options={this.state.startyearoptions}
                    onChange={this.handleYearoptions.bind(this, "startyear")}
                  />
                </div>
              </div>*/}

            </div>
            <div className="fake-input-right" >
              <div className="Driversdiv">
                {/*<ul className="DriversdivUl">
                <li className="DriversdivLiActive"><p className="DriversdivPActive" >كل السائقين</p></li>
                <li className="DriversdivLi"><p className="DriversdivP"  >السائقين الناشطين</p></li>
                <li className="DriversdivLi"><p className="DriversdivP">موقوف</p></li>
                <li className="DriversdivLi"><p className="DriversdivP">في الإنتظار</p></li>
               
              </ul>*/}

                {this.tabs()}
              </div>
            </div>
          </div>


          <br /> <br /> <br />



        </div>
      </div>
    );
  }
}

export default Dashboard;




