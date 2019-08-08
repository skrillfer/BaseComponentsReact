import React from 'react';

export class SurveyInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            inputText:this.props.value,
        }
    }
    
    setInputText=(arg)=>{
        this.props.value=arg;
        this.setState({inputText:arg});
    }
    render(){
        const {startAt,placeHolder,handleChange} = this.props;
        return( <input 
            id={startAt} 
            class="form-control" 
            aria-label="Small" 
            type="text"
            value={this.props.value}
            placeholder={placeHolder} 
            onChange={(evt)=>{handleChange(evt); this.setInputText(evt.target.value);}}
        />);  
    }
}

export default SurveyInput;

