import React, { Component } from 'react';


class SurveyCalendar extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            key: this.generateId(),
            _isPicker : false
        }
    }

    generateId() {
        var d = new Date();
        this.key = this.props.startAt+"_calendar_"+d.getTime();
    }

    handleChange(e)
    {
        if(this.props.handler_onChange){
            this.props.handler_onChange({id:this.props.startAt,value:e.value});
        }
    }
    
    componentDidMount()
    {
        if(!this._isPicker)
        {
          const {placeHolder,value}= this.props;  
          let self=this;  
          var datepicker = new ej.calendars.DatePicker({  
              placeholder: placeHolder,
              value: self.parseDate(value),
              format: 'dd/MM/yyyy',
              change: function (args) {
                self.handleChange(args);
              },
              language: "it"
            });
          datepicker.appendTo('#'+this.key);
          this._isPicker = true;
        } 
    }

    parseDate=(dateValue)=>{
        var timestamp = Date.parse(dateValue);
        if (isNaN(timestamp) == false) {
            return new Date(timestamp);
        }
        return null;
    }

    render()
    {
        return <input type="date" id={this.key} />
    }
}

export default SurveyCalendar;