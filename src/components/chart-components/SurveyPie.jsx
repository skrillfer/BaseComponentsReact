import React, { Component } from 'react';
import ComponentGeneric from "../generic-components/Generic.jsx";

class SurveyPie extends ComponentGeneric {
    constructor(props) {
      super(props);
    }
  
   componentDidMount()
   {
      var dataSET=this.validateDataForChart('pie');
      
      new Chart(document.getElementById("pie_"+this.state.key), {
        type: 'pie',
        data: dataSET,
        options: {
          legend: { display: true },
          title: {
            display: true,
            text: this.state.title
          }
        }
      });
   }

   
    
    render() {
        return (
           
              <div className="card" style={{"display":"display: inline-block"}}>
                 <h4 className="card-title">{this.state.title}</h4>
  
                 <div className="card-header">
                 </div>
                 <div className="card-body">
                  <canvas id={"pie_"+this.state.key} width="800" height="450"></canvas>

                 </div> 
                 
              </div>  
        )
     }
}

export default SurveyPie;