class Base extends React.Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor

    this.state = {
      //state is by default an object
      students: []
    };
  }

  componentWillMount() {
    /*fetch('http://taller-angular.carlosazaustre.es/empleados')
      .then((response) => {
        return response.json()
      })
      .then((empleados) => {
        this.setState({ empleados: empleados })
      })*/
  }

  creatingReport() {
    let title = "Ventas del Anio 2019";
    let labels = [{
      "tag": "producto",
      "type": "categoric",
      "serie": "false"
    }, {
      "tag": "precio",
      "type": "numeric",
      "serie": "false"
    }, {
      "tag": "mes",
      "type": "categoric",
      "serie": "false"
    }];
    let feed = [["Móvil", 250, "Enero"], ["Tablet", 350, "Enero"], ["PS4", 400, "Marzo"], ["Tablet", 350, "Marzo"], ["Anti-Virus", 130, "Enero"], ["Auriculares", 25, "Febrero"], ["PS4", 400, "Enero"], ["PC", 600, "Febrero"], ["Anti-Virus", 30, "Febrero"], ["PS4", 400, "Febrero"]];
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

    let labels2 = [{
      "tag": "gasto",
      "type": "numeric",
      "serie": "false"
    }, {
      "tag": "mes",
      "type": "categoric",
      "serie": "false"
    }];
    let feed2 = [[5250, "Enero"], [4350, "Febrero"], [3400, "Marzo"], [1350, "Abril"], [3130, "Mayo"], [7899, "Junio"], [5600, "Julio"], [6600, "Agosto"], [4210, "Septiembre"], [5600, "Octubre"], [1600, "Noviembre"], [28600, "Diciembre"]];
    return React.createElement("div", null, React.createElement(GenericTable, {
      title: title,
      labels: labels,
      feed: feed
    }), React.createElement(SurveyHis, {
      title: 'Simple Bar Chart',
      labels: labels2,
      feed: feed2
    }, " "));
  }

  render() {
    return this.creatingReport();
  }

}

ReactDOM.render(React.createElement(Base, null), document.getElementById('root'));