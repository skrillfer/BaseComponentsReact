class ComponentGeneric extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                        labels:   this.props.labels,
                        feed:   this.props.feed,
                        title :   this.props.title
                   };
    }
  
}