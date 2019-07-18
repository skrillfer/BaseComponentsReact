

class SurveyTable extends ComponentGeneric {
    constructor(props) {
      super(props);
      
    }
  
   componentDidMount()
   {
      var self= this;
      try {
         $(document).ready(function() {
            $('#table_'+self.state.key).DataTable({
               "pageLength": self.props.pageSize,
               "bPaginate": true,
               "bLengthChange": false,
               "bFilter": true,
               "bInfo": false,
               "bAutoWidth": false,
               "scrollX": true
            });
        });   
      } catch (error) {
         
      }
      
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
                 <div className="card-header">
                 <button type="button" className="btn btn-link"><small>Descargar CSV</small></button>
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