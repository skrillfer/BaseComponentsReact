class ComponentGeneric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: this.props.labels,
      feed: this.props.feed,
      title: this.props.title,
      dataSET: []
    };
  }

  generateRandomColor(size) {
    let colors = [];

    for (let i = 0; i < size; i += 1) {
      colors.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    }

    return colors;
  }

  getDimensions() {
    try {
      return [this.state.feed.length, this.state.feed[0].length];
    } catch (error) {
      return [];
    }
  }

  validateDataForChart() {
    var dataSET = [];
    let dataSeries = this.getSeries();

    if (dataSeries.length > 0) {} else {
      let dimFeed = this.getDimensions();

      if (dimFeed.length > 1) {
        if (dimFeed[1] == 2) {
          console.log('>>>getLabelsForChart');
          dataSET.push(this.getValuesForChart('categoric'));
          console.log('>>>getNumericsForChart');
          dataSET.push(this.getValuesForChart('numeric'));
        }
      }
    }

    return dataSET;
  }

  getValuesForChart(typeParam) {
    var dataLabels = [];
    var indexArray = [];
    this.state.labels.map((element, index) => {
      if (element.type == typeParam) {
        indexArray.push(index);
      }
    });

    if (indexArray.length > 0) {
      console.log(indexArray);
      dataLabels = this.state.feed.map(feedItem => {
        return feedItem[indexArray[0]];
      });
    }

    console.log(dataLabels);
    return dataLabels;
  }

  getLabels() {
    return labels.map(element => {
      return element.tag;
    });
  }

  getSeries() {
    var seriesLabels = [];
    var indexArray = [];
    this.state.labels.map((element, index) => {
      if (element.serie == 'true') {
        indexArray.push(index);
      }
    });

    if (indexArray.length > 0) {
      seriesLabels = this.state.feed.map(feedItem => {
        return feedItem[indexArray[0]];
      });
    }

    console.log(seriesLabels);
    return seriesLabels;
  }

}