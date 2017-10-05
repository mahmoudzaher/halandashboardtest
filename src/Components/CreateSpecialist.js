import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';
import 'react-select/dist/react-select.css';
var ReactRouter = require('flux-react-router');


let imgStyle;
let divStyle;
let isAdmin;
let dayID = "";
let monthID = "";
let yearID = "";
let dayIDE = "";
let monthIDE = "";
let yearIDE = "";

class CreateSpecialist extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props.pID, "aaaaaaaaa");
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        this.state = {
            startdayoptions: [],
            startmonthoptions: [],
            startyearoptions: [],
        };

    }
    getInitialState() {
        return {

        };
    }

    componentWillMount() {
        var that = this
        imgStyle = {
            width: "100%"
        }
        divStyle = {
            width: "50%"
        }
        this.state = {
            unixTimestamp: "",
            img: "",
            imgdata: new FormData(),
        }
        this.setState({
            vehicleTypee: "",
            startday: "",
            startmonth: "",
            startyear: "",
            endday: "",
            endmonth: "",
            endyear: "",
            userID: this.props.pID,
            blur: "",
            loginErrorModal: false,
            missingRequiredFields: "",
            branchesOptions: [],

        })
        this.getBranchesAPI();
    }



    openModal(type) {
        console.log(type);
        var missingfields = "";

        if (this.state.vehicleTypee === "") {
            missingfields = "VehicleType is missing"
            console.log("VehicleType is missing")
        }


        if (missingfields !== "") {
            this.setState({
                [type]: true,
                blur: "blur",
                missingRequiredFields: missingfields,
            });
        }
        else {
            console.log("handleSubmit")
            this.handleSubmit(this)
        }
    }

    closeModal(type) {
        console.log(type);
        this.setState({
            [type]: false,
            blur: ""
        });
    }


    componentDidMount() {

    }
    getBranchesAPI() {
        var that = this;
        var allbranchesOptions = [];
        axios.get('/operator/getAllBranches').then(function (response) {
            console.log(response, "helloooooooasdgkjuhasghdkjhasghdkjasgdkasgdakljshgdl")
            var x = response.data.data;
            var objects = [];
            x.forEach(function (item, index) {
                // console.log(item)
                allbranchesOptions.push(
                    {
                        value: item._id,
                        label: item.name
                    })
                console.log(item)
            })

            that.setState({
                branchesOptions: allbranchesOptions
            })

        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })
    }

    static defaultProps = {


    }

    handleAddP(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/AddDriverPapers")

        e.preventDefault();
    }
    voo(event) {

        var file = event.target.files[0];
        this.setState({
            img: file,
        })
    }

    handleDayoptions(type, value) {
        this.setState({ [type]: value });
        //  artistID = value.value;
        if (value) {
            dayID = value.value;
        } else {
            dayID = "";
        }

        console.log(value);
        console.log(dayID);
    }

    handleMonthoptions(type, value) {
        this.setState({ [type]: value });
        //  artistID = value.value;
        if (value) {
            monthID = value.value;
        } else {
            monthID = "";
        }

        console.log(value);
        console.log(monthID);
    }

    handleBranchoptions(type, value) {
        console.log(value.value)
        this.setState({ [type]: value.value });
    }

    handleDayoptionsE(type, value) {
        this.setState({ [type]: value });
        //  artistID = value.value;
        if (value) {
            dayIDE = value.value;
        } else {
            dayIDE = "";
        }

        console.log(value);
        console.log(dayIDE);
    }

    handleMonthoptionsE(type, value) {
        this.setState({ [type]: value });
        //  artistID = value.value;
        if (value) {
            monthIDE = value.value;
        } else {
            monthIDE = "";
        }

        console.log(value);
        console.log(monthIDE);
    }

    handleYearoptionsE(type, value) {
        this.setState({ [type]: value });
        //  artistID = value.value;
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
            birthdaydate: new Date(yearID).getTime(),
            birthdaydateE: new Date(yearIDE).getTime(),
            endday: "sadjkhasdk"
        });
        console.log(this.state, "dakjsbdjhalsgdlkhjhagsdkjlhhaksjdhlk");
    }

    handleVehicleType1(value) {
        this.setState({
            vehicleTypee: "tricycle",
            TricycleActive: "active",
            MotocycleActive: "not",
            TokTokActive: "not"
        })
        console.log("tricycle")
    }

    handleVehicleType2(value) {
        this.setState({
            vehicleTypee: "motorcycle",
            TricycleActive: "not",
            MotocycleActive: "active",
            TokTokActive: "not"
        })
        console.log("motorcycle")
    }

    handleVehicleType3(value) {
        this.setState({
            vehicleTypee: "toktok",
            TricycleActive: "not",
            MotocycleActive: "not",
            TokTokActive: "active"
        })
        console.log("toktok")
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

    handleDrivers(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo('/DashBoard')

        e.preventDefault();
    }
    handleSubmit(e) {
        var that = this;
        { this.handleBirthday() }
        console.log("asdasd");
        if (false) {

        }
        else {
            console.log(this.state.branch, "branch")
            var object = {
                firstName: this.refs.Name.value,
                phoneNumber: this.refs.Number.value,
                password: this.refs.Password.value,
                email: this.refs.email.value,
                agentNumber: this.refs.agentNumber.value,
                branch: this.state.branch,
                isSpecialist: true,
                isAdmin: false,
                isFinance: false,
                isSuperAdmin: false,
                isSupport: false
            }
            console.log(object)
            axios.post("/operator/createSpecialist", object).then(function (response) {
                console.log(response.data.data, "createSpecialist Response")
                var x = response.data.data;
                ReactRouter.goTo('/Specialists')
                // console.log(x, "x Response")
            }).catch(function (error) {
                alert(error.message, "what");
                console.log(error.message)
            })

        }
    }
    handleBack(e) {
        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/DashBoard")
        e.preventDefault();
    }
    render() {
        // console.log(this.state.userID, "user ID prop in render")
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
                    isOpen={this.state.loginErrorModal}
                    onRequestClose={this.closeModal.bind(this, "loginErrorModal")}
                    style={customStyles}
                >
                    <div>
                        <span className="modalXButton" onClick={this.closeModal.bind(this, "loginErrorModal")}>&times;</span>
                        <br />
                        <div style={{ width: "100%", textAlign: "-webkit-center" }}>
                            <img style={{ width: "20%" }} src="./redX.png" />
                            {/*<div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width:"80%" }}>رقم التلفون أو كلمة المرور خاطئة</div>*/}
                            <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width: "80%" }}>{this.state.missingRequiredFields}</div>
                            <input type="button" value="حاول مرة أخرى" className="modalButton" onClick={this.closeModal.bind(this, "loginErrorModal")} />
                        </div>
                    </div>
                </Modal>

                <div className="Navdiv">
                    <ul className="NavdivUl">
                        <li className="Header Logo"><img src="Group 11.png" alt="Header Logo" /></li>
              <li className="active li"><a className="active" onClick={()=>{ReactRouter.goTo('/DashBoard')}}>السائقين</a></li>
             {/*} <li><a >رحلات</a></li>{*/}
              <li><a onClick={this.handlePromo.bind(this)}>برومو كود</a></li>
              <li><a >دعم</a></li>
              <li><a onClick={()=>{ReactRouter.goTo('/Reports')}}>تقارير</a></li>
              <li><a onClick={()=>{ReactRouter.goTo('/Branches')}}>فروع</a></li>
              <li><a onClick={()=>{ReactRouter.goTo('/Specialists')}}>الأخصائيين</a></li>
              <li className="NavP"><p onClick={this.logOut.bind(this)} >تسجيل خروج</p></li>
                    </ul>
                </div>

                <div className="CreateBigDiv">

                    <div className="CreateBigDiv-right">

                        <div className="Test">
                            <p className="NewCreateBigDivNewLol" >الإسم</p>
                            <input type="text" className="NewCreateBigDivP" ref="Name" />
                        </div>

                        <div className="Test">
                            <p className="NewCreateBigDivNewLol">رقم الهاتف</p>
                            <input type="text" className="NewCreateBigDivP" ref="Number" />
                        </div>

                        <div className="Test">
                            <p className="NewCreateBigDivNewLol">الرقم السري</p>
                            <input type="password" className="NewCreateBigDivP" ref="Password" />
                        </div>
                    </div>

                    <div className="CreateBigDiv-leftReally">
                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">ايميل</p>
                            <input type="text" ref="email" className="NewNewCreateBigDivPTLol" />

                        </div>
                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">كود الأخصائي</p>
                            <input type="text" ref="agentNumber" className="NewNewCreateBigDivPTLol" />

                        </div>
                        <div className="newplan">
                            <p className="NewNewCreateBigDivLol">إختر الفرع</p>
                            {/* <div className="Options-GroupsFiNewNew">
                                <div className="Inner-options-Div"> */}
                                    <div className="OptionsHello">
                                        <Select
                                            ref="branch"
                                            placeholder="فرع"
                                           // className="menu-outer-top3"
                                            value={this.state.branch}
                                            options={this.state.branchesOptions}
                                            onChange={this.handleBranchoptions.bind(this, "branch")}
                                        />
                                    {/* </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />

                <div className="buttonTT">
                    <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.handleSubmit.bind(this)} />
                    {/* <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.openModal.bind(this, "loginErrorModal")} /> */}
                    {/*onClick={this.handleSubmit.bind(this)}*/}
                </div>
            </div>
        );
    }
}

export default CreateSpecialist;



  /* ReactRouter.goTo('/createUser');*/
