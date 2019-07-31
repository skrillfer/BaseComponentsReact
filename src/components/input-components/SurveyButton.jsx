import React from 'react';

export const SurveyButton = (props)=>(
    <button 
        id={props.startAt} 
        type="button" 
        class="btn btn-dark" 
        onClick={props.handleClick}>
    {props.label}
    </button>
)