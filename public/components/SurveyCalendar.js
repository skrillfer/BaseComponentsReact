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
    console.log('hecambiado');
  }

  componentDidMount() {
    if (!this._isPicker) {
      var datepicker = new ej.calendars.DatePicker({
        placeholder: this.props.title
      });
      datepicker.appendTo('#' + this.key);
      this._isPicker = true;
    }
  }

  render() {
    return React.createElement("input", {
      type: "text",
      id: this.key,
      onChange: e => {
        this.handleChange(e);
      }
    });
  }

}