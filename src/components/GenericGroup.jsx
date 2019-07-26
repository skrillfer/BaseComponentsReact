import React, { Component } from 'react';


class GenericGroup extends Component {
    constructor(props) {
      super(props);
      this.state =  { 

                        labels:[],
                        feed  :[]
                    }
      this.consumeAPI = this.consumeAPI.bind(this);
    }
    
    consumeAPI(args,callback)
    {
        console.log(args);
        if (args=="") return callback;
        fetch(args)
        .then((response) => {
            return response.text();
        })
        .then((results) => {
            try {
                var data=JSON.parse(results);
                
                this.setState({ 
                        labels:data.label,
                        feed  :data.feed
                    });
                console.log('consumido de manera exitosa');
            } catch (error) {
                this.setState({
                        feed   : []
                });
                console.log("Error al parsear a json:"+error);
            }
            callback();
        });
    }   
}

export default GenericGroup;