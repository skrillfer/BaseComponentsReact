import React, { Component } from 'react';
import ReactDOM from "react-dom";
import SurveyGroup from './SurveyGroup.jsx';
import Report from "./report-components/Report.jsx";

var injectUIComponents = function(id,CONST_COLUMNS,COSNT_COMPO) {
    ReactDOM.render(
        <SurveyGroup nColumns =  {CONST_COLUMNS} nComponents =  {COSNT_COMPO} />,
        document.getElementById(id)
    );    
}

var injectUIReport = function(id){
    ReactDOM.render(
        <Report />,
        document.getElementById(id)
    );
}

export {
    injectUIComponents,
    injectUIReport,
}