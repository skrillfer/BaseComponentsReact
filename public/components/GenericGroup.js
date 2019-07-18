class GenericGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      feed: []
    };
    this.URL = 'http://209.105.248.173/api.php?'; //?report=maxoverspeed&
    //http://209.105.248.173/api.php?report=maxoverspeed&stime=2019-07-01+18%3A20&etime=2019-07-16+18%3A20
  }

  consumeAPI(args, callback) {
    console.log(this.URL + "report=maxoverspeed&stime=" + args.inidate + "&etime=" + args.findate); //fetch(this.URL+"report=maxoverspeed&stime="+args.inidate+"&etime="+args.findate)

    fetch("http://209.105.248.173/api.php?report=maxoverspeed&stime=2019-06-01T06:00:00.000Z&etime=2019-06-30T06:00:00.000Z").then(response => {
      return response.text();
    }).then(results => {
      try {
        results = results.toString().replace(/,+(?=$)/, ",");
        console.log(results);
        var data = JSON.parse(results);
        console.log(data);
        this.setState({
          labels: data.labels,
          feed: data.feed
        });
      } catch (error) {
        this.setState({
          labels: [],
          feed: []
        });
        console.log("Error al parsear a json:" + error);
      }

      callback();
    }).catch(function (error) {
      this.setState({
        labels: [],
        feed: []
      });
      console.log('Hubo un problema con la petición Fetch:' + error.message);
      callback();
    });
  }

}