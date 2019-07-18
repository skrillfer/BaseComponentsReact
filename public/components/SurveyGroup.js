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
          key: this.state.children.length,
          pageSize: pageSize,
          title: 'Evaluacion de Servicio',
          labels: labels,
          feed: feed
        });

      case "SurveyHis":
        return React.createElement(SurveyHis, {
          key: this.state.children.length,
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
      className: "col-md-2"
    }, React.createElement(SurveyCalendar, {
      title: 'Fecha Inicial'
    })), React.createElement("div", {
      className: "col-md-2 offset-md-8"
    }, React.createElement(SurveyCalendar, {
      title: 'Fecha Final'
    }))), React.createElement("hr", null), this.state.children.length == 0 ? React.createElement("div", {
      className: "text-center"
    }, React.createElement("div", {
      className: "spinner-border",
      role: "status"
    }, React.createElement("span", {
      className: "sr-only"
    }, "Loading..."))) : this.state.children);
  }

}

ReactDOM.render(React.createElement(SurveyGroup, {
  nColumns: this.CONST_COLUMNS,
  nComponents: this.COSNT_COMPO
}), document.getElementById(this.RENDER_IN));