
class Base extends React.Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
           students: [
              
           ]
        }
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

    
    creatingReport()
    {
        
        let title = "My Custom Table";
        let myLabels = ['edad','genero','peso'];
        let myData = [
                    [435,'M',212.25],
                    [55,'F',22.3],
                    [455,'I',122.69]
                ];
        return (<div>
            <GenericTable title={title} labels={myLabels} feed={myData}></GenericTable>  
            <GenericTable title={"Custom Table 2"} labels={myLabels} feed={myData}></GenericTable>
            <GenericTable title={"Custom Table e"} labels={myLabels} feed={myData}></GenericTable>
            </div>)
    }
    render()
    {
        return(
            this.creatingReport()
        )
    }
}
ReactDOM.render(
    <Base />,
    document.getElementById('root')
 );