class SurveyHis extends ComponentGeneric {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var dataSET = this.validateDataForChart();
    /*new Chart(document.getElementById("bar_chart"), {
       type: 'bar',
       data: {
         labels: dataSET[0],
         datasets: [
           {
             label: "Population (millions)",
             backgroundColor: this.generateRandomColor(dataSET[1].length),
             data: dataSET[1]
           }
         ]
       },
       options: {
         legend: { display: false },
         title: {
           display: true,
           text: this.state.title
         }
       }
    });*/
  }

  render() {
    return React.createElement("div", {
      className: "card",
      style: {
        "maxWidth": "50rem"
      }
    }, React.createElement("h4", {
      className: "card-title"
    }, this.state.title), React.createElement("div", {
      className: "card-header"
    }), React.createElement("div", {
      className: "card-body"
    }, React.createElement("canvas", {
      id: "bar_chart",
      width: "800",
      height: "450"
    })));
  }

}