import React, { Component } from 'react';

class SurveyInput extends Component {
    constructor(props)
    {
        super(props);
        this.state ={
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.props.handler_onChange({id:this.props.startAt,value:event.value});
    }
    render()
    {
        return  <React.Fragment>
                    <input id={this.props.startAt} class="form-control" aria-label="Small" type="text" placeholder={this.props.placeHolder} onChange={(evt)=>{this.handleChange(evt.target);}} />               
                </React.Fragment>
    }
}
export default SurveyInput;