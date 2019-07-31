import React, { Component } from 'react';
import SurveyCalendar from './input-components/SurveyCalendar.jsx';
import {SurveyInput} from './input-components/SurveyInput.jsx'
import {SurveyButton} from './input-components/SurveyButton.jsx';

class SurveyForms extends Component {
    constructor(props)
    {
        super(props);
        this.onChangeControl = this.onChangeControl.bind(this);
        this.onClickControl = this.onClickControl.bind(this);
        this._valueControls={};
    }

    onClickControl(id)
    {
        this.props.sendClick(id);
    }
    onChangeControl(args)
    {
        this._valueControls[args.id]=args;
        this.props.sendControls(this._valueControls);
    }
    
    createControl(type,id,placeHolder,label){
        switch(type)
        {
            case "SurveyCalendar":
                return <div className="col">
                        <SurveyCalendar 
                            startAt={id} 
                            handler_onChange={this.onChangeControl} 
                            placeHolder={placeHolder}
                        />
                       </div>
            case "SurveyInput":
                return  <div className="col">
                        <SurveyInput    
                            startAt={id} 
                            handleChange={
                                (evt)=>{this.onChangeControl({id:id,value:evt.target.value})}
                            }
                            placeHolder={placeHolder} 
                        />
                        </div>
            case "SurveyButton":
                return  <div className="col">
                        <SurveyButton   
                            startAt={id} 
                            handleClick={(evt)=>this.onClickControl(id)} 
                            label={label} 
                        />
                    </div>
        }
    }
    createForm()
    {        
        var list_Controls=this.props.forms.map(
            item=>{
                let objName = Object.keys(item)[0];
                return this.createControl(objName,item[objName].id,item[objName].placeHolder,item[objName].label);
            }
        );
        return list_Controls;
    }
    render()
    {
        return(
            <div className="row justify-content-around">
                {this.createForm()}
            </div>
            );
    }
}
export default SurveyForms;