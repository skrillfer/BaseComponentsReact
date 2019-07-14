
 class BaseTable extends React.Component {

   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         labels: this.props.labels,
         matrix  : this.props.matrix,
      }
   }

   sortByCol(event,colIndex){
      arr.sort(sortFunction);
      function sortFunction(a, b) {
         a = a[colIndex];
         b = b[colIndex];
         return isNaN(a-b) ? (a === b) ? 0 : (a < b) ? -1 : 1 : a-b  ;
      }
  }
  
   renderTableHeaders(){
      const { labels} = this.state;
      return (
         <tr> 
         {  labels.map((element,index) =>{
               return(
                  <th key={index} >  {element}</th>
               )
            })
         } 
         </tr>)
   }

   renderTableData() {
      const {matrix} = this.state;
      //this.sortByCol(matrix, 2);

      //console.log(matrix)

      return matrix.map((dimension,ky) => {
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
               <h4 className="card-title">Table Component</h4>

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


