import React, { Component } from 'react';
import ReactDOM from "react-dom";
import SurveyGroup from './SurveyGroup.jsx';

var injectUIComponents = function(id,CONST_COLUMNS,COSNT_COMPO) {
    ReactDOM.render(
        <SurveyGroup nColumns =  {CONST_COLUMNS} nComponents =  {COSNT_COMPO} />,
        document.getElementById(id)
    );    
}

export default {injectUIComponents:injectUIComponents};