import React, { Component } from 'react';
import axios from 'axios';
import SkyLight from 'react-skylight';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
var ReactRouter = require('flux-react-router');
let dayID = "";
let monthID = "";
let yearID = "";
let dayIDE = "";
let monthIDE = "";
let yearIDE = "";

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
        var x = itemIds3 + 10
        this.setState({
            startdayoptions: itemIds,
            startmonthoptions: itemIds2,
            startyearoptions: itemIds3,
            enddayoptions: itemIds4,
            endmonthoptions: itemIds5,
            endyearoptions: itemIds6,
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
        axios.get('/api/operator/getallpromocodes').then(function (response) {
            console.log(response, "/api/operator/getallpromocodes Response")
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
        console.log(yearID, monthID + 1, dayID)
        this.setState({
            birthdaydate: new Date(yearID, monthID + 1, dayID).getTime(),
            birthdaydateE: new Date(yearIDE, monthIDE + 1, dayIDE).getTime(),
        });
        console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
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
                console.log(obj, "obj")
                that.setState({
                    editpromoAllowedRedemptionTimes: obj.allowedRedemptionTimes,
                    editpromoCodeType: objType,
                    editpromoCodeValue: objValue,
                    editpromoDescription: obj.description,
                    editpromoStartDate: obj.startDate,
                    editpromoExpiryDate: obj.expiryDate,
                    editpromoDiscountPercent: obj.discountPercent,
                    editpromoDiscountAmount: obj.discountAmount,
                    editpromoMaximumAmount: obj.maximumAmount,
                    // editpromoStatus: obj.status
                })

            }

        })
        console.log(obj, "obj again")
        console.log(objType, "objType again")
        console.log(objValue, "objValue again")
        // that.setState({
        //     editpromoAllowedRedemptionTimes: obj.allowedRedemptionTimes,
        //     editpromoCodeType: objType,
        //     editpromoCodeValue: objValue,
        //     editpromoDescription: obj.description,
        //     editpromoStartDate: obj.startDate,
        //     editpromoExpiryDate: obj.expiryDate,
        //     editpromoDiscountPercent: obj.discountPercent,
        //     editpromoDiscountAmount: obj.discountAmount,
        //     editpromoMaximumAmount: obj.maximumAmount,
        //     editpromoStatus: obj.status
        // })



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
                                        {/*console.log(col)*/ }
                                        if (typeof col === "string" && col.slice(0, 2) === "./") {
                                            return <td className="PTD"><img className="tdImg" src={col} onClick={() => that.qq.apply(that, [this, row])} /></td>
                                            {/*return <td className="PTD"><img className="tdImg" src={col} src={col} onClick={that.setPromoData.bind(this, row._id)} /></td>*/ }
                                            {/*return <td className="PTD"><img className="tdImg" src={col} onClick={that.doit.bind(this, row._id)} /></td>*/ }
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




        let timestampp = Math.floor(this.state.birthdaydate / 1000);
        let timestamppE = Math.floor(this.state.birthdaydateE / 1000);


        var obj = {};
        obj['codeValue'] = this.refs.value.value;
        obj['codeType'] = this.refs.value.value;
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
            obj['allowedRedepmtionTimes'] = this.refs.redemptinTimes.value;
        }
        else {

        }

        //  var object = {
        //     driver: this.state.userID,
        //     vehicletype: tempVehicleType,
        //     model: tempvehicleDateofMake,
        //     make: tempVehicleMake,
        //     label: tempvehicleLabel,
        //     vehicleOwner: vehicleOwner,
        //     shaseehNo: tempvehicleShaseeh,
        //     motorNo: tempvehicleMotor
        // }

        console.log()

        axios.post('/api/operator/createPromoCode', obj).then(function (response) {
            console.log(response)

        }).catch(function (error) {

            console.log(error)
        })
    }




    render() {
        // console.log(this.state.startdayoptions)
        var sky = {
            width: '50%',
            height: '65%',
            top: '40%',
            overflow: 'scroll',
        };
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


                <SkyLight hideOnOverlayClicked ref="PromoDialog" dialogStyles={sky}>
                    <div className="PopClass">
                        <div className="PopClass-Right">
                            <div className="PopClass-Right-Div">
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">أسم البرومو كود</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">نوع البرومو كود</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">وصف</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">تاريخ البدء</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">تاريخ الإنتهاء</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">نسبة التخفيض</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">كمية التخفيض</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">الحد الأقصى للمبلغ</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">عدد إستخدام البرومو</p>
                                </div>
                            </div>

                        </div>
                        <div className="PopClass-Left">
                            <div className="PopClass-Left-Div">
                                <div className="TextFieldPopCodeDiv">
                                    <input type="text" className=" TextFieldPopCode" ref="value" />
                                </div>
                                <div className="TextFieldPopCodeDiv">
                                    <input type="text" className=" TextFieldPopCode" ref="type" />
                                </div>
                                <div className="TextFieldPopCodeDiv">
                                    <input type="text" className=" TextFieldPopCode" ref="description" />
                                </div>
                                <div className="Options-Groups">
                                    <div className="OptionsO">
                                        <Select
                                            ref="startyear"
                                            placeholder="سنة"
                                            className="menu-outer-top"
                                            value={this.state.startyear}
                                            options={this.state.startyearoptions}
                                            onChange={this.handleYearoptions.bind(this, "startyear")}
                                        />
                                    </div>

                                    <div className="OptionsT">
                                        <Select
                                            ref="startmonth"
                                            placeholder="شهر"
                                            className="menu-outer-top"
                                            value={this.state.startmonth}
                                            options={this.state.startmonthoptions}
                                            onChange={this.handleMonthoptions.bind(this, "startmonth")}
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
                                            ref="endyear"
                                            placeholder="سنة"
                                            className="menu-outer-top"
                                            value={this.state.endyear}
                                            options={this.state.endyearoptions}
                                            onChange={this.handleYearoptionsE.bind(this, "endyear")}
                                        />
                                    </div>

                                    <div className="OptionsT">
                                        <Select
                                            ref="endmonth"
                                            placeholder="شهر"
                                            className="menu-outer-top"
                                            value={this.state.endmonth}
                                            options={this.state.endmonthoptions}
                                            onChange={this.handleMonthoptionsE.bind(this, "endmonth")}
                                        />
                                    </div>

                                    <div className="OptionsTh">
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
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" ref="percentage" />
                                </div>
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" ref="amount" />
                                </div>
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" ref="maxAmount" />
                                </div>
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" ref="redemptinTimes" />
                                </div>
                            </div>

                            <div className="buttonPop">
                                <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
                                {/*onClick={this.handleSubmit.bind(this)}*/}
                            </div>
                        </div>

                    </div>

                </SkyLight>







{/*
     //     editpromoAllowedRedemptionTimes: obj.allowedRedemptionTimes,
        //     editpromoCodeType: objType,
        //     editpromoCodeValue: objValue,
        //     editpromoDescription: obj.description,
        //     editpromoStartDate: obj.startDate,
        //     editpromoExpiryDate: obj.expiryDate,
        //     editpromoDiscountPercent: obj.discountPercent,
        //     editpromoDiscountAmount: obj.discountAmount,
        //     editpromoMaximumAmount: obj.maximumAmount,
        //     editpromoStatus: obj.status*/}





                <SkyLight hideOnOverlayClicked ref="EditPromoDialog" dialogStyles={sky}>
                    <div className="PopClass">
                        <div className="PopClass-Right">
                            <div className="PopClass-Right-Div">
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">أسم البرومو كود</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">نوع البرومو كود</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">وصف</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">تاريخ البدء</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">تاريخ الإنتهاء</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">نسبة التخفيض</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">كمية التخفيض</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">الحد الأقصى للمبلغ</p>
                                </div>
                                <div className="PopClass-Right-Div-Contents-DivNew">
                                    <p className="PopP">عدد إستخدام البرومو</p>
                                </div>
                            </div>

                        </div>
                        <div className="PopClass-Left">
                            <div className="PopClass-Left-Div">
                                <div className="TextFieldPopCodeDiv">
                                    <input type="text" className=" TextFieldPopCode" ref="value" value={this.state.editpromoCodeValue} />
                                </div>
                                <div className="TextFieldPopCodeDiv">
                                    <input type="text" className=" TextFieldPopCode" ref="type" value={this.state.editpromoCodeType}/>
                                </div>
                                <div className="TextFieldPopCodeDiv">
                                    <input type="text" className=" TextFieldPopCode" ref="description" value={this.state.editpromoDescription}/>
                                </div>
                                <div className="Options-Groups">
                                    <div className="OptionsO">
                                        <Select
                                            ref="startyear"
                                            placeholder="سنة"
                                            className="menu-outer-top"
                                            value={this.state.startyear}
                                            options={this.state.startyearoptions}
                                            onChange={this.handleYearoptions.bind(this, "startyear")}
                                        />
                                    </div>

                                    <div className="OptionsT">
                                        <Select
                                            ref="startmonth"
                                            placeholder="شهر"
                                            className="menu-outer-top"
                                            value={this.state.startmonth}
                                            options={this.state.startmonthoptions}
                                            onChange={this.handleMonthoptions.bind(this, "startmonth")}
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
                                            ref="endyear"
                                            placeholder="سنة"
                                            className="menu-outer-top"
                                            value={this.state.endyear}
                                            options={this.state.endyearoptions}
                                            onChange={this.handleYearoptionsE.bind(this, "endyear")}
                                        />
                                    </div>

                                    <div className="OptionsT">
                                        <Select
                                            ref="endmonth"
                                            placeholder="شهر"
                                            className="menu-outer-top"
                                            value={this.state.endmonth}
                                            options={this.state.endmonthoptions}
                                            onChange={this.handleMonthoptionsE.bind(this, "endmonth")}
                                        />
                                    </div>

                                    <div className="OptionsTh">
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
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" ref="percentage" value={this.state.editpromoDiscountPercent}/>
                                </div>
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" ref="amount" value={this.state.editpromoDiscountAmount}/>
                                </div>
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" ref="maxAmount" value={this.state.editpromoMaximumAmount}/>
                                </div>
                                <div className="TextFieldPopPerDiv">
                                    <input type="text" className="TextFieldPopPer" ref="redemptinTimes" value={this.state.editpromoAllowedRedemptionTimes}/>
                                </div>
                            </div>

                            <div className="buttonPop">
                                <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
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


