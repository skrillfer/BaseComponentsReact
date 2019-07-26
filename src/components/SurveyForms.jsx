import React, { Component } from 'react';
import SurveyCalendar from './SurveyCalendar.jsx';
import SurveyInput from './SurveyInput.jsx'
import SurveyButton from './SurveyButton.jsx';

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
                        <SurveyCalendar startAt={id} handler_onChange={this.onChangeControl} placeHolder={placeHolder}></SurveyCalendar>
                       </div>
            case "SurveyInput":
                return  <div className="col">
                        <SurveyInput    startAt={id} handler_onChange={this.onChangeControl} placeHolder={placeHolder} ></SurveyInput>
                        </div>
            case "SurveyButton":
                return  <div className="col">
                        <SurveyButton   startAt={id} handler_onClick={this.onClickControl} label={label} ></SurveyButton>
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
        return(<React.Fragment>
            <div className="row justify-content-around">
                {this.createForm()}
            </div>
            
        </React.Fragment>);
    }
}
export default SurveyForms;

/*
[{SurveyCalendar:{id:''}},{SurveyCalendar:{id:''}}]
*/