import React, { Component } from 'react';

import SurveyGroup from './SurveyGroup.jsx';


class Report extends Component {
    constructor(props){
      super(props);
      this.state={item:0,listActivates:{}};
      this.isActivated = this.isActivated.bind(this);
    }

    
    isActivated(id,flag)
    {
        if(this.state.listActivates[id])
        {
          return true;
        }else
        {
          if(flag)
          {
            this.state.listActivates[id]=true;
            return true;
          }else{
            return false;
          }
        }
    }

    customOnSelect(index)
    {
      this.setState({item:index});
    }
    render(){
        return (
            <React.Fragment>
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" onClick={()=>{this.customOnSelect("1")}}>
                  <a className="nav-link active" data-toggle="tab" href="#home">Resumen</a>
                </li>
                <li className="nav-item" onClick={()=>{this.customOnSelect("2")}}>
                  <a className="nav-link" data-toggle="tab" href="#menu1">Por Grupo</a>
                </li>
                <li className="nav-item" onClick={()=>{this.customOnSelect("3")}}>
                  <a className="nav-link" data-toggle="tab" href="#menu2">Por Vehiculo</a>
                </li>
              </ul>

        
              <div class="tab-content">
                <div id="home" class="container-fluid tab-pane active"><br/>
                  <h3>HOME</h3>
                  <p>Its a beautiful day</p>
                </div>
                <div id="menu1" class="container-fluid tab-pane fade"><br/>
                  {this.isActivated('2',this.state.item==2)?<SurveyGroup nColumns =  {[2,1]} nComponents =  {[{"SurveyTable":{ "title":"Tabla 1","pageSize":10 }},{"SurveyTable":{"title":"Tabla 2", "pageSize":10 }},{"SurveyTable":{ "title":"Tabla 3","pageSize":10 }}]} />:null}
                </div>
                <div id="menu2" class="container-fluid tab-pane fade"><br/>
                  {this.isActivated('3',this.state.item==3)?<SurveyGroup nColumns =  {[2,1]} nComponents =  {[{"SurveyTable":{ "title":"Top Alertas","pageSize":10 }},{"SurveyTable":{"title":"Alertas", "pageSize":10 }},{"SurveyTable":{ "title":"Otra","pageSize":10 }}]} />:null}
                </div>
              </div>
                      

            </React.Fragment>
            
          );
    }
}
/*
                 */
export default Report;