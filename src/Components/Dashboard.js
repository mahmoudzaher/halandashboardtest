import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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

    this.setState({
      objects: [],
      playlists: "PlayW.png",
      a: "UpB.png",
      b: "RepB.png",
      c: "NotB.png",
      searchfilter: ""
    })

    var that = this;

    axios.get('/api/operator/getalldrivers').then(function (response) {
      console.log(response, "helloooooooasdgkjuhasghdkjhasghdkjasgdkasgdakljshgdl")
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

  }
  static defaultProps = {

  }


  SuspendDriver(event, id) {
    console.log(event, id)
    var object = {
      driverId: event,
      newStatus: "suspended"
    }
    axios.post('api/operator/changedriverstatus', object).then(function (response) {
      console.log(response)
      // window.localStorage.setItem('sessionToken', response.data);
      alert("dirver suspended")
    }).catch(function (error) {
      alert(error.message);
      console.log(error)
    })
  }


  ReactivateDriver(event, id) {
    console.log(event, id)
    var object = {
      driverId: event,
      newStatus: "active"
    }
    axios.post('api/operator/changedriverstatus', object).then(function (response) {
      console.log(response)
      // window.localStorage.setItem('sessionToken', response.data);
      alert("dirver suspended")
    }).catch(function (error) {
      alert(error.message);
      console.log(error)
    })
  }


  GotoShowTripsOfDriverById(event, id) {
    console.log(event, id)
    var id = event;
    console.log("WoHOOOOOOOOOOOOOOOO");
    // ReactRouter.goTo("/DriverTrips")
    ReactRouter.goTo(`/DriverTrips/${event}`);
  }




  tableAll() {

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
            if (row.phoneNumber.includes(that.state.searchfilter)) {
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
            // re.push("محمد")
            {/*<img src="./Group 1433.png" />*/ }
            return (
              <tr key={index}>
                {
                  re.map(function (col, index) {
                    {/*console.log(col)*/ }

                    if (typeof col === "string" && col.slice(0, 12) === "./Group 1433") {
                      return <td className="PTDS" key={index} ><img className="tdImg" src={col} onClick={that.SuspendDriver.bind(this, row._id)} /></td>
                    }
                    else if (typeof col === "string" && col.slice(0, 12) === "./Group 1410") {
                      return <td className="PTDS" key={index} ><img className="tdImg" src={col} onClick={that.GotoShowTripsOfDriverById.bind(this, row._id)} /></td>
                    }
                    else if (typeof col === "string" && col.slice(0, 2) === "./") {
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



  tableActive() {

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
            // 
            if (row.status === "active" && row.phoneNumber.includes(that.state.searchfilter)) {
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

            // re.push("./Group 1433.png")
            // re.push("./Path 1161.png")
            // re.push("./Group 1410.png")
            // if (row.phoneNumber.length < 12) {
            //   re.push(row.phoneNumber)
            // }
            // else {
            //   re.push("-")
            // }
            // if (row.vehicle) {
            //   if (row.vehicle.vehicletype === "toktok") {

            //     re.push("./Group 1367.png")
            //   }

            //   if (row.vehicle.vehicletype === "motorcycle") {

            //     re.push("./Group 1355.png")
            //   }

            //   if (row.vehicle.vehicletype === "tricycle") {

            //     re.push("./Group 1368.png")
            //   }
            // }
            // else {
            //   re.push("-")
            // }
            // re.push(row.firstName)
            // re.push("محمد")
            {/*<img src="./Group 1433.png" />*/ }
            return (
              <tr key={index}>
                {
                  re.map(function (col, index) {
                    {/*console.log(col)*/ }
                    if (typeof col === "string" && col.slice(0, 12) === "./Group 1433") {
                      return <td className="PTDS" key={index} ><img className="tdImg" src={col} onClick={that.SuspendDriver.bind(this, row._id)} /></td>
                    }
                    else if (typeof col === "string" && col.slice(0, 12) === "./Group 1410") {
                      return <td className="PTDS" key={index} ><img className="tdImg" src={col} onClick={that.GotoShowTripsOfDriverById.bind(this, row._id)} /></td>
                    }
                    else if (typeof col === "string" && col.slice(0, 2) === "./") {
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



  tableSuspended() {

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

            if (row.status === "suspended" && row.phoneNumber.includes(that.state.searchfilter)) {
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

            // re.push("./Group 1433.png")
            // re.push("./Path 1161.png")
            // re.push("./Group 1410.png")
            // if (row.phoneNumber.length < 12) {
            //   re.push(row.phoneNumber)
            // }
            // else {
            //   re.push("-")
            // }
            // if (row.vehicle) {
            //   if (row.vehicle.vehicletype === "toktok") {

            //     re.push("./Group 1367.png")
            //   }

            //   if (row.vehicle.vehicletype === "motorcycle") {

            //     re.push("./Group 1355.png")
            //   }

            //   if (row.vehicle.vehicletype === "tricycle") {

            //     re.push("./Group 1368.png")
            //   }
            // }
            // else {
            //   re.push("-")
            // }
            // re.push(row.firstName)
            // re.push("محمد")
            {/*<img src="./Group 1433.png" />*/ }
            return (
              <tr key={index}>
                {
                  re.map(function (col, index) {
                    {/*console.log(col)*/ }
                    if (typeof col === "string" && col.slice(0, 12) === "./Group 1792") {
                      return <td className="PTDS" key={index} ><img className="tdImg" src={col} onClick={that.ReactivateDriver.bind(this, row._id)} /></td>
                    }
                    else if (typeof col === "string" && col.slice(0, 2) === "./") {
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


  tablePending() {

    var that = this;
    // console.log(this.state.objects);

    return (
      React.DOM.table({ className: "tableclass" },
        React.DOM.thead({ className: "tablehead" },
          <tr className="tableheadrow">
            {/*<td className="tableheadDT" >وقف</td>*/}

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


            if (row.status === "pending" && row.phoneNumber.includes(that.state.searchfilter)) {
              // re.push("./Group 1433.png")
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


            // re.push("./Group 1433.png")
            // re.push("./Path 1161.png")
            // re.push("./Group 1410.png")
            // if (row.phoneNumber.length < 12) {
            //   re.push(row.phoneNumber)
            // }
            // else {
            //   re.push("-")
            // }
            // if (row.vehicle) {
            //   if (row.vehicle.vehicletype === "toktok") {

            //     re.push("./Group 1367.png")
            //   }

            //   if (row.vehicle.vehicletype === "motorcycle") {

            //     re.push("./Group 1355.png")
            //   }

            //   if (row.vehicle.vehicletype === "tricycle") {

            //     re.push("./Group 1368.png")
            //   }
            // }
            // else {
            //   re.push("-")
            // }
            // re.push(row.firstName)
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
            {/*<li className="DriversdivLiActive"><p className="DriversdivPActive" >كل السائقين</p></li>
                <li className="DriversdivLi"><p className="DriversdivP"  >السائقين الناشطين</p></li>
                <li className="DriversdivLi"><p className="DriversdivP">موقوف</p></li>
                <li className="DriversdivLi"><p className="DriversdivP">في الإنتظار</p></li>*/}

          </TabList>
          <div id="tabspanels">
            <TabPanel>
              {/*<h2>Just The UI</h2>*/}
              <div className="Tablediv">
                {this.tableAll()}
              </div>
            </TabPanel>
            <TabPanel>
              {/*<h2>Just The UI</h2>*/}
              <div className="Tablediv">
                {this.tableActive()}
              </div>
            </TabPanel>
            <TabPanel>
              {/*<h2>Just The UI</h2>*/}
              <div className="Tablediv">
                {this.tableSuspended()}
              </div>
            </TabPanel>
            <TabPanel>
              {/*<h2>Just The UI</h2>*/}
              <div className="Tablediv">
                {this.tablePending()}
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

    return (
      <div>

        <div className="Navdiv">
          <ul>
            <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
            <li className="active li"><a className="active" href="#home">السائقين</a></li>
            <li><a href="#news">رحلات</a></li>
            <li><a href="#contact" onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
            <li><a href="#about">دعم</a></li>
            <li><a href="#about">تقارير</a></li>
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


        {/*<div className="Tablediv">
          {this.table()}
        </div>*/}



        {/*{this.tabs()}*/}






      </div>
    );
  }
}

export default Dashboard;

{/*<input type="button" value="Submit" onClick={this.handleSubmit.bind(this)} />*/ }
{/*<input type="button" value="Create User" onClick={this.handleCreate.bind(this)} />

        <input type="button" value="Update User" onClick={this.handleUpdate.bind(this)} />

        <input type="button" value="Add Vehicle" onClick={this.handleAddV.bind(this)} />

        <input type="button" value="Add Driver's Papers" onClick={this.handleAddP.bind(this)} /> */}
  /* ReactRouter.goTo('/createUser');*/


