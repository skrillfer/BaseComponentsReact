import React, { Component } from 'react';

import {Tabs, Tab} from 'react-bootstrap-tabs';


import SurveyGroup from './SurveyGroup.jsx';


class Report extends Component {
    render(){
        return (
            <React.Fragment>
              <Tabs onSelect={(index, label) => console.log(label + ' selected')} unmountOnExit={true}>
                <Tab label="Resumen">Tab 1 content</Tab>
                <Tab label="Por Grupo">Tab 2 content</Tab>
                <Tab label="Por Vehiculo" >
                    <SurveyGroup nColumns =  {[3,1]} nComponents =  {[{"SurveyTable":{ "title":"Top Vehiculos","pageSize":10 }},{"SurveyTable":{"title":"Alertas", "pageSize":10 }},{"SurveyTable":{ "pageSize":10 }},{"SurveyHis":{"title":"Ventas vs Costos"}}]} />
                </Tab>
              </Tabs>
            </React.Fragment>
          );
    }
}

export default Report;