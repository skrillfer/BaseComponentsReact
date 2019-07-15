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
      colors.push(this.generateOnlyColor());
    }

    return colors;
  }

  generateOnlyColor() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }

  getColumnIndexOf(n) {
    try {
      return this.state.feed.map(x => x[n]);
    } catch (error) {
      return 0;
    }
  }

  getDimensions() {
    try {
      return [this.state.feed.length, this.state.feed[0].length];
    } catch (error) {
      return [];
    }
  }

  validateDataForChart() {
    var dataSET = {};
    var data_set = [];
    let seriesObject = this.getSeries(); //Representa los LABELS

    let dataSeries = seriesObject.series;

    if (dataSeries.length > 0) {
      //dataSET['labels']=dataSeries;
      console.log(seriesObject.index);
      var array_data = [];
      this.state.labels.map((val, colum) => {
        if (colum != seriesObject.index) {
          array_data.push({
            label: val.tag,
            backgroundColor: this.generateOnlyColor(),
            borderColor: this.generateOnlyColor(),
            borderWidth: 1,
            data: this.getColumnIndexOf(colum)
          });
        }
      });
      console.log(array_data);
    } else {
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

  getValueNumericIndexOf(row, col) {
    try {
      return parseInt(this.state.feed[(row, col)]);
    } catch (error) {
      return 0;
    }
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
    var seriesIndex = -1;
    var indexArray = [];
    this.state.labels.map((element, index) => {
      if (element.serie == 'true') {
        indexArray.push(index);
      }
    });

    if (indexArray.length > 0) {
      seriesIndex = indexArray[0];
      seriesLabels = this.state.feed.map(feedItem => {
        return feedItem[indexArray[0]];
      });
    }

    return {
      'series': seriesLabels,
      'index': seriesIndex
    };
  }

}