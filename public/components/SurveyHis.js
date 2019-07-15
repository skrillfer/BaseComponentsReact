class SurveyHis extends ComponentGeneric {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var dataSET = this.validateDataForChart('');
    new Chart(document.getElementById("bar_" + this.state.key), {
      type: 'bar',
      data: dataSET,
      options: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: this.state.title
        }
      }
    });
  }

  render() {
    return React.createElement("div", {
      className: "card",
      style: {
        "maxWidth": "40rem"
      }
    }, React.createElement("h4", {
      className: "card-title"
    }, this.state.title), React.createElement("div", {
      className: "card-header"
    }), React.createElement("div", {
      className: "card-body"
    }, React.createElement("canvas", {
      id: "bar_" + this.state.key,
      width: "800",
      height: "450"
    })));
  }

}