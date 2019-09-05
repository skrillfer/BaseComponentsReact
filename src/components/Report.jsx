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
        case "data4":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"topalarm"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime_g2','fecha',"2019-07-09+18%3A20")}]
                   }
        case "data5":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"topassets"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime_g2','fecha',"2019-07-09+18%3A20")}]
                   }
        case "data6":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"speedalarms"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime_g2','fecha',"2019-07-09+18%3A20")}]
                    }
        case "data7":
        return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"alarmevent"},{gid:this.getValueParam('gid_g2','num',"145")},{at:4107},{stime:this.getValueParam('stime_g2','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime_g2','fecha',"2019-07-09+18%3A20")}]
                }
        case "data8":
        return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"topalarm"},{obj:'gid_g3'},{stime:this.getValueParam('stime_g3','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime_g3','fecha',"2019-07-09+18%3A20")}]
        }
        case "data9":
        return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"speedalarms"},{obj:'gid_g3'},{stime:this.getValueParam('stime_g3','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime_g3','fecha',"2019-07-09+18%3A20")}]
        }
        case "data10":
        return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"alarmevent"},{obj:'gid_g3'},{at:4107},{stime:this.getValueParam('stime_g3','fecha',"2019-07-08+18%3A20")},{etime:this.getValueParam('etime_g3','fecha',"2019-07-09+18%3A20")}]
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

    componentDidUpdate(){
      if(this.state.currentGroup!=''){this.setState({currentGroup:''});}
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
                <li className="nav-item" onClick={()=>{this.customOnSelect("2")}}>
                  <a className="nav-link" data-toggle="tab" href="#menu1">Por Grupo</a>
                </li>
                <li className="nav-item" onClick={()=>{this.customOnSelect("3")}}>
                  <a className="nav-link" data-toggle="tab" href="#menu2">Por vehículo</a>
                </li>
              </ul>

              <div class="tab-content">
                <div id="home" class="container-fluid tab-pane active"><br/>
                  
                  {this.isActivated('1',this.state.item==1)?
                      <React.Fragment>
                        <SurveyForms sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'stime',placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'etime',placeHolder:'fecha final',type:'Calendar'}},{SurveyButton:{id:'g1',label:'Buscar',type:'Button'}}]}></SurveyForms>
                      <hr/>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data1")} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Dispositivos","pageSize":10 }}]} />
                        <SurveyGroup api={this.getApi("data2")} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Top 5 Vehículos","pageSize":10 }}]} />
                      </div>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data3")} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Actividad","pageSize":10 }}]} />
                      </div>
                      </React.Fragment>:null
                  }
                </div>

                <div id="menu1" class="container-fluid tab-pane fade"><br/>
                  {this.isActivated('2',this.state.item==2)?
                    <React.Fragment>
                      <SurveyForms sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'stime_g2',placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'etime_g2',placeHolder:'fecha final',type:'Calendar'}},{SurveyInput:{id:'gid_g2',placeHolder:'Ingrese grupo',type:'number'}},{SurveyButton:{id:'g2',label:'Buscar',type:'Button'}}]}></SurveyForms>
                      <hr/>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data4")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Alertas","pageSize":10 }}]} />
                        <SurveyGroup api={this.getApi("data5")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Top 5 Vehículos","pageSize":10 }}]} />
                      </div>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data6")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Velocidad Máxima","pageSize":10 }}]} />
                      </div>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data7")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Exceso Velocidad","pageSize":10 }}]} />
                      </div>
                    </React.Fragment>:null
                }
                </div>
                <div id="menu2" class="container-fluid tab-pane fade"><br/>
                  {this.isActivated('3',this.state.item==3)?
                    <React.Fragment>
                      <SurveyForms sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'stime_g3',placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'etime_g3',placeHolder:'fecha final',type:'Calendar'}},{SurveyInput:{id:'gid_g3',placeHolder:'Ingrese vehículo',type:'number'}},{SurveyButton:{id:'g3',label:'Buscar',type:'Button'}}]}></SurveyForms>
                      <hr/>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data8")} currentGroup={this.state.currentGroup} keym={'g3'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Alertas","pageSize":10 }}]} />
                      </div>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data9")} currentGroup={this.state.currentGroup} keym={'g3'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Velocidad Máxima","pageSize":10 }}]} />
                      </div>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data10")} currentGroup={this.state.currentGroup} keym={'g3'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Exceso de Velocidad","pageSize":10 }}]} />
                      </div>
                    </React.Fragment>:null
                  }
              </div>
                </div>
            </React.Fragment>
            
          );
    }
}

export default Report;