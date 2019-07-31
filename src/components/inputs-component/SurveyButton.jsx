import React, { Component } from 'react';

class SurveyButton extends Component {
    constructor(props)
    {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        this.props.handler_onClick(this.props.startAt);
    }
    render()
    {
        return  <React.Fragment>
                    <button id={this.props.startAt} type="button" class="btn btn-dark" onClick={this.handleClick}>{this.props.label}</button>               
                </React.Fragment>
    }
}
export default SurveyButton;