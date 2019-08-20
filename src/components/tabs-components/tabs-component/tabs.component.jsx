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
      activeTab: this.props.children[0].props.label,
      item:0,
      itemParent:this.props.itemParent
    };
    this.listActivates={};
  }

  getClassActive=(i)=>{
    if(i==this.state.item || this.props.itemParent==i){
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
            /*if (child.props.label !== activeTab) return undefined;
            return child.props.children;*/
            return(
              <div id={index} className={"container-fluid tab-pane "+this.getClassActive(index)}>
                <br/>
                {this.isActivated(index+'',this.state.item==index || this.props.itemParent)?
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