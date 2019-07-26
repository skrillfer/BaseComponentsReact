import React, { Component } from 'react';

import SurveyGroup from './SurveyGroup.jsx';
import SurveyForms from './SurveyForms.jsx';


class Report extends Component {
    constructor(props){
      super(props);
      this.state={item:1,listActivates:{},currentGroup:''};
      this.isActivated = this.isActivated.bind(this);
      this.receiveControls = this.receiveControls.bind(this);
      this.receiveClick = this.receiveClick.bind(this);
      this.getApi = this.getApi.bind(this);
      this._listControl = [];
    }
    
    
    getValueParam(id,type,defaul_t)
    {
      if(this._listControl[id]){
        if(type=='fecha')
        { 
            try {
              return new Date(this._listControl[id].value).toISOString();
            } catch (error) {
              return defaul_t;
            }
        }else
        {
          return this._listControl[id].value;
        }
      }else{
        return defaul_t;
      }
    }
    getApi(name){
      switch(name){
        case "data1":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"activedevices"},{stime:this.getValueParam('stime','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime','fecha',"2019-07-09+18%3A20")}]
                   }
                  
        case "data2":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"topassets"},{stime:this.getValueParam('stime','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime','fecha',"2019-07-09+18%3A20")}]
                   }
                  
        case "data3":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"summaryalarm"},{stime:this.getValueParam('stime','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime','fecha',"2019-07-09+18%3A20")}]
                   }
                  
      }
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
      this.setState({currentGroup:id});
    }
    receiveControls(controls)
    {
      this._listControl = controls;
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
              </ul>

              <div class="tab-content">
                <div id="home" class="container-fluid tab-pane active"><br/>
                  
                  {this.isActivated('1',this.state.item==1)?
                      <React.Fragment>
                        <SurveyForms sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'stime',placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'etime',placeHolder:'fecha final',type:'Calendar'}},{SurveyButton:{id:'g1',label:'Buscar',type:'Button'}}]}></SurveyForms>
                      <hr/>
                      <SurveyGroup api={this.getApi("data1")} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Dispositivos","pageSize":10 }}]} />
                      <SurveyGroup api={this.getApi("data2")} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Top 5 Vehiculos","pageSize":10 }}]} />
                      <SurveyGroup api={this.getApi("data3")} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Actividad","pageSize":10 }}]} />
                      </React.Fragment>:null
                  }
                </div>
              </div>
            </React.Fragment>
            
          );
    }
}

export default Report;