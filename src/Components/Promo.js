import React, { Component } from 'react';
import axios from 'axios';
import SkyLight from 'react-skylight';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { CSVLink, CSVDownload } from 'react-csv';
var ReactRouter = require('flux-react-router');
let dayID = "";
let monthID = "";
let yearID = "";
let dayIDE = "";
let monthIDE = "";
let yearIDE = "";


let dayIDEdit = "";
let monthIDEdit = "";
let yearIDEdit = "";
let dayIDEEdit = "";
let monthIDEEdit = "";
let yearIDEEdit = "";

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
            startmonthoptions: [],
            startyearoptions: [],
            enddayoptions: [],
            endmonthoptions: [],
            endyearoptions: [],
            startdayoptionsEdit: [],
            startmonthoptionsEdit: [],
            startyearoptionsEdit: [],
            enddayoptionsEdit: [],
            endmonthoptionsEdit: [],
            endyearoptionsEdit: [],

        };


    }

    componentDidMount() {
        var itemIds = [];
        var itemIds2 = [];
        var itemIds3 = [];
        var itemIds4 = [];
        var itemIds5 = [];
        var itemIds6 = [];
        for (var i = 0; i < 32; i++) {
            itemIds.push(
                {
                    value: i,
                    label: i
                }
            );
        }
        for (var i = 0; i < 13; i++) {
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

        for (var i = 0; i < 32; i++) {
            itemIds4.push(
                {
                    value: i,
                    label: i
                }
            );
        }
        for (var i = 0; i < 13; i++) {
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

        // console.log(itemIds)
        this.setState({
            startdayoptions: itemIds,
            startmonthoptions: itemIds2,
            startyearoptions: itemIds3,
            enddayoptions: itemIds4,
            endmonthoptions: itemIds5,
            endyearoptions: itemIds6,
            startdayoptionsEdit: itemIds,
            startmonthoptionsEdit: itemIds2,
            startyearoptionsEdit: itemIds3,
            enddayoptionsEdit: itemIds4,
            endmonthoptionsEdit: itemIds5,
            endyearoptionsEdit: itemIds6,
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
            startdayEdit: "",
            startmonthEdit: "",
            startyearEdit: "",
            enddayEdit: "",
            endmonthEdit: "",
            endyearEdit: "",
            lessThanAll: -1,
            greaterThanAll: 15,
            editpromoAllowedRedemptionTimes: "",
            editpromoCodeType: "",
            editpromoCodeValue: "",
            editpromoDescription: "",
            editpromoStartDate: "",
            editpromoExpiryDate: "",
            editpromoDiscountPercent: "",
            editpromoDiscountAmount: "",
            editpromoMaximumAmount: "",
            editpromoStatus: "",

        })
        axios.get('/operator/getallpromocodes').then(function (response) {
            console.log(response, "/operator/getallpromocodes Response")
            var x = response.data;
            var objects = [];


            x.forEach(function (item) {
                // console.log(item)
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
        if (value) {
            dayID = value.value;
        } else {
            dayID = "";
        }
        this.handleBirthday()
        console.log(value);
        console.log(dayID);
    }

    handleMonthoptions(type, value) {
        this.setState({ [type]: value });
        if (value) {
            monthID = value.value;
        } else {
            monthID = "";
        }
        this.handleBirthday()
        console.log(value);
        console.log(monthID);
    }

    handleYearoptions(type, value) {
        this.setState({ [type]: value });
        if (value) {
            yearID = value.value;
        } else {
            yearID = "";
        }
        this.handleBirthday()
        console.log(value);
        console.log(yearID);
    }
    handleDayoptionsE(type, value) {
        this.setState({ [type]: value });
        if (value) {
            dayIDE = value.value;
        } else {
            dayIDE = "";
        }
        this.handleBirthday()
        console.log(value);
        console.log(dayIDE);
    }

    handleMonthoptionsE(type, value) {
        this.setState({ [type]: value });
        if (value) {
            monthIDE = value.value;
        } else {
            monthIDE = "";
        }
        this.handleBirthday()
        console.log(value);
        console.log(monthIDE);
    }

    handleYearoptionsE(type, value) {
        this.setState({ [type]: value });
        if (value) {
            yearIDE = value.value;
        } else {
            yearIDE = "";
        }
        this.handleBirthday()
        console.log(value);
        console.log(yearIDE);
    }
    handleBirthday() {
        console.log(yearID, monthID - 1, dayID)
        this.setState({
            birthdaydate: new Date(yearID, monthID - 1, dayID).getTime(),
            birthdaydateE: new Date(yearIDE, monthIDE - 1, dayIDE).getTime(),
        });
        console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
    }








    handleDayoptionsEdit(type, value) {
        this.setState({ [type]: value });
        if (value) {
            dayIDEdit = value.value;
        } else {
            dayIDEdit = "";
        }
        this.handleBirthdayEdit()
        console.log(value);
        console.log(dayIDEdit);
    }

    handleMonthoptionsEdit(type, value) {
        this.setState({ [type]: value });
        if (value) {
            monthIDEdit = value.value;
        } else {
            monthIDEdit = "";
        }
        this.handleBirthdayEdit()
        console.log(value);
        console.log(monthIDEdit);
    }

    handleYearoptionsEdit(type, value) {
        this.setState({ [type]: value });
        if (value) {
            yearIDEdit = value.value;
        } else {
            yearIDEdit = "";
        }
        this.handleBirthdayEdit()
        console.log(value);
        console.log(yearIDEdit);
    }
    handleDayoptionsEEdit(type, value) {
        this.setState({ [type]: value });
        if (value) {
            dayIDEEdit = value.value;
        } else {
            dayIDEEdit = "";
        }
        this.handleBirthdayEdit()
        console.log(value);
        console.log(dayIDEEdit);
    }

    handleMonthoptionsEEdit(type, value) {
        this.setState({ [type]: value });
        if (value) {
            monthIDEEdit = value.value;
        } else {
            monthIDEEdit = "";
        }
        this.handleBirthdayEdit()
        console.log(value);
        console.log(monthIDEEdit);
    }

    handleYearoptionsEEdit(type, value) {
        this.setState({ [type]: value });
        if (value) {
            yearIDEEdit = value.value;
        } else {
            yearIDEEdit = "";
        }
        this.handleBirthdayEdit()
        console.log(value);
        console.log(yearIDEEdit);
    }



    handleBirthdayEdit() {
        console.log(yearIDEdit, monthIDEdit - 1, dayIDEdit)
        this.setState({
            birthdaydateEdit: new Date(yearIDEdit, monthIDEdit - 1, dayIDEdit).getTime(),
            birthdaydateEEdit: new Date(yearIDEEdit, monthIDE - 1, dayIDEEdit).getTime(),
        });
        console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
    }
    handlePromo(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/Promo")

        e.preventDefault();
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
    setPromoData(event, index) {
        var that = this;
        console.info("in the rtight funciton")
        console.log(event, index, "event, ide")
        var id = index;
        let obj;
        let objType;
        let objValue;
        console.log(this.state, " this.state")
        console.log(this.state.objects, " this.state.objects")
        console.log(that.state.objects, " that.state.objects")
        var array = this.state.objects;
        array.forEach(function (item) {
            // console.log(item, "item")
            if (item._id === id) {
                obj = item
                objType = item.codeType
                objValue = item.codeValue
                var parser = parseInt(item.startDate)
                var birthdate = new Date(parser);

                var parser2 = parseInt(item.expiryDate)
                var birthdate2 = new Date(parser2);
                console.log(obj, "obj")
                that.setState({
                    editpromoAllowedRedemptionTimes: obj.allowedRedemptionTimes,
                    editpromoCodeType: objType,
                    editpromoCodeValue: objValue,
                    editpromoDescription: obj.description,

                    editpromoStartDate: obj.startDate,
                    StartYear: birthdate.getFullYear(),
                    StartMonth: birthdate.getMonth() + 1,
                    StartDay: birthdate.getDate(),

                    editpromoExpiryDate: obj.expiryDate,
                    EndYear: birthdate2.getFullYear(),
                    EndMonth: birthdate2.getMonth() + 1,
                    EndDay: birthdate2.getDate(),

                    editpromoDiscountPercent: obj.discountPercent,
                    editpromoDiscountAmount: obj.discountAmount,
                    editpromoMaximumAmount: obj.maximumAmount,
                    startdayEdit: "",
                    startmonthEdit: "",
                    startyearEdit: "",
                    enddayEdit: "",
                    endmonthEdit: "",
                    endyearEdit: "",
                    // editpromoStatus: obj.status
                })

            }

        })
        console.log(obj, "obj again")
        console.log(objType, "objType again")
        console.log(objValue, "objValue again")


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
                            var parser = row.startDate
                            console.log(row)
                            var birthdate = new Date(parser);
                            var day = birthdate.getFullYear()
                            var month = birthdate.getMonth() + 1
                            var year = birthdate.getDate()
                            var startFormattedTime = day + '/' + month + '/' + year;
                            // console.log(startFormattedTime, "startFormattedTime")

                            var parser2 = row.expiryDate
                            var birthdate2 = new Date(parser2);
                            var day2 = birthdate2.getFullYear()
                            var month2 = birthdate2.getMonth() + 1
                            var year2 = birthdate2.getDate()
                            var startFormattedTime2 = day2 + '/' + month2 + '/' + year2;
                            // console.log(row.startDate, "row.startDate    ", row.startDate, "row.startDate")
                            // console.log(birthdate, "birthdate    ", birthdate2, "birthdate")
                            // console.log(startFormattedTime2, "startFormattedTime2")

                            re.push("./Path 1161.png")
                            re.push(startFormattedTime)
                            re.push(startFormattedTime2)
                            re.push(row.codeType)
                            re.push(row.codeValue)
                        }
                        return (
                            <tr>
                                {
                                    re.map(function (col, index) {
                                        {/*console.log(col)*/ }
                                        // console.log(col)
                                        if (typeof col === "string" && col.slice(0, 2) === "./") {
                                            return <td className="PTD"><img className="tdImg" src={col} onClick={() => that.qq.apply(that, [this, row])} /></td>
                                            {/*return <td className="PTD"><img className="tdImg" src={col} src={col} onClick={that.setPromoData.bind(this, row._id)} /></td>*/ }
                                            {/*return <td className="PTD"><img className="tdImg" src={col} onClick={that.doit.bind(this, row._id)} /></td>*/ }
                                        }
                                        else if (index === 2) {
                                            return <td className="PTD"><div >{col}</div></td>
                                        }
                                        else if (index === 3) {
                                            return <td className="PTD"><div >{col}</div></td>
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


    qq(event, row) {
        this.setPromoData(event, row._id)
        this.refs.EditPromoDialog.show()
    }

    handleSubmit(e) {
        var that = this;




        let timestampp = Math.floor(this.state.birthdaydate);
        let timestamppE = Math.floor(this.state.birthdaydateE);


        var obj = {};
        obj['codeValue'] = this.refs.value.value;
        obj['codeType'] = this.refs.type.value;
        obj['startDate'] = timestampp;
        obj['expiryDate'] = timestamppE;
        if (this.refs.description.value) {
            obj['description'] = this.refs.description.value;
        }
        else {

        }
        if (this.refs.percentage.value) {
            obj['discountPercent'] = this.refs.percentage.value;
        }
        else {

        }
        if (this.refs.amount.value) {
            obj['discountAmount'] = this.refs.amount.value;
        }
        else {

        }
        if (this.refs.maxAmount.value) {
            obj['maximumAmount'] = this.refs.maxAmount.value;
        }
        else {

        }
        if (this.refs.redemptinTimes.value) {
            obj['allowedRedemptionTimes'] = this.refs.redemptinTimes.value;
        }
        else {

        }


        console.log()

        axios.post('/operator/createPromoCode', obj).then(function (response) {
            console.log(response)

        }).catch(function (error) {

            console.log(error)
        })
    }



    handleEdit(e) {
        var that = this;




        let timestampp = Math.floor(this.state.birthdaydateEdit);
        let timestamppE = Math.floor(this.state.birthdaydateEEdit);


        var obj = {};
        obj['codeValue'] = this.refs.valueEdit.value;
        obj['codeType'] = this.refs.typeEdit.value;
        obj['startDate'] = timestampp;
        obj['expiryDate'] = timestamppE;
        if (this.refs.description.value) {
            obj['description'] = this.refs.descriptionEdit.value;
        }
        else {

        }
        if (this.refs.percentage.value) {
            obj['discountPercent'] = this.refs.percentageEdit.value;
        }
        else {

        }
        if (this.refs.amount.value) {
            obj['discountAmount'] = this.refs.amountEdit.value;
        }
        else {

        }
        if (this.refs.maxAmount.value) {
            obj['maximumAmount'] = this.refs.maxAmountEdit.value;
        }
        else {

        }
        if (this.refs.redemptinTimes.value) {
            obj['allowedRedemptionTimes'] = this.refs.redemptinTimesEdit.value;
        }
        else {

        }



        console.log()

        axios.post('/operator/createPromoCode', obj).then(function (response) {
            console.log(response)

        }).catch(function (error) {

            console.log(error)
        })
    }


    ToCSV(event) {
        if (this.state.objects.length) {

            var promos = this.state.objects;
            var tempArray = [];
            tempArray.length = this.state.objects.length;
            var anotherTempArray = []
            // console.log(tempArray, "tempArray")
            // console.log(promos, "promos")
            // console.log(promos[1], "promos[1]")
            // console.log(promos[1].codeValue, "promos[1].codeValue")
            // console.log(this.state.objects.length, "this.state.objects.length")
            var start, startFormattedTime, startday, startmonth, startyear, end, endday, endmonth, endyear, endFormattedTime;
            for (var x = 0; x < this.state.objects.length; x++) {
                // console.log(promos[x], "promos["+x+"]")
                tempArray[x] = []
                if (promos[x].codeValue) {
                    tempArray[x].push(promos[x].codeValue)
                }
                else {
                    tempArray[x].push("-")
                }
                if (promos[x].codeType) {
                    tempArray[x].push(promos[x].codeType)
                }
                else {
                    tempArray[x].push("-")
                }
                // tempArray[x].push(promos[x].codeValue)
                // tempArray[x].push(promos[x].codeType)
                if (promos[x].startDate && promos[x].expiryDate) {

                    start = new Date(promos[x].startDate)
                    startday = start.getFullYear()
                    startmonth = start.getMonth() + 1
                    startyear = start.getDate()
                    startFormattedTime = startday + '/' + startmonth + '/' + startyear;

                    end = new Date(promos[x].expiryDate)
                    endday = end.getFullYear()
                    endmonth = end.getMonth() + 1
                    endyear = end.getDate()
                    endFormattedTime = endday + '/' + endmonth + '/' + endyear;
                    tempArray[x].push(startFormattedTime)
                    tempArray[x].push(endFormattedTime)
                }
                else {
                    tempArray[x].push("-")
                    tempArray[x].push("-")
                }
                console.log(tempArray[x], "tempArray["+x+"]")
            }



            // for (var x = 0; x < this.state.objects.length; x++) {
            //     // console.log(promos[x], "promos["+x+"]")
            //     promos[x] = []
            //     if (promos[x].codeValue) {
            //         anotherTempArray[x].push(promos[x].codeValue)
            //     }
            //     else {
            //         anotherTempArray[x].push("-")
            //     }
            //     if (promos[x].codeType) {
            //         anotherTempArray[x].push(promos[x].codeType)
            //     }
            //     else {
            //         anotherTempArray[x].push("-")
            //     }
            //     // tempArray[x].push(promos[x].codeValue)
            //     // tempArray[x].push(promos[x].codeType)
            //     if (promos[x].startDate && promos[x].expiryDate) {

            //         start = new Date(promos[x].startDate)
            //         startday = start.getFullYear()
            //         startmonth = start.getMonth() + 1
            //         startyear = start.getDate()
            //         startFormattedTime = startday + '/' + startmonth + '/' + startyear;

            //         end = new Date(promos[x].expiryDate)
            //         endday = end.getFullYear()
            //         endmonth = end.getMonth() + 1
            //         endyear = end.getDate()
            //         endFormattedTime = endday + '/' + endmonth + '/' + endyear;
            //         anotherTempArray[x].push(startFormattedTime)
            //         anotherTempArray[x].push(endFormattedTime)
            //     }
            //     else {
            //         anotherTempArray[x].push("-")
            //         anotherTempArray[x].push("-")
            //     }
            //     console.log(anotherTempArray[x], "tempArray[" + x + "]")
            // }


            this.setState({ tempcsv: tempArray })
        }

    }


    ToCSVRend() {
        if (this.state.tempcsv) {
            return (
                < CSVLink data={this.state.tempcsv} > Download me</CSVLink >
            )
        }
    }




    render() {
        // console.log(this.state.startdayoptions)
        var sky = {
            // backgroundColor: '#00897B',
            // color: '#ffffff',
            width: '70%',
            height: '700px',
            marginTop: '-300px',
            marginLeft: '-35%',
            // overflow: 'scroll',
            direction: 'rtl',
        };
        // console.log(this.state.StartDay, "StartDay  ", this.state.StartMonth, "StartMonth   ", this.state.StartYear, "StartYear")
        return (
            <div >

                <div className="Navdiv">
                    <ul className="NavdivUl">
                        <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
                        <li className="active li"><a onClick={() => { ReactRouter.goTo('/DashBoard') }}>السائقين</a></li>
                        {/*}<li><a >رحلات</a></li>{*/}
                        <li><a className="active" onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
                        <li><a >دعم</a></li>
                        <li><a onClick={() => { ReactRouter.goTo('/Reports') }}>تقارير</a></li>
                        <li><a onClick={() => { ReactRouter.goTo('/Branches') }}>فروع</a></li>
                        <li><a onClick={() => { ReactRouter.goTo('/Specialists') }}>الأخصائيين</a></li>
                        <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
                    </ul>
                </div>
                <br />
                <div className="fake-input-right-addNew" onClick={() => this.refs.PromoDialog.show()}>
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
                        <div className="newFake">
                            <input type="button" value="Click Here" onClick={this.ToCSV.bind(this)} className="LinkSubmit" />
                            {this.ToCSVRend()}
                        </div>
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


                <SkyLight hideOnOverlayClicked ref="PromoDialog" dialogStyles={sky}>
                    <div className="NewPopClass">
                        <div className="PopUpRow" >
                            <p className="newPopP">أسم البرومو كود</p>
                            <input type="text" className="NewTextFieldPopCode" ref="value" />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">نوع البرومو كود</p>
                            <input type="text" className="NewTextFieldPopCode" ref="type" />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">وصف</p>
                            <input type="text" className="NewTextFieldPopCode" ref="description" />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">تاريخ البدء</p>
                            <div className="Options-Groups">

                                <div className="OptionsTh">
                                    <Select
                                        ref="startday"
                                        placeholder="يوم"
                                        value={this.state.startday}
                                        options={this.state.startdayoptions}
                                        onChange={this.handleDayoptions.bind(this, "startday")}
                                    />
                                </div>

                                <div className="OptionsT">
                                    <Select
                                        ref="startmonth"
                                        placeholder="شهر"
                                        value={this.state.startmonth}
                                        options={this.state.startmonthoptions}
                                        onChange={this.handleMonthoptions.bind(this, "startmonth")}
                                    />
                                </div>
                                <div className="OptionsO">
                                    <Select
                                        ref="startyear"
                                        placeholder="سنة"
                                        value={this.state.startyear}
                                        options={this.state.startyearoptions}
                                        onChange={this.handleYearoptions.bind(this, "startyear")}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">تاريخ الإنتهاء</p>
                            <div className="Options-Groups">
                                <div className="OptionsTh">
                                    <Select
                                        ref="endday"
                                        placeholder="يوم"
                                        value={this.state.endday}
                                        options={this.state.enddayoptions}
                                        onChange={this.handleDayoptionsE.bind(this, "endday")}
                                    />
                                </div>

                                <div className="OptionsT">
                                    <Select
                                        ref="endmonth"
                                        placeholder="شهر"
                                        value={this.state.endmonth}
                                        options={this.state.endmonthoptions}
                                        onChange={this.handleMonthoptionsE.bind(this, "endmonth")}
                                    />
                                </div>

                                <div className="OptionsO">
                                    <Select
                                        ref="endyear"
                                        placeholder="سنة"
                                        value={this.state.endyear}
                                        options={this.state.endyearoptions}
                                        onChange={this.handleYearoptionsE.bind(this, "endyear")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="PopUpRow" >
                            <p className="newPopP">نسبة التخفيض</p>
                            <input type="text" className="NewTextFieldPopPer" ref="percentage" />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">كمية التخفيض</p>
                            <input type="text" className="NewTextFieldPopPer" ref="amount" />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">الحد الأقصى للمبلغ</p>
                            <input type="text" className="NewTextFieldPopPer" ref="maxAmount" />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">عدد إستخدام البرومو</p>
                            <input type="text" className="NewTextFieldPopPer" ref="redemptinTimes" />
                        </div>
                        <div className="PopUpRow2">
                            <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
                        </div>
                    </div>
                </SkyLight>


                <SkyLight hideOnOverlayClicked ref="EditPromoDialog" dialogStyles={sky}>
                    <div className="NewPopClass">
                        <div className="PopUpRow" >
                            <p className="newPopP">أسم البرومو كود</p>
                            <input type="text" className="NewTextFieldPopCode" ref="valueEdit" value={this.state.editpromoCodeValue} />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">نوع البرومو كود</p>
                            <input type="text" className="NewTextFieldPopCode" ref="typeEdit" value={this.state.editpromoCodeType} />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">وصف</p>
                            <input type="text" className="NewTextFieldPopCode" ref="descriptionEdit" value={this.state.editpromoDescription} />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">تاريخ البدء</p>
                            <div className="Options-Groups">
                                <div className="OptionsTh">
                                    <Select
                                        ref="startdayEdit"
                                        placeholder="يوم"
                                        value={this.state.StartDay}
                                        options={this.state.startdayoptionsEdit}
                                        onChange={this.handleDayoptionsEdit.bind(this, "startdayEdit")}
                                    />
                                </div>

                                <div className="OptionsT">
                                    <Select
                                        ref="startmonthEdit"
                                        placeholder="شهر"
                                        value={this.state.StartMonth}
                                        options={this.state.startmonthoptionsEdit}
                                        onChange={this.handleMonthoptionsEdit.bind(this, "startmonthEdit")}
                                    />
                                </div>
                                <div className="OptionsO">
                                    <Select
                                        ref="startyearEdit"
                                        placeholder="سنة"
                                        value={this.state.StartYear}
                                        options={this.state.startyearoptionsEdit}
                                        onChange={this.handleYearoptionsEdit.bind(this, "startyearEdit")}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">تاريخ الإنتهاء</p>
                            <div className="Options-Groups">
                                <div className="OptionsTh">
                                    <Select
                                        ref="enddayEdit"
                                        placeholder="يوم"
                                        value={this.state.EndDay}
                                        options={this.state.enddayoptionsEdit}
                                        onChange={this.handleDayoptionsEEdit.bind(this, "enddayEdit")}
                                    />
                                </div>
                                <div className="OptionsT">
                                    <Select
                                        ref="endmonthEdit"
                                        placeholder="شهر"
                                        value={this.state.EndMonth}
                                        options={this.state.endmonthoptionsEdit}
                                        onChange={this.handleMonthoptionsEEdit.bind(this, "endmonthEdit")}
                                    />
                                </div>
                                <div className="OptionsO">
                                    <Select
                                        ref="endyearEdit"
                                        placeholder="سنة"
                                        value={this.state.EndYear}
                                        options={this.state.endyearoptionsEdit}
                                        onChange={this.handleYearoptionsEEdit.bind(this, "endyearEdit")}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="PopUpRow" >
                            <p className="newPopP">نسبة التخفيض</p>
                            <input type="text" className="NewTextFieldPopPer" ref="percentageEdit" value={this.state.editpromoDiscountPercent} />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">كمية التخفيض</p>
                            <input type="text" className="NewTextFieldPopPer" ref="amountEdit" value={this.state.editpromoDiscountAmount} />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">الحد الأقصى للمبلغ</p>
                            <input type="text" className="NewTextFieldPopPer" ref="maxAmountEdit" value={this.state.editpromoMaximumAmount} />
                        </div>

                        <div className="PopUpRow" >
                            <p className="newPopP">عدد إستخدام البرومو</p>
                            <input type="text" className="NewTextFieldPopPer" ref="redemptinTimesEdit" value={this.state.editpromoAllowedRedemptionTimes} />
                        </div>
                        <div className="PopUpRow2">
                            <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleEdit.bind(this)} />
                        </div>
                    </div>
                </SkyLight>









                <div className="promotable" >
                    {this.table()}
                </div>
                <div className="nextprevious" >
                    <button className="nextpreviousButtons" onClick={this.nextAll.bind(this)}>&lt;</button>
                    <p className="nextpreviousP">{this.state.lessThanAll + 2} to {this.state.greaterThanAll}</p>
                    <button className="nextpreviousButtons" onClick={this.previousAll.bind(this)}>&gt;</button>
                </div>

            </div>
        );
    }
}

export default Promo;


