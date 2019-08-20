import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from '../tab-component/tab.component.jsx';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.getInitialActiveTab(),
      item:this.props.setTabActive,
      
    };
    this.listActivates={};
  }

  getInitialActiveTab =()=>{
    return this.props.children[this.props.setTabActive-1].props.label;
  }
  getClassActive=(i)=>{
    if(i==this.state.item ){
      console.log('active:'+i);
      return ' active';
    }
    return ' fade';
  }

  isActivated=(id,flag)=>{
    if(this.listActivates[id])
    {
      return true;
    }else
    {
      if(flag)
      {
        this.listActivates[id]=true;
        return true;
      }else{
        return false;
      }
    }
  }

  onClickTabItem = (tab,index) => {
    this.setState({ activeTab: tab,item: index});
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <ul className="nav nav-tabs" role="tablist">
          {children.map((child,index) => {
            const { label } = child.props;
            index++;
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
                index={index}
              />
            );
          })}
        </ul>
        <div className="tab-content">
          {children.map((child,index) => {
            index++;
            return(
              <div id={'$tab'+index} className={"container-fluid tab-pane "+this.getClassActive(index)}>
                <br/>
                {this.isActivated(index+'',this.state.item==index)?
                  child.props.children
                  :null
                }
              </div>
            )

          })}
        </div>
      </div>
    );
  }
}

export default Tabs;