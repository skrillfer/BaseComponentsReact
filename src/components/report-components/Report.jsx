import React, { Component } from 'react';

import SurveyGroup from '../SurveyGroup.jsx';
import SurveyForms from '../SurveyForms.jsx';
import {$DS} from '../../datasource/endpoints.js';
import Tabs from '../tabs-components/tabs-component/tabs.component.jsx';

class Report extends Component {
    constructor(props){
      super(props);
      this.state={itemForce:1,currentGroup:''};
      this._listControl = [];
      this._defaultDates= this.getDefaultDates();
    }
    
    getValueParam(id,type,defaul_t){
      if(this._listControl[id]){
        if(type=='fecha'){ 
            try {
              return new Date(this._listControl[id].value)/*.toISOString()*/;
            } catch (error) {
              return defaul_t;
            }
        }
        return this._listControl[id].value;
      }
      return defaul_t;
    }

    getApi=(name)=>{
      switch(name){
        case "data1":
            return {
                      url:$DS.data1,
                      params:[{report:"activedevices"},{stime:this.getValueParam('stime','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime','fecha',this._defaultDates.etime)}]
                   }
                  
        case "data2":
            return {
                      url:$DS.data1,
                      params:[{report:"topassets"},{stime:this.getValueParam('stime','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime','fecha',this._defaultDates.etime)}]
                   }
                  
        case "data3":
            return {
                      url:$DS.data1,
                      params:[{report:"safetyscc"},{stime:this.getValueParam('stime','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime','fecha',this._defaultDates.etime)}]
                   }
        case "data4":
            return {
                      url:$DS.data1,
                      params:[{report:"topalarm"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g2','fecha',this._defaultDates.etime)}]
                   }
        case "data5":
            return {
                      url:$DS.data1,
                      params:[{report:"topassets"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g2','fecha',this._defaultDates.etime)}]
                   }
        case "data6":
            return {
                      url:$DS.data1,
                      params:[{report:"safetyscc"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g2','fecha',this._defaultDates.etime)}]
                    }
        case "data7":
            return {
                      url:$DS.data1,
                      params:[{report:"topalarm"},{obj:this.getValueParam('objid_g3','num',"4017")},{stime:this.getValueParam('stime_g3','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g3','fecha',this._defaultDates.etime)}]
                    }
        case "data8":
          return {
            "url":$DS.data1,
            "params":[
                {report:"alarmevent"},
                {gid:this.getValueParam('gid_g3','num',"4017")},
                {at:4107},
                {obj:this.getValueParam('objid_g3','num',"4017")},
                {stime:this.getValueParam('stime_g3','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g3','fecha',this._defaultDates.etime)}
            ]
          }
        case "data9":
          return {
            "url":$DS.data1,
            "params":[
                {report:"speedalarms"},
                {obj:this.getValueParam('objid_g3','num',"4017")},
                {stime:this.getValueParam('stime_g3','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g3','fecha',this._defaultDates.etime)}
            ]
          }
      }
    }

    getDefaultDates=()=>{
      var today = new Date();
      var previusDate = new Date();
      previusDate.setDate(today.getDate() - 7);
      return {stime:previusDate.toISOString(),etime:today.toISOString()};
    }

    
    receiveColumnClicked=(args)=>{
        switch(args.name){
          case "table_1":
            switch(args.columnClicked){
              case 0:
                this._listControl['gid_g2']={value:args.row[1]};
                this.setState({itemForce:2},()=>{
                  this.receiveClick('g2');
                });
                break;
              case 2:
                this._listControl['objid_g3']={value:args.row[3]};
                this.setState({itemForce:3},()=>{
                  this.receiveClick('g3');
                });
                break;
            }
            break; 
          case "table_2":
            switch(args.columnClicked){
              case 2:
                this._listControl['objid_g3'] = {value:args.row[2]};
                this._listControl['gid_g3'] = {value:args.row[1]};
                this.setState({itemForce:2},()=>{
                  this.receiveClick('g3');
                });
                break;
            }
            break;
        }
    }

   receiveClick=(id)=>{   
     let itemF=this.state.itemForce;
     switch(id){
      case "g1":
        itemF=1;
        break;
      case "g2":
          itemF=2;
          break;
      case "g3":
          itemF=3;
          break;     
     }
     console.log(this._listControl);
     this.setState({currentGroup:id,itemForce:itemF}); 
   }

    componentDidUpdate(){
      if(this.state.currentGroup!=''){this.setState({currentGroup:''});}
    }
      
    receiveControls=(args)=>{
      this._listControl[args.id]=args;
    }


    render(){
      
      const {itemForce} = this.state;
      return (
        <React.Fragment>
          <Tabs setTabActive={itemForce} >
            <div label="Resumen">
              <React.Fragment>
                <SurveyForms sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'stime',value:this._defaultDates.stime,placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'etime',value:this._defaultDates.etime,placeHolder:'fecha final',type:'Calendar'}},{SurveyButton:{id:'g1',label:'Buscar',type:'Button'}}]}></SurveyForms>
                <hr/>
                <div className="row justify-content-around mb-5">
                  <SurveyGroup api={this.getApi('data1')} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{SurveyTable:{ title:"Dispositivos",pageSize:10 }}]} />
                  <SurveyGroup api={this.getApi('data2')} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{SurveyTable:{ title:"Top 5 Vehículos",pageSize:10,columnDefs:[] }}]} />
                </div>
                <div className="row justify-content-around mb-5">
                  <SurveyGroup api={this.getApi('data3')} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{SurveyTable:{ title:"Safety Scorecard",pageSize:10,columnDefs:[0,2],handleColumnClick:this.receiveColumnClicked,name:'table_1',legend:true }}]} />
                </div>
              </React.Fragment>
            </div>
            <div label="Por Grupo">
              <React.Fragment>
                <SurveyForms  sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'stime_g2',value:this._defaultDates.stime,placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'etime_g2',value:this._defaultDates.etime,placeHolder:'fecha final',type:'Calendar'}},{SurveyInput:{id:'gid_g2',value:this.getValueParam('gid_g2','num',"145"),placeHolder:'Ingrese grupo',type:'number'}},{SurveyButton:{id:'g2',label:'Buscar',type:'Button'}}]}></SurveyForms>
                <hr/>
                <div className="row justify-content-around mb-5">
                  <SurveyGroup api={this.getApi("data4")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Alertas","pageSize":10 }}]} />
                  <SurveyGroup api={this.getApi("data5")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Top 5 Vehículos","pageSize":10 }}]} />
                </div>
                <div className="row justify-content-around mb-5">
                  <SurveyGroup api={this.getApi("data6")} currentGroup={this.state.currentGroup} keym={'g2'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Safety ScoreBoard","pageSize":10,columnDefs:[2],handleColumnClick:this.receiveColumnClicked,name:'table_2',legend:true }}]} />
                </div>
              </React.Fragment>
            </div>
            <div label="Por Vehículo">
              <React.Fragment>
                <SurveyForms  sendClick={this.receiveClick} sendControls={this.receiveControls} forms={[{SurveyCalendar:{id:'stime_g3',value:this._defaultDates.stime,placeHolder:'fecha inicial',type:'Calendar'}},{SurveyCalendar:{id:'etime_g3',value:this._defaultDates.etime,placeHolder:'fecha final',type:'Calendar'}},{SurveyInput:{id:'objid_g3',value:this.getValueParam('objid_g3','num',"4017"),placeHolder:'Ingrese vehículo',type:'number'}},{SurveyButton:{id:'g3',label:'Buscar',type:'Button'}}]}></SurveyForms>
                <hr/>
                <div className="row justify-content-around mb-5">
                  <SurveyGroup api={this.getApi("data8")} currentGroup={this.state.currentGroup} keym={'g3'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Over Speed","pageSize":10 }}]} />
                </div>
                <div className="row justify-content-around mb-5">
                  <SurveyGroup api={this.getApi("data9")} currentGroup={this.state.currentGroup} keym={'g3'} nColumns =  {[1]} nComponents =  {[{"SurveyTable":{ "title":"Speed Alarms","pageSize":10 }}]} />
                </div>
              </React.Fragment>
            </div>
          </Tabs>
        </React.Fragment>
      );
    }
}

export default Report;