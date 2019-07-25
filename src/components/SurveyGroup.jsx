import React, { Component } from 'react';

import GenericGroup from "./GenericGroup.jsx";
import SurveyTable  from "./SurveyTable.jsx";
import SurveyHis from "./SurveyHis.jsx";
import SurveyCalendar from "./SurveyCalendar.jsx";

class SurveyGroup extends GenericGroup {
    constructor(props) {
      super(props);
      this.arrayDatePicker =[];
      this.state={
          children:[],
          labels:[],
          feed  :[]
      }
      this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
    }
    
    
    injectChart(chartName,pageSize)
    {

        const {labels,feed} = this.state;
        switch(chartName)
        {
            case "SurveyTable":
                return <SurveyTable key={this.state.children.length} pageSize={pageSize} title={'Evaluacion de Servicio'} labels={labels} feed={feed}></SurveyTable>
            case "SurveyHis":
                return <SurveyHis   key={this.state.children.length} title={'Evaluacion de Servicio'} labels={labels} feed={feed}></SurveyHis>
        }
    }

    onChangeDatePicker(args){
        const {children} = this.state;
        try {
            this.arrayDatePicker[args.element.id]=args.value;
            if(children.length>0){
                
                var keysDatePicker = Object.keys(this.arrayDatePicker);

                var iniDatePicker = keysDatePicker.find(element=>{return element.includes("ini")});
                var finDatePicker = keysDatePicker.find(element=>{return element.includes("fin")});

                var iniDate = this.arrayDatePicker[iniDatePicker];
                var finDate = this.arrayDatePicker[finDatePicker];
                
                iniDate = new Date(iniDate);
                finDate = new Date(finDate);
                if(!isNaN(iniDate) && !isNaN(finDate))
                {
                    this.setState({children:[]});
                    console.log('consumiendo');
                    let self = this;
                    this.consumeAPI({inidate:iniDate.toISOString(),findate:finDate.toISOString()},function(){
                        
                        //self.createReport();
                    });
                }  
            }
        } catch (error) {
            console.log('Error in event onChangeDatePicker'+error);
        }
    }   
    componentWillUnmount(){
        console.log('Component Will unmount');
    }
    componentDidMount()
    {
        var self=this;
        this.consumeAPI({inidate:"2019-07-01+18%3A20",findate:"2019-07-16+18%3A20"},function(){
            console.log('Consume API');
            self.createReport();
            console.log('After Consume API');
        });
    }
    
    createReport()
    {
        const {nColumns,nComponents}= this.props;
        var chartArray=[];
        var count=0;
        if(nColumns!=null && nColumns.length>0){
            nColumns.map(
                nElements=>
                {
                    var containerElements = [];
                    for (let index = 0; index < nElements; index++) {
                        if(count>=nComponents.length){continue;}
                        let chart = nComponents[count];
                        let objName = Object.keys(chart)[0]
                        containerElements.push(
                            <div className="col-md-auto">
                                <h1 class="display-4">{chart[objName].title}</h1>
                                {this.injectChart(objName,chart[objName].pageSize)}
                            </div>
                        );
                        count++;
                    }
                    chartArray.push(<div className="row justify-content-around mb-5">
                                        {containerElements}
                                    </div>);
                }
            );
        }else
        {
            var containerElements = [];
            nComponents.map(
                chart=>{
                    let objName = Object.keys(chart)[0];
                    containerElements.push(
                        <div className="col-md-auto">
                            <h1 class="display-4">{chart[objName].title}</h1>
                            {this.injectChart(objName,chart[objName].pageSize)}
                        </div>
                    );
                }
            );
            chartArray.push(<div className="row justify-content-around mb-5">
                                        {containerElements}
                                    </div>);
        }
        this.setState({children:chartArray});    
    }
 

    
    render()
    {
        return <React.Fragment>
                <div className="row">
                    <div className="col-md-2 offset-md-3">
                        <SurveyCalendar startAt={'ini'} handler_onChange={this.onChangeDatePicker} placeHolder={'Fecha Inicial'}></SurveyCalendar>
                    </div>
                    <div className="col-md-2">
                        <SurveyCalendar startAt={'fin'} handler_onChange={this.onChangeDatePicker} placeHolder={'Fecha Final'}></SurveyCalendar>
                    </div>
                    <div className="col-md-2">
                        <button type="button" class="btn btn-dark">Buscar</button>
                    </div>
                </div>
                <hr/>
                {this.state.children.length==0?
                    <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                :this.state.children}


            </React.Fragment>
    }
}
export default SurveyGroup;

