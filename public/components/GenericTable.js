class GenericTable extends ComponentGeneric {
    constructor(props) {
      super(props);
    }
  
   sortByCol(colIndex){
      var feedSort=this.state.feed.sort(
         (a, b) =>{
            a = a[colIndex];
            b = b[colIndex];
            return isNaN(a-b) ? (a === b) ? 0 : (a < b) ? -1 : 1 : a-b  ;
         }
      );
      
      this.setState({feed:feedSort});
   }
   
   renderTableHeaders(){
        const { labels} = this.state;
        return (
           <tr> 
           {  labels.map((element,index) =>{
                 return(
                    <th key={index} > <a className="btn btn-info btn-sm" onClick={() => this.sortByCol(index)} ><i className="fa fa-edit fa-fw"></i></a> {element.tag}</th>
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
           
              <div className="card" style={{"maxWidth":"20rem"}}>
                 <h4 className="card-title">{this.state.title}</h4>
  
                 <div className="card-header">
                    <div className="md-form mt-0">
                       <input className="form-control" type="text" placeholder="Search" aria-label="Search"/>
                    </div>
                 </div>
                 <div className="card-body">
                    <table className="table table-condensed" id='students'>
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