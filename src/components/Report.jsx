import React, { Component } from 'react';

import Tabs from './SurveyTabs.jsx';

import SurveyGroup from './SurveyGroup.jsx';

import styles from './styles.css';

class Report extends Component {
    render(){
        return (
            <div>
              <Tabs>
              <div label="Gator">
                See ya later, <em>Alligator</em>!
              </div>
              <div label="Croc">
                After 'while, <em>Crocodile</em>!
              </div>
              <div label="Sarcosuchus">
                <SurveyGroup nColumns =  {[3,1]} nComponents =  {[{"SurveyTable":{ "title":"Top Vehiculos","pageSize":10 }},{"SurveyTable":{"title":"Alertas", "pageSize":10 }},{"SurveyTable":{ "pageSize":10 }},{"SurveyHis":{"title":"Ventas vs Costos"}}]} />
              </div>
            </Tabs>
            </div>
          );
    }
}

export default Report;