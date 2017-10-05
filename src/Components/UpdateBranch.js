import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';
import 'react-select/dist/react-select.css';
var ReactRouter = require('flux-react-router');

class UpdateBranch extends Component {

    constructor(props) {
        super(props);
        var that = this;
        axios.defaults.baseURL = localStorage.getItem('baseURL');
        /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        this.state = {
            BranchID: this.props.pID,
        }
        // console.log(that.props.pID)
        console.log("hello")
    }

    componentDidMount() {

    }

    componentWillMount() {
        var that = this;
        this.setState({
            blur: "",
            loginErrorModal: false,
            CreateErrorModal: false,
            missingRequiredFields: "",
            errorMessage: "",
            BranchName: "",
            BranchPhone: "",
            BranchAddress: "",
            // BranchID: this.props.pID,
        })
        // console.log(this.props.pID, )
        this.getDriversAPI();
    }

    getDriversAPI() {
        var that = this;
        var object = {
            branchId: this.state.BranchID
        }
        axios.post('/operator/getBranchById', object).then(function (response) {
            console.log(response, "getbranchbyid response")
            var x = response.data.data;

            that.setState({
                BranchName: x.name,
                BranchPhone: x.phone,
                BranchAddress: x.address
            })

        }).catch(function (error) {
            alert(error.message);
            console.log(error)
        })
    }

    openModal(type) {
        console.log("welcome")
        console.log(type);
        !isNaN(this.refs.pNumber.value)
        var missingfields = "";
        var counter = 0;
        var missingArray = [];
        var check = 0;

        if (this.refs.pNumber.value) {
            console.log(" this.refs.pNumber.value exist")
            if (isNaN(this.refs.pNumber.value) || this.refs.pNumber.value.length !== 11) {
                missingArray.push("Phonenumber is wrong")
            }
        }
        if (!this.refs.Fname.value) {
            missingfields = "Name is missing"
            console.log("Name is missing")
            missingArray.push("Name")
            check = 1;
            console.log(missingArray, "missingArray")

        }
        if (!this.refs.pNumber.value) {
            missingfields = "Phonenumber is missing"
            console.log("Phonenumber is missing")
            missingArray.push("Phonenumber")
            check = 1;
            console.log(missingArray, "missingArray")
        }
        if (!this.refs.Address.value) {
            missingfields = "Address is missing"
            console.log("Address is missing")
            missingArray.push("Address")
            check = 1;
            console.log(missingArray, "missingArray")
        }

        console.log(missingArray.length, "missingArray.length")
        var multi = 1;
        if (multi < missingArray.length) {
            while (multi < missingArray.length) {

                missingArray.splice(multi, 0, " and ");
                multi = multi + 2;
                // missingArray.length++;
                console.log(missingArray, "missingArray of", multi)
            }
        }
        if (check === 1) {
            missingArray.push(" missing")
        }
        else {

        }

        console.log(missingArray, "missingArray")
        if (missingArray[0] != null) {
            this.setState({
                [type]: true,
                blur: "blur",
                missingRequiredFields: missingArray,
            });
        }
        else {
            console.log("handleSubmit")
            this.handleSubmit(this)
        }
    }


    openModal2(type) {
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
    handleSubmit(e) {
        var that = this;

        console.log("asdasd");
        // if (this.refs.email.value === '' || this.refs.password.value === '' || this.refs.Fname.value === '' || this.refs.Lname.value === '') {
        if (false) {
            alert('Something is missing');

        }
        else {
            var object = {
                branchId: this.state.BranchID,
                name: this.state.BranchName,
                address: this.state.BranchAddress,
                phone: this.state.BranchPhone
            }
            // const data = new FormData();
            // data.append('action', 'ADD');
            // data.append('param', 0);
            // data.append('firstName', this.refs.Fname.value)
            // data.append('address', this.refs.Address.value)
            // data.append('phoneNumber', this.refs.pNumber.value)

            // for (var pair of data.entries()) {
            //     console.log(pair)
            // }
            axios.post('/operator/editBranch', object).then(function (response) {
                console.log(response)
                ReactRouter.goTo('/Branches')
            }).catch(function (error) {
                console.log(error.response.data.message)
                that.setState({
                    errorMessage: error.response.data.message,
                })
                that.openModal2("CreateErrorModal")
                console.log("wazap")
            })
        }
    }
    handleDrivers(e) {

        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo('/DashBoard')

        e.preventDefault();
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

    handleOnchangeTextName(event) {
        this.setState({ BranchName: event.target.value });
    }

    handleOnchangeTextPNumber(event) {
        this.setState({ BranchPhone: event.target.value });
    }

    handleOnchangeTextAddress(event) {
        this.setState({ BranchAddress: event.target.value });
    }
    render() {
        console.log(this.state.BranchID, "branchID")

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
                            <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width: "80%" }}>{this.state.missingRequiredFields}</div>
                            <input type="button" value="حاول مرة أخرى" className="modalButton" onClick={this.closeModal.bind(this, "loginErrorModal")} />
                        </div>
                    </div>
                </Modal>



                <Modal
                    isOpen={this.state.CreateErrorModal}
                    onRequestClose={this.closeModal.bind(this, "CreateErrorModal")}
                    style={customStyles}
                >
                    <div>
                        <span className="modalXButton" onClick={this.closeModal.bind(this, "CreateErrorModal")}>&times;</span>
                        <br />
                        <div style={{ width: "100%", textAlign: "-webkit-center" }}>
                            <img style={{ width: "20%" }} src="./redX.png" />
                            <div style={{ marginTop: "5%", color: "#2C2D72", fontSize: "25px", width: "80%" }}>{this.state.errorMessage}</div>
                            <input type="button" value="حاول مرة أخرى" className="modalButton" onClick={this.closeModal.bind(this, "CreateErrorModal")} />
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

                <div className="CreateBigDivhellofriend">
                    <div className="NewCreateBigDiv7aramhellofriend">
                        <p className="NewNewNewCreateBigDiv7aramhellofriend">الإسم       *</p>
                        <input type="text" className="NewDriverProfileTexthellofriend" ref="Fname" value={this.state.BranchName} required onChange={this.handleOnchangeTextName.bind(this)} />
                    </div>
                    <div className="NewCreateBigDiv7aramhellofriend">
                        <p className="NewNewNewCreateBigDiv7aramhellofriend">رقم الهاتف *</p>
                        <input type="text" className="NewDriverProfileTexthellofriend" ref="pNumber" value={this.state.BranchPhone} required onChange={this.handleOnchangeTextPNumber.bind(this)} />
                    </div>
                    <div className="NewCreateBigDiv7aramhellofriend">
                        <p className="NewNewNewCreateBigDiv7aramhellofriend">عنوان *</p>
                        <input type="text" className="NewDriverProfileTexthellofriend2" ref="Address" value={this.state.BranchAddress} required onChange={this.handleOnchangeTextAddress.bind(this)} />
                    </div>
                </div>
                <br /><br />
                <div className="buttonTThellofriend">
                    <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.openModal.bind(this, "loginErrorModal")} />
                </div>
                {/* <div className="buttonTT">
                    <input type="button" value="تفعيل" className="button" className="coolT" onClick={this.openModal.bind(this, "loginErrorModal")} />
                </div> */}
            </div>
        );
    }
}

export default UpdateBranch;
