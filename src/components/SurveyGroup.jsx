import React, { Component } from 'react';

import GenericGroup from "./GenericGroup.jsx";
import SurveyTable  from "./SurveyTable.jsx";
import SurveyHis from "./SurveyHis.jsx";


class SurveyGroup extends GenericGroup {
    constructor(props) {
      super(props);
      this.arrayDatePicker =[];
      this.state={
          children:[],
          labels:[],
          feed  :[]
      }
      this._isMounted =false;
      this.getParamsAPI = this.getParamsAPI.bind(this);
    }
    

    getParamsAPI(api){
        try {
            if(api)
            {
                var url_complete = api.url;
                
                var lparam=api.params.map(
                    element=>{
                        let objName = Object.keys(element)[0];
                        return objName+"="+element[objName];
                    }
                );
                return url_complete+lparam.join("&");
            }    
        } catch (error) {
            console.log(error);   
            return '';
        }
        
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
    
    shouldComponentUpdate(nextProps, nextState)
    {
        if(!this._isMounted){ return true;}
        if(nextProps.currentGroup==this.props.keym)
        {
            this._isMounted=false;

            var self=this;
            this.setState({children:[]});

            this.consumeAPI(self.getParamsAPI(nextProps.api),function(){
                self.createReport();
                self._isMounted = true;
            });
            return false;
        }else
        {
            return false;
        }
    }
    
   
    componentDidMount()
    {
        var self=this;
        this.consumeAPI(self.getParamsAPI(this.props.api),function(){
            self.createReport();
            self._isMounted = true;
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
                            <div className="col">
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
                        <div className="col">
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

