class SurveyGroup extends GenericGroup {
    constructor(props) {
      super(props);
      this.state={
          children:[],
          labels:[],
          feed  :[]
      }
    }
    
    injectChart(chartName,pageSize)
    {
        const {labels,feed} = this.state;
        switch(chartName)
        {
            case "SurveyTable":
                return <SurveyTable  pageSize={pageSize} title={'Evaluacion de Servicio'} labels={labels} feed={feed}></SurveyTable>
            case "SurveyHis":
                return <SurveyHis   title={'Evaluacion de Servicio'} labels={labels} feed={feed}></SurveyHis>
        }
    }

    componentDidMount()
    {
        var self=this;
        this.consumeAPI(function(){
            self.createReport();
        });
        
    }
    createReport()
    {
        var chartArray=[];
        this.props.nComponents.map(
            chart=>{
                let objName =Object.keys(chart)[0];
                chartArray.push(this.injectChart(objName,chart[objName].pageSize));
            }
        );
        this.setState({children:chartArray});    
    }

    
    render()
    {
        return <div>
            {this.state.children}
        </div>
    }
}

ReactDOM.render(
    <SurveyGroup nColumns = {this.CONST_COLUMNS} nComponents = {this.COSNT_COMPO} />,
    document.getElementById('root')
 );