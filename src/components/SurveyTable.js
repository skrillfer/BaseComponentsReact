

class SurveyTable extends ComponentGeneric {
    constructor(props) {
      super(props);
      
    }
  
   componentDidMount()
   {
      
      console.log("renderizada tabla");
      var self= this;
      $(document).ready(function() {
         $('#table_'+self.state.key).DataTable({
            "pageLength": self.props.pageSize,
            "bPaginate": true,
            "bLengthChange": false,
            "bFilter": true,
            "bInfo": false,
            "bAutoWidth": false 
         });
     });
   }

   
   renderTableHeaders(){
        const { labels} = this.state;
        return (
           <tr> 
           {  labels.map((element,index) =>{
                 return(
                    <th key={index} > {element.tag}</th>
                 )
              })
           }
           </tr>)
    }

    renderTableData() {
        const {feed} = this.state;  
        
        return feed.map((dimension,ky) => {
           return <tr key={ky}>
                 {
                    dimension.map((element,index) =>{
                       return (
                          <td  key={index}>{element}</td>   
                       )
                    })
                 }    
           </tr>
        })
     }

    render() {
        return (
           
              <div className="card" style={{"display":"display: inline-block"}}>
                 <h4 className="card-title">{this.state.title}</h4>
  
                 <div className="card-header">
                    
                 </div>
                 <div className="card-body">
                    <table className="table table-condensed" id={'table_'+this.state.key}>
                       <thead>
                            {this.renderTableHeaders()}
                       </thead>
                       <tbody>
                            {this.renderTableData()}
                       </tbody>
                    </table>
                 </div> 
                 
              </div>  
        )
     }
}