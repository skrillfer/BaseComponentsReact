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
              return new Date(this._listControl[id].value).toISOString();
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
                      params:[{report:"speedalarms"},{gid:this.getValueParam('gid_g2','num',"145")},{stime:this.getValueParam('stime_g2','fecha',this._defaultDates.stime)},{etime:this.getValueParam('etime_g2','fecha',this._defaultDates.etime)}]
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
            console.log(args);
            this._listControl['gid_g2']={value:args.row[0]};
            this.setState({itemForce:2},()=>{
                this.receiveClick('g2');
              });
            break;
        }
    }

    receiveClick=(id)=>{   this.setState({currentGroup:id});  }

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
                  <SurveyGroup api={this.getApi('data2')} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{SurveyTable:{ title:"Top 5 Vehiculos",pageSize:10,columnDefs:[] }}]} />
                </div>
                <div className="row justify-content-around mb-5">
                  <SurveyGroup api={this.getApi('data3')} currentGroup={this.state.currentGroup} keym={'g1'} nColumns =  {[1]} nComponents =  {[{SurveyTable:{ title:"Actividad",pageSize:10,columnDefs:[0],handleColumnClick:this.receiveColumnClicked,name:'table_1' }}]} />
                </div>
              </React.Fragment>
            </div>
            <div label="Por Grupo">
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
              </React.Fragment>
            </div>
          </Tabs>
        </React.Fragment>
      );
    }
}

export default Report;