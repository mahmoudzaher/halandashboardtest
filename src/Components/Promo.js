import React, { Component } from 'react';
import axios from 'axios';
import SkyLight from 'react-skylight';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
var ReactRouter = require('flux-react-router');
let artistID = "";

class Promo extends Component {

    constructor() {
        super();
        // axios.defaults.baseURL = 'https://halanapp.herokuapp.com/';
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('sessionToken');
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var that = this;
        this.state = {
            startdayoptions: [],

        };


    }

    componentDidMount() {
        var itemIds = [];
        for (var i = 0; i < 32; i++) {
            itemIds.push(
                {
                    value: i,
                    label: i
                }
            );
        } console.log(itemIds)
        this.setState({
            startdayoptions: itemIds,
        })

    }
    componentWillMount() {
        var that = this;
        this.setState({
            objects: [],
            startday: "",
            startmonth: "",
            startyear: "",
            endday: "",
            endmonth: "",
            endyear: "",
            lessThanAll: -1,
            greaterThanAll: 15,

        })
        axios.get('/api/operator/getallpromocodes').then(function (response) {
            console.log(response.data, "asjdhakjsgdjhalsgdkjaslgdbjksagdkjhasgdjhasgdkjahsgdblkjasdas25136543543541325413543543654")
            var x = response.data;
            var objects = [];


            x.forEach(function (item) {
                console.log(item)
                objects.push(item);

            })

            that.setState({

                objects: objects

            })

        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })
    }
    static defaultProps = {


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

    handleDrivers(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo('/DashBoard')

        e.preventDefault();
    }

    handlePointsTBA(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/PointsTBA")

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

    Dayoptions(e) {
        var sel = this.refs.SelectPopDayOptions;
        // var sel = document.getElementById('SelectPopDayOptions');
        for (var i = 0; i <= 31; i++) {
            React.createElement('option')

        }

    }
    handleDayoptions(type, value) {
        this.setState({ [type]: value });
        //  artistID = value.value;
        if (value) {
            artistID = value.value;
        } else {
            artistID = "";
        }

        console.log(value);
        console.log(artistID);
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


    table() {

        var that = this;
        // console.log(this.state.objects);


        return (
            React.DOM.table({ className: "tableclass" },
                React.DOM.thead({ className: "tablehead" },
                    <tr className="tableheadrow">
                        <td className="tableheadDT" >الحالة</td>

                        <td className="tableheadDT" >تعديل</td>

                        <td className="tableheadF" >تاريخ الانتهاء</td>

                        <td className="tableheadD" >تاريخ  البدء</td>

                        <td className="tableheadD" >نوع البرومو</td>

                        <td className="tableheadDTR" >أسم البرومو</td>
                    </tr>
                ),
                React.DOM.tbody(null,
                    that.state.objects.map(function (row, index) {
                        let re = [];
                        // console.log(row)
                        if (that.state.lessThanAll < index && index < that.state.greaterThanAll) {
                            if (row.status === true) {
                                re.push("enabled")
                            }
                            else {
                                re.push("disabled")
                            }
                            re.push("./Path 1161.png")
                            re.push(row.expiryDate)
                            re.push(row.startDate)
                            re.push(row.codeType)
                            re.push(row.codeValue)
                        }
                        return (
                            <tr>
                                {
                                    re.map(function (col, index) {
                                        console.log(col)
                                        if (typeof col === "string" && col.slice(0, 2) === "./") {
                                            return <td className="PTD"><img className="tdImg" src={col} /></td>
                                        }
                                        else {
                                            return <td className="PTD"><div >{col}</div></td>
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
        console.log(this.state.startdayoptions)
        return (
            <div>

                <div className="Navdiv">
                    <ul className="NavdivUl">
                        <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
                        <li className="active li" ><a onClick={this.handleDrivers.bind(this)} >السائقين</a></li>
                        <li><a href="#news">رحلات</a></li>
                        <li ><a href="#contact" className="active">برومو كود</a></li>
                        <li><a href="#about">دعم</a></li>
                        <li><a >تقارير</a></li>
                        <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
                    </ul>
                </div>
                <br />
                <div className="fake-input-right-add" onClick={() => this.refs.PromoDialog.show()}>
                    <div className="profileI">
                        <img src="./promo.png" id="profile-Img" />
                    </div>
                    <div className="profileP">
                        <p>إنشاء برومو كود</p>
                    </div>
                </div>

                <br /><br /><br />
                <div className="fake-input">
                    <div className="fake-input-left">
                        <div className="fake-input-left-search">
                            <input type="text" placeholder="بحث" className="fake-input-left-text" />
                            <img src="./Group 1392.png" />
                        </div>

                    </div>
                    <div className="fake-input-right" >
                        <div className="DriversdivT">
                            <ul className="DriversdivUl">
                                <li className="DriversdivLiActive"><p className="DriversdivPActive" >برومو كود جاري</p></li>
                                <li className="DriversdivLi"><p className="DriversdivP"  >برومو كود سابق</p></li>
                            </ul>
                        </div>
                    </div>
                </div>


                <SkyLight hideOnOverlayClicked ref="PromoDialog" >
                    <div className="PopClass">
                        <div className="PopClass-Right">
                            <div className="PopClass-Right-Div">
                                <div className="PopClass-Right-Div-Contents-Div">
                                    <p className="PopP">أسم البرومو كود</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-Div">
                                    <p className="PopP">نوع البرومو كود</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-Div">
                                    <p className="PopP">تاريخ البدء</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-Div">
                                    <p className="PopP">تاريخ الإنتهاء</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-Div">
                                    <p className="PopP">نسبة التخفيض</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-Div">
                                    <p className="PopP">كمية التخفيض</p>
                                </div>
                            </div>

                        </div>
                        <div className="PopClass-Left">
                            {/*<div>


                            </div>*/}
                            <div className="PopClass-Left-Div">
                                <div className="TextFieldPopCodeDiv">
                                    <input type="text" className=" TextFieldPopCode" />
                                </div>
                                <div className="TextFieldPopCodeDiv">
                                    <input type="text" className=" TextFieldPopCode" />
                                </div>
                                <div className="Options-Groups">
                                    <div className="OptionsO">
                                        <Select
                                            ref="startday"
                                            placeholder="سنة"
                                            className="menu-outer-top"
                                            value={this.state.startday}
                                            options={this.state.startdayoptions}
                                            onChange={this.handleDayoptions.bind(this, "startday")}
                                        />
                                    </div>

                                    <div className="OptionsT">


                                        <Select
                                            ref="startday"
                                            placeholder="شهر"
                                            className="menu-outer-top"
                                            value={this.state.startday}
                                            options={this.state.startdayoptions}
                                            onChange={this.handleDayoptions.bind(this, "startday")}
                                        />
                                    </div>

                                    <div className="OptionsTh">
                                        <Select
                                            ref="startday"
                                            placeholder="يوم"
                                            className="menu-outer-top"
                                            value={this.state.startday}
                                            options={this.state.startdayoptions}
                                            onChange={this.handleDayoptions.bind(this, "startday")}
                                        />
                                    </div>
                                </div>

                                <div className="Options-Groups">
                                    <div className="OptionsO">

                                        <Select
                                            ref="startday"
                                            placeholder="سنة"
                                            className="menu-outer-top"
                                            value={this.state.startday}
                                            options={this.state.startdayoptions}
                                            onChange={this.handleDayoptions.bind(this, "startday")}
                                        />
                                    </div>

                                    <div className="OptionsT">

                                        <Select
                                            ref="startday"
                                            placeholder="شهر"
                                            className="menu-outer-top"
                                            value={this.state.startday}
                                            options={this.state.startdayoptions}
                                            onChange={this.handleDayoptions.bind(this, "startday")}
                                        />
                                    </div>

                                    <div className="OptionsTh">

                                        <Select
                                            ref="startday"
                                            placeholder="يوم"
                                            className="menu-outer-top"
                                            value={this.state.startday}
                                            options={this.state.startdayoptions}
                                            onChange={this.handleDayoptions.bind(this, "startday")}
                                        />
                                    </div>
                                </div>
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" />
                                </div>
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" />
                                </div>
                            </div>

                            <div className="buttonT">
                                <input type="button" value="تفعيل" className="button" className="coolT" />
                                {/*onClick={this.handleSubmit.bind(this)}*/}
                            </div>
                        </div>

                    </div>

                </SkyLight>
                <div className="promotable" >
                    {this.table()}
                </div>
                {/*<div className="nextprevious" >
                    <button onClick={this.nextAll.bind(this)}>next</button>
                    <button onClick={this.previousAll.bind(this)}>previous</button>
                </div>*/}
                <div className="nextprevious" >
                    <button className="nextpreviousButtons" onClick={this.nextAll.bind(this)}>&lt;</button>
                    <p className="nextpreviousP">{this.state.lessThanAll + 2} to {this.state.greaterThanAll}</p>
                    <button className="nextpreviousButtons" onClick={this.previousAll.bind(this)}>&gt;</button>
                </div>
                {/*<br /> <br /> <br />*/}



                {/*<div className="Tablediv">
         
        </div>*/}

            </div>
        );
    }
}

export default Promo;


