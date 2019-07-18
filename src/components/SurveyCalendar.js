class SurveyCalendar extends React.Component {
    constructor(props) {
        super(props); 
        //title indica el nombre que aparecera en el picker
        this.state = {
            key: this.generateId(),
            _isPicker : false
        }
        
    }

    generateId() {
        var d = new Date();
        this.key = "calendar_"+d.getTime();
    }

    componentDidMount()
    {
        if(!this._isPicker)
        {
          var datepicker = new ej.calendars.DatePicker({  placeholder: this.props.title });
          datepicker.appendTo('#'+this.key);
          this._isPicker = true;  
        }
        console.log(this._isPicker);
    }

    render()
    {
        return <input type="text" id={this.key}/>
    }
}