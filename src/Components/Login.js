import React, { Component } from 'react';
import axios from 'axios';
var ReactRouter = require('flux-react-router');

 let imgStyle;
let divStyle;

class Login extends Component {
    
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
           var object = {email:  this.refs.email.value,  
            password:  this.refs.password.value}
        
       }


       axios.post('/cp/login', object).then(function(response){
           console.log(response)
           window.localStorage.setItem('sessionToken', response.data);
           ReactRouter.goTo("/DashBoard")
        
       }).catch(function(error) {
           alert(error.message);
           console.log(error)
       })
       
       
       

    e.preventDefault();
   }
   

 
    
  render() {
   
    return (
      <div>
        
            <div className="w3-container">
  <div className="w3-card-2" style={divStyle}>
    <img className="imgg" src="./img_avatar3.png" alt="person" style={imgStyle} />
  </div>
  <br />
</div>  
        
        <div>
        <label>E-mail: </label>
        <input value="admin@poi.halan.com" type="email" ref="email" required />
        </div>
        
          <div>
        <label>Password: </label>
        <input value="Sort64321" type="password" ref="password" required />
        </div>
    
        <input type="button" value="Submit" onClick={this.handleSubmit.bind(this)} />
        
      </div>
    );
  }
}

export default Login;



  /* ReactRouter.goTo('/createUser');*/
