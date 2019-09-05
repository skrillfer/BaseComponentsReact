import React,{useState} from 'react';
const SurveyInput = (props)=>{
    const [inputText, setInputText] = useState(props.value);
   return( <input 
            id={props.startAt} 
            class="form-control" 
            aria-label="Small" 
            type="text"
            value={props.value}
            placeholder={props.placeHolder} 
            onChange={(evt)=>{props.handleChange(evt); setInputText(evt.target.value); props.value=evt.target.value;}}
        />);          
};
export default SurveyInput;

