import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label:     PropTypes.string.isRequired,
    onClick:   PropTypes.func.isRequired,
    index:     PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
  }

  onClick = () => {
    const { label, onClick,index } = this.props;
    onClick(label,index);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
        index,
      },
    } = this;

    let className = 'nav-link';
    if (activeTab === label) {
      className = 'nav-link active';
    }

    return (
      <li className="nav-item" onClick={onClick}>
        <a className={className} data-toggle="tab" href={"_"+index}>{label}</a>
       </li>
    );
  }
}

export default Tab;