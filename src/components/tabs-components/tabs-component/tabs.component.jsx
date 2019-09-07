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
    this.fromHere=false;
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.setTabActive!=this.state.item && !this.fromHere){
      
      this.setState({ 
          item:nextProps.setTabActive,
          activeTab:this.getInitialActiveTab(nextProps.setTabActive)
      });
    }
    return true;
  }

  getInitialActiveTab =(val)=>{
    const {children,setTabActive}= this.props;
    try {
      if(val){
        return children[val-1].props.label;  
      }
      return children[setTabActive-1].props.label;  
    } catch (error) {
      console.log(error);
      return children[0].props.label;  
    }
  }

  getClassActive=(i)=>{
    const {item}= this.state;
    if(i==item){
      return ' active';
    }
    return ' fade';
  }

  isActivated=(id,flag)=>{
    if(this.listActivates[id]){
      return true;
    }
    if(flag){
      this.listActivates[id]=true;
      return true;
    }
    return false;
  }

  onClickTabItem = (tab,index) => {
    this.fromHere=true;
    this.setState({activeTab: tab,item: index},()=>{this.fromHere=false;});
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