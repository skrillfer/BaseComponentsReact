class SurveyCalendar extends React.Component {
  constructor(props) {
    super(props); //title indica el nombre que aparecera en el picker

    this.state = {
      key: this.generateId(),
      _isPicker: false
    };
  }

  generateId() {
    var d = new Date();
    this.key = "calendar_" + d.getTime();
  }

  handleChange(e) {
    if (this.props.handler_onChange) {
      console.log('hecambiado');
      this.props.handler_onChange(e);
    }
  }

  componentDidMount() {
    if (!this._isPicker) {
      let self = this;
      var datepicker = new ej.calendars.DatePicker({
        placeholder: this.props.title,
        change: function (args) {
          self.handleChange(args);
        }
      });
      datepicker.appendTo('#' + this.key);
      this._isPicker = true;
    }
  }

  render() {
    return React.createElement("input", {
      type: "text",
      id: this.key
    });
  }

}