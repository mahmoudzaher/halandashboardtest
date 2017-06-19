import React, { Component } from 'react';
import axios from 'axios';
var ReactRouter = require('flux-react-router');

 let imgStyle;
let divStyle;
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
    
    
   handleCreate(e){
       
        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/CreateUser")
           
    e.preventDefault();
   }
   
handleList(e){
    
        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/PointsList")

    e.preventDefault();
   }

handlePointsTBA(e){
    
        console.log("WoHOOOOOOOOOOOOOOOO");
        ReactRouter.goTo("/PointsTBA")

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
        
 
        
        
    
        <input type="button" value="Create User" onClick={this.handleCreate.bind(this)} />
        
        <input type="button" value="List of Points" onClick={this.handleList.bind(this)} />
        
        <input type="button" value="Pending Points" onClick={this.handlePointsTBA.bind(this)} />
        
      </div>
    );
  }
}

export default CreateUser;



  /* ReactRouter.goTo('/createUser');*/
