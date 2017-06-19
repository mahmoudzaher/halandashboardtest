import React, { Component } from 'react';
import axios from 'axios';
var ReactRouter = require('flux-react-router');
var ReactDOM = require('react-dom');

class PointsList extends Component {
    
    constructor(){  
        super();  
        axios.defaults.baseURL = 'https://Halan-poi.herokuapp.com';
        console.log("bhjkhkl")
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("sessionToken");
    }
    
    
     componentWillMount(){

  
        this.setState({
            objects:[],
            x:[]
            
        })
     }
 
    
   handleSubmit(e){
         var that = this;
     console.log("asdasd");
      var y = this;
       var z = " ";
      


       axios.get('/cp/points/allApproved').then(function(response){
           console.log(response)
               var x = response.data;
           var objects = [];
                var id  =[];
                var name = [];
           var adress = [];
           var longtitude = [];
           var latitude = [];
           var url = [];
            
           
     /*  x.forEach(function(item){
                 console.log(item)
              z+= "ID: " + item._id + '\t' + "||||||||"  +'\t' + "Name: " + item.name + '\t'+ "||||||||" +'\t' + "Adress: " + item.address + '\t'+ "||||||||" +'\t' + "Latitude: " + item.lat +'\t'+ "||||||||" +'\t' + "Longtitude: " + item.lon + '\n'  ;
              
                 
                 })
           
          y.setState({
               
               x:z
              
           })*/

      x.forEach(function(item){
          
          console.log(item)
          id.push(item.id);
          name.push(item.name);
          adress.push(item.adress);
          longtitude.push(item.longtitude);
          latitude.push(item.latitude);
          objects.push(item);
          
                 })


 that.setState({
        
     objects : objects   
        
    })
           
           
           /*ReactRouter.goTo("/DashBoard")*/
        
       }).catch(function(error) {
           alert(error.message);
           console.log(error)
       })
       
   

    e.preventDefault();
   }


table()
{
    
    var that = this;
    console.log(this.state.objects);
 return (
            React.DOM.table(null,
                React.DOM.thead(null,
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Adress</td>
                        <td>Latitude</td>   
                        <td>Longtitude</td>  
                        <td>URL</td>
                    </tr>
                ),
                React.DOM.tbody(null,
                    that.state.objects.map(function (row) {
                        let re=[];
                        console.log(row)
                            re.push(row._id)
                             re.push(row.name)
                              re.push(row.address)
                                re.push(row.lat)
                               re.push(row.lon)           
          re.push(`https://www.google.com/maps/search/?api=1&query=${row.lat},${row.lon}`);
                             
                        return(
                        <tr>
                            {
                                        re.map(function (col) {
                                console.log(col)
                                            if(typeof col === "string" && col.slice(0, 4) === "http"){
                                                return <td><a target="_blank" href={col} >Show on map</a></td>
                                            }else{
                                                return <td>{col}</td>
                                            }
                                            
                                        })
                             }
                         </tr>
                                           )
                     
                    })
                )
                    ))}
   
   handleBack(e){
        ReactRouter.goTo("/DashBoard")
    e.preventDefault();
   }
 
    
  render() {
   
    return (
      <div>
         
        <input type="button" value="Back" onClick={this.handleBack.bind(this)} />


        <input type="button" value="Submit" onClick={this.handleSubmit.bind(this)} />
        
        
        {this.table()}

      
      </div>


  
    
    );
  }
}

export default PointsList;

   /*  
    
  <div id="x">
      {this.state.x}
      
          
      </div>
      */








