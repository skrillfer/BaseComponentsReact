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
                return <SurveyTable key={this.state.children.length} pageSize={pageSize} title={'Evaluacion de Servicio'} labels={labels} feed={feed}></SurveyTable>
            case "SurveyHis":
                return <SurveyHis   key={this.state.children.length} title={'Evaluacion de Servicio'} labels={labels} feed={feed}></SurveyHis>
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
        return <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <SurveyCalendar title={'Fecha Inicial'}></SurveyCalendar>
                    </div>
                    <div className="col-md-2 offset-md-8">
                        <SurveyCalendar title={'Fecha Final'}></SurveyCalendar>
                    </div>
                </div>
                <hr/>
                {this.state.children.length==0?
                    <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                :this.state.children}
                
            
            </div>
    }
}

ReactDOM.render(
    <SurveyGroup nColumns = {this.CONST_COLUMNS} nComponents = {this.COSNT_COMPO} />,
    document.getElementById(this.RENDER_IN)
);