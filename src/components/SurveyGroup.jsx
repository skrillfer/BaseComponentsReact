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
      this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
      this.getParamsAPI = this.getParamsAPI.bind(this);
    }
    

    getParamsAPI(){
        try {
            if(this.props.api)
            {
                var url_complete = this.props.api.url;
                
                var lparam=this.props.api.params.map(
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

    onChangeDatePicker(args){
        const {children} = this.state;
        console.log(args);
        /*try {
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
                        self.createReport();
                    });
                }  
            }
        } catch (error) {
            console.log('Error in event onChangeDatePicker'+error);
        }*/
    }   

    
    shouldComponentUpdate(nextProps, nextState)
    {
        if(!this._isMounted){ console.log('>>dale'); return true;}
        console.log(nextProps.currentGroup+" <> "+this.props.keym);
        if(nextProps.currentGroup==this.props.keym)
        {
            console.log('>>>>>>Me debo actualizar');
            this._isMounted=false;

            var self=this;
            this.setState({children:[]});

            this.consumeAPI(self.getParamsAPI(),function(){
                console.log('Consume API');
                self.createReport();
                self._isMounted = true;
                console.log('>>>Terminado');
            });
            return false;
        }else
        {
            console.log('No debo actualizarme');
            return false;
        }
    }
    
    componentWillUnmount(){
        console.log('Component Will unmount');
    }
    componentDidMount()
    {
        var self=this;
        this.consumeAPI(self.getParamsAPI(),function(){
            console.log('Consume API');
            console.log(self.props.keym);
            self.createReport();
            console.log('After Consume API');
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

