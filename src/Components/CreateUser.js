import React, { Component } from 'react';
import axios from 'axios';
var ReactRouter = require('flux-react-router');

 let imgStyle;
let divStyle;
let isAdmin;
class CreateUser extends Component {
    
    constructor(){  
        super();  
        axios.defaults.baseURL = 'https://Halan-poi.herokuapp.com';
       /* axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    
    
     componentWillMount(){

imgStyle = {
  width:"100%"
}
        divStyle = {
  width:"50%"
}
     }
   static defaultProps = {
 
      
   }
    
    
   handleSubmit(e){
     console.log("asdasd");
       if(this.refs.email.value === ''|| this.refs.password.value === '')
       {
           alert('Title is required');
           
       }
       else{
         /*  document.getElementById("checkbox").checked = true;*/
           if(this.refs.Admin.value ==="on")
           {
               
               isAdmin = true;
               
           }
           else{
               isAdmin = false;
           }
           var object = {
               name:  this.refs.name.value,
               email:  this.refs.email.value,  
               password:  this.refs.password.value,
               isAdmin:  isAdmin}
        
       }
       


       axios.post('/cp/users/create', object).then(function(response){
           console.log(response)
           window.localStorage.setItem('sessionToken', response.data);
           /*ReactRouter.goTo("/DashBoard")*/
        
       }).catch(function(error) {
           alert(error.message);
           console.log(error)
       })
       
       
       

    e.preventDefault();
   }
   
   handleBack(e){
        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/DashBoard")
    e.preventDefault();
   }
 
    
  render() {
   
    return (
      <div>
        
        
        <input type="button" value="Back" onClick={this.handleBack.bind(this)} />
        
            <div className="w3-container">
  <div className="w3-card-2" style={divStyle}>
    <img className="imgg" src="./img_avatar3.png" alt="person" style={imgStyle} />
  </div>
  <br />
</div>  
        
         <div>
        <label>Name: </label>
        <input  type="text" ref="name" required />
        </div>
        
        <div>
        <label>E-mail: </label>
        <input  type="email" ref="email" required />
        </div>
        
          <div>
        <label>Password: </label>
        <input  type="password" ref="password" required />
        </div>
    <div>
        <label>Is Admin or Not: </label>
        <input type="checkbox" id="checkbox" ref="Admin" />
        </div>
        
        
        
        <input type="button" value="Submit" onClick={this.handleSubmit.bind(this)} />
        
      </div>
    );
  }
}

export default CreateUser;



  /* ReactRouter.goTo('/createUser');*/
