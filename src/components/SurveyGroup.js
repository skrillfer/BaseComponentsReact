class SurveyGroup extends GenericGroup {
    constructor(props) {
      super(props);
      this.arrayDatePicker =[];
      this.state={
          children:[],
          labels:[],
          feed  :[]
      }
      this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
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

    onChangeDatePicker(args){
        const {children} = this.state;
        try {
            this.arrayDatePicker[args.element.id]=args.value;
            if(children.length>0){
                
                var keysDatePicker = Object.keys(this.arrayDatePicker);

                var iniDatePicker = keysDatePicker.find(element=>{return element.includes("ini")});
                var finDatePicker = keysDatePicker.find(element=>{return element.includes("fin")});

                var iniDate = this.arrayDatePicker[iniDatePicker];
                var finDate = this.arrayDatePicker[finDatePicker];
                
                iniDate = new Date(iniDate);
                finDate = new Date(finDate);
                console.log(iniDate);
                console.log(finDate);
                if(!isNaN(iniDate) && !isNaN(finDate))
                {
                    console.log('cnsumiendo');
                    this.consumeAPI({inidate:iniDate.toISOString(),findate:finDate.toISOString()},function(){
                        //self.createReport();
                    });
                }
                     
            }
        } catch (error) {
            console.log('Error in event onChangeDatePicker'+error);
        }
    }   

    componentDidMount()
    {
        var self=this;
        
        
        this.consumeAPI({inidate:"2019-07-01+18%3A20",findate:"2019-07-16+18%3A20"},function(){
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
                        <SurveyCalendar startAt={'ini'} handler_onChange={this.onChangeDatePicker} placeHolder={'Fecha Inicial'}></SurveyCalendar>
                    </div>
                    <div className="col-md-2 offset-md-8">
                        <SurveyCalendar startAt={'fin'} handler_onChange={this.onChangeDatePicker} placeHolder={'Fecha Final'}></SurveyCalendar>
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