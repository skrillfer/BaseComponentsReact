import React from 'react';
export const SurveyInput = (props)=>(
    <input 
        id={props.startAt} 
        class="form-control" 
        aria-label="Small" 
        type="text" 
        placeholder={props.placeHolder} 
        onChange={props.handleChange}
    />               
);