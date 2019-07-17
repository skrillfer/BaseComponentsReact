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
    /*let labels2= [ {"tag":"Caracteristica","type":"categoric","serie":"true"},
    {"tag":"American Express","type":"numeric","serie":"false"},
    {"tag":"MasterCard","type":"numeric","serie":"false"},
    {"tag":"PayPal","type":"numeric","serie":"false"},
    {"tag":"Visa","type":"numeric","serie":"false"},
    ]
    let feed2 = [
      ["Credibilidad",60,70,80,90],
      ["Transparencia",90,90,75,89],
      ["Soporte",67,78,85,83],
      ["Regalias",32,48,55,13],
    ]*/

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
    console.log('create Report');
    var chartArray = [];
    this.props.nComponents.map(chart => {
      let objName = Object.keys(chart)[0];
      chartArray.push(this.injectChart(objName, chart[objName].pageSize));
    });
    this.setState({
      children: chartArray
    });
  }
  /*render()
  {
       <div class="row">
          <div class="col">col</div>
          <div class="col">col</div>
          <div class="col">col</div>
      </div>
  }*/


  render() {
    console.log("renderizado");
    console.log(this.state);
    return React.createElement("div", null, this.state.children);
  }

}

ReactDOM.render(React.createElement(SurveyGroup, {
  nColumns: this.CONST_COLUMNS,
  nComponents: this.COSNT_COMPO
}), document.getElementById('root'));