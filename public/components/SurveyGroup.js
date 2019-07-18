class SurveyGroup extends GenericGroup {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      labels: [],
      feed: []
    };
  }

  injectChart(chartName, pageSize) {
    const {
      labels,
      feed
    } = this.state;

    switch (chartName) {
      case "SurveyTable":
        return React.createElement(SurveyTable, {
          pageSize: pageSize,
          title: 'Evaluacion de Servicio',
          labels: labels,
          feed: feed
        });

      case "SurveyHis":
        return React.createElement(SurveyHis, {
          title: 'Evaluacion de Servicio',
          labels: labels,
          feed: feed
        });
    }
  }

  componentDidMount() {
    var self = this;
    this.consumeAPI(function () {
      self.createReport();
    });
  }

  createReport() {
    var chartArray = [];
    this.props.nComponents.map(chart => {
      let objName = Object.keys(chart)[0];
      chartArray.push(this.injectChart(objName, chart[objName].pageSize));
    });
    this.setState({
      children: chartArray
    });
  }

  render() {
    return React.createElement("div", {
      className: "container"
    }, React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-6"
    }, React.createElement(SurveyCalendar, {
      title: 'FechaInicial'
    })), React.createElement("div", {
      className: "col-6"
    }, React.createElement(SurveyCalendar, {
      title: 'FechaFinal'
    }))), this.state.children);
  }

}

ReactDOM.render(React.createElement(SurveyGroup, {
  nColumns: this.CONST_COLUMNS,
  nComponents: this.COSNT_COMPO
}), document.getElementById('root'));