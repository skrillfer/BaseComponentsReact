import React from 'react';

import ComponentGeneric from "./Generic.jsx";

class SurveyStepper extends ComponentGeneric {
    constructor(props) {
      super(props);
    }
  
   componentDidMount()
   {
     var dataSET=this.validateDataForChart('line');
      new Chart(document.getElementById("line_"+this.state.key), {
        type: 'line',
        data: dataSET,
        options: {
          legend: { display: true },
          title: {
            display: true,
            //text: this.state.title
          }
        }
      });
   } 
    render() {
        return (
           
              <div className="card" style={{"display":"display: inline-block"}}>
                 <div className="card-header">
                 </div>
                 <div className="card-body">
                    <canvas id={"line_"+this.state.key}></canvas>
                 </div> 
              </div>  
        )
     }
}

export default SurveyStepper;