class GenericGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      feed: []
    };
    this.URL = 'http://209.105.248.173/api.php?report=maxoverspeed&stime=2019-07-01+18%3A20&etime=2019-07-16+18%3A20';
  }

  consumeAPI(callback) {
    fetch(this.URL).then(response => {
      return response.text();
    }).then(results => {
      try {
        var data = JSON.parse(results);
        this.setState({
          labels: data.labels,
          feed: data.feed
        });
        callback();
      } catch (error) {
        this.setState({
          labels: [],
          feed: []
        });
        console.log("Error al parsear a json:" + error);
      }
    });
  }

}