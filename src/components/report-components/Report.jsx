import React, { Component } from 'react';

import SurveyGroup from '../SurveyGroup.jsx';
import SurveyForms from '../SurveyForms.jsx';



class Report extends Component {
    constructor(props){
      super(props);
      this.state={item:1,listActivates:{},currentGroup:''};
      this.isActivated = this.isActivated.bind(this);
      this.receiveControls = this.receiveControls.bind(this);
      this.receiveClick = this.receiveClick.bind(this);
      this.getApi = this.getApi.bind(this);
      this._listControl = [];
      this._defaultDates= this.getDefaultDates();
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
                      url:"http://209.105.248.173/api.php?",params:[{report:"activedevices"},{stime:this.getValueParam('stime','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime','fecha',this._defaultDates.etime)}]
                   }
                  
        case "data2":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"topassets"},{stime:this.getValueParam('stime','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime','fecha',this._defaultDates.etime)}]
                   }
                  
        case "data3":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"summaryalarm"},{stime:this.getValueParam('stime','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime','fecha',this._defaultDates.etime)}]
                   }
        case "data4":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"topalarm"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g2','fecha',this._defaultDates.etime)}]
                   }
        case "data5":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"topassets"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g2','fecha',this._defaultDates.etime)}]
                   }
        case "data6":
            return {
                      url:"http://209.105.248.173/api.php?",params:[{report:"speedalarms"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g2','fecha',this._defaultDates.etime)}]
                    }
                  
      }
    }

    getDefaultDates=()=>{
      var today = new Date();
      var previusDate = new Date();
      previusDate.setDate(today.getDate() - 7);
      return {stime:previusDate.toISOString(),etime:today.toISOString()};
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
    
    receiveColumnClicked=(args)=>{
        switch(args.name){
          case "table_1":
            this._listControl['gid_g2']={value:args.row[1]};
            $('.nav-tabs a[href="#menu1"]').tab('show');
            this.setState({item:2},()=>{
                this.receiveClick('g2');
              });
            break;
        }
    }

    receiveClick(id)
    { 
      this.setState({currentGroup:id});
    }

    componentDidUpdate(){
      if(this.state.currentGroup!=''){this.setState({currentGroup:''});}
    }
      
    receiveControls(args)
    {
      this._listControl[args.id]=args;
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
                
              </ul>

              <div class="tab-content">
                <div id="home" class="container-fluid tab-pane active"><br/>
                  
                  {this.isActivated('1',this.state.item==1)?
                      <React.Fragment>
                        <SurveyForms sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'stime',value:this._defaultDates.stime,placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'etime',value:this._defaultDates.etime,placeHolder:'fecha final',type:'Calendar'}},{SurveyButton:{id:'g1',label:'Buscar',type:'Button'}}]}></SurveyForms>
                      <hr/>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data1")} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{SurveyTable:{ title:"Dispositivos",pageSize:10 }}]} />
                        <SurveyGroup api={this.getApi("data2")} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{SurveyTable:{ title:"Top 5 Vehiculos",pageSize:10,columnDefs:[] }}]} />
                      </div>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data3")} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{SurveyTable:{ title:"Actividad",pageSize:10,columnDefs:[1],handleColumnClick:this.receiveColumnClicked,name:'table_1' }}]} />
                      </div>
                      </React.Fragment>:null
                  }
                </div>

                <div id="menu1" class="container-fluid tab-pane fade"><br/>
                  {this.isActivated('2',this.state.item==2)?
                    <React.Fragment>
                      <SurveyForms  sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'stime_g2',value:this._defaultDates.stime,placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'etime_g2',value:this._defaultDates.etime,placeHolder:'fecha final',type:'Calendar'}},{SurveyInput:{id:'gid_g2',value:this.getValueParam('gid_g2','num',"145"),placeHolder:'Ingrese grupo',type:'number'}},{SurveyButton:{id:'g2',label:'Buscar',type:'Button'}}]}></SurveyForms>
                      <hr/>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data4")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Alertas","pageSize":10 }}]} />
                        <SurveyGroup api={this.getApi("data5")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Top 5 Vehiculos","pageSize":10 }}]} />
                      </div>
                      <div className="row justify-content-around mb-5">
                        <SurveyGroup api={this.getApi("data6")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Velocidad Maxima","pageSize":10 }}]} />
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