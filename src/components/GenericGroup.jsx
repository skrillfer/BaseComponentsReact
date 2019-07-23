import React, { Component } from 'react';


class GenericGroup extends Component {
    constructor(props) {
      super(props);
      this.state =  { 

                        labels:[],
                        feed  :[]
                    }
      this.URL ='http://209.105.248.173/api.php?';
      this.consumeAPI = this.consumeAPI.bind(this);
    }
    
    consumeAPI(args,callback)
    {
        //console.log(this.URL+"report=maxoverspeed&stime="+args.inidate+"&etime="+args.findate);
        //fetch(this.URL+"report=maxoverspeed&stime="+args.inidate+"&etime="+args.findate)
        fetch("http://209.105.248.173/api.php?report=default")
        .then((response) => {
            return response.text();
        })
        .then((results) => {
            try {
                var data=JSON.parse(results);
                
                this.setState({ 
                        labels:data.labels,
                        feed  :data.feed
                    });
                console.log('consumido de manera exitosa');
            } catch (error) {
                this.setState({
                        labels : [],
                        feed   : []
                });
                console.log("Error al parsear a json:"+error);
            }
            callback();
        });
    }   
}

export default GenericGroup;