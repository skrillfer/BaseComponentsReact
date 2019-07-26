import React, { Component } from 'react';

import SurveyGroup from './SurveyGroup.jsx';
import SurveyForms from './SurveyForms.jsx';


class Report extends Component {
    constructor(props){
      super(props);
      this.state={item:0,listActivates:{},currentGroup:''};
      this.isActivated = this.isActivated.bind(this);
      this.receiveControls = this.receiveControls.bind(this);
      this.receiveClick = this.receiveClick.bind(this);
      this._listControl = [];
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

    receiveClick(id)
    {
      console.log('desde Report --- click el control:'+id);
      this.setState({currentGroup:id});
    }
    receiveControls(controls)
    {
      this._listControl = controls;
      console.log(this._listControl);
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
                  {this.isActivated('2',this.state.item==2)?
                      <React.Fragment>
                        <SurveyForms sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'ini',placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'fin',placeHolder:'fecha final',type:'Calendar'}},{SurveyInput:{id:'i1',placeHolder:'ingrese grupo',type:'Input'}},{SurveyButton:{id:'g1',label:'Buscar',type:'Button'}}]}></SurveyForms>
                      <hr/>
                      <SurveyGroup currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[2,1]} nComponents =  {[{"SurveyTable":{ "title":"Tabla 1","pageSize":10 }},{"SurveyTable":{"title":"Tabla 2", "pageSize":10 }},{"SurveyTable":{ "title":"Tabla 3","pageSize":10 }}]} />
                      </React.Fragment>:null
                      
                      }
                </div>
                <div id="menu2" class="container-fluid tab-pane fade"><br/>
                  {this.isActivated('3',this.state.item==3)?
                      <React.Fragment>
                      <SurveyForms sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'ini',placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'fin',placeHolder:'fecha final',type:'Calendar'}},{SurveyInput:{id:'i1',placeHolder:'ingrese grupo',type:'Input'}},{SurveyButton:{id:'g2',label:'Buscar',type:'Button'}}]}></SurveyForms>
                      <hr/>
                      <SurveyGroup currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[2,1]} nComponents =  {[{"SurveyTable":{ "title":"Top Alertas","pageSize":10 }},{"SurveyTable":{"title":"Alertas", "pageSize":10 }},{"SurveyTable":{ "title":"Otra","pageSize":10 }}]} />
                      </React.Fragment>:null}
                </div>
              </div>
                      
              
            </React.Fragment>
            
          );
    }
}
/*
                 */
export default Report;