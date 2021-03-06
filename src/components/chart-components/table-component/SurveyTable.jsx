import React, { Component } from 'react';

import ComponentGeneric from "../../generic-components/Generic.jsx";

import { colors } from "../../../constants/color";

import style  from './table.styles.css';

class SurveyTable extends ComponentGeneric {
    constructor(props) {
      super(props);
      this.generateCSVFile = this.generateCSVFile.bind(this);
    }
    
   
   componentDidMount()
   {        
      const {feed,labels,key} = this.state;  
      const {pageSize,handleColumnClick,name,columnDefs}        = this.props;
      var self= this;
      if(feed.length>0 && labels.length>0){
         $(document).ready(function() {
            var table =  $('#table_'+key).DataTable({
               "pageLength": pageSize,
               "bPaginate": true,
               "bLengthChange": false,
               "bFilter": true,
               "bInfo": false,
               "bAutoWidth": false,
               "scrollX": false,
                dom: 'Bfrtip',
                  buttons: [
                        'csv',
                        'colvis'
                  ],
               "columnDefs": self.getColumnDefs(),
               "createdRow": self.formatColorCell(),
            });

            $('#table_'+key+' tbody').on('click', 'td', function () {
               if(handleColumnClick){
                  var rowIdx = table.cell( this ).index();
                  var data = table.row( rowIdx.row ).data();
                  var found = columnDefs.find(element=> {
                     return element == rowIdx.column;
                  });                      
                  if(found!=null){
                     handleColumnClick({'name':name,'row':data,'columnClicked':rowIdx.column});
                  }  
               }
            });
            
         });         
      } else{
         console.log('feed empty');
      }
   }

   formatColorCell=()=>{
      const {labels} = this.props;
      var flag=true;
      if(flag){
         return function ( row, data, index ) {
            labels.map(
               (obj,ii)=>{    
                  try {
                     if(obj.needsPaint==true && obj.type=='numeric'){
                        let num =(data[ii].replace(/[\$,]/g, '') * 1);
                        if ( num >= 0 && num < 0.6) {    //High Risk
                           $('td', row).eq(ii).css({"background-color":colors.highRisk});
                        }  
                        if ( num >= 0.6 && num < 0.75) {   //Medium Risk
                           $('td', row).eq(ii).css({"background-color":colors.mediumRisk});
                        }  
                        if ( num >= 0.75 && num < 0.95) {   //Mid Risk
                           $('td', row).eq(ii).css({"background-color":colors.midRisk});
                        }  
                        if ( num >= 0.95 && num <= 1) {   //Low Risk
                           $('td', row).eq(ii).css({"background-color":colors.lowRisk});
                        }   
                     }
                  } catch (error) {
                  }
               }   
            );
         }
      }
      return null;
   }

   
   getColumnDefs=()=>{
      const {columnDefs} = this.props;
      if(columnDefs!=null && columnDefs.length>0){
         let arrDefs=columnDefs.map(it=>{
            return {
               "targets": it,
               "render": function (data, type, full, meta){
                     return '<a href="#">'+data+'</a>';         
               }
            };
         });
         return arrDefs;
      }
      return null;
   }

   generateCSVFile()
   {
      const { labels,feed} = this.state;
      var headers = labels.map(element=>{return element.tag});
      var CSV_File=this.convertArrayToCSV({headers:headers,data:feed});
      this.downloadCSV({data:CSV_File,filename:'csv_file.csv'});
   }

   convertArrayToCSV(args) {
      var result, columnDelimiter, lineDelimiter, data;

      data = args.data || null;
      if (data == null || !data.length) {
          return null;
      }

      columnDelimiter = ',';
      lineDelimiter = '\n';

      result = '';
      result += args.headers.join(columnDelimiter);
      result += lineDelimiter;

      data.map(row=>
         {
            result+= row.join(columnDelimiter);
            result += lineDelimiter; 
         }
      );
      return result;
   }
   
   downloadCSV(args){
      var data, filename, link;
      var csv = args.data || null;
      if (csv == null) return;

      filename = args.filename || 'export.csv';

      if (!csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      data = encodeURI(csv);

      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
            <table class="table table-striped table-bordered" style={{"width":"100%"}} id={'table_'+this.state.key}>
               <thead>
                     {this.renderTableHeaders()}
               </thead>
               <tbody>
                     {this.renderTableData()}
               </tbody>
            </table>
        )
     }
}
export default SurveyTable;