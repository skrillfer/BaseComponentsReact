class ComponentGeneric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: this.props.labels,
      feed: this.props.feed,
      title: this.props.title,
      key: this.makeId(3)
    };
    this.uniqueArrayColor = [];
  }

  makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  setUniqueArrayColor(size) {
    if (this.uniqueArrayColor.length != 0) return;
    this.uniqueArrayColor = this.generateRandomColor(size);
  }

  generateRandomColor(size) {
    let colors = [];

    for (let i = 0; i < size; i += 1) {
      colors.push(this.generateOnlyColor());
    }

    return colors;
  }

  generateOnlyColor() {
    var colorGenerated = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

    while (!this.testParseColor(colorGenerated)) {
      colorGenerated = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    return colorGenerated;
  }

  testParseColor(colorGenerated) {
    var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorGenerated);
    return isOk;
  }

  getAllColumnsIndexOf(n) {
    try {
      return this.state.feed.map(x => x[n]);
    } catch (error) {
      return [];
    }
  }

  getDimensions() {
    try {
      return [this.state.feed.length, this.state.feed[0].length];
    } catch (error) {
      return [];
    }
  }

  validateDataForChart(typeChart) {
    this.uniqueArrayColor = [];
    var dataSET = {
      labels: null,
      datasets: null
    };
    var array_data = [];
    let seriesObject = this.getSeries(); //Representa los LABELS

    let dataSeries = seriesObject.series;

    if (dataSeries.length > 0) {
      dataSET.labels = dataSeries;
      this.state.labels.map((val, colum) => {
        if (colum != seriesObject.index) {
          if (typeChart == "pie" || typeChart == "doughnut") {
            let vdata = this.getAllColumnsIndexOf(colum);
            this.setUniqueArrayColor(vdata.length);
            array_data.push({
              label: val.tag,
              backgroundColor: this.uniqueArrayColor,
              borderColor: this.generateOnlyColor(),
              borderWidth: 1,
              data: vdata
            });
          } else {
            array_data.push({
              label: val.tag,
              backgroundColor: this.generateOnlyColor(),
              borderColor: this.generateOnlyColor(),
              borderWidth: 1,
              data: this.getAllColumnsIndexOf(colum)
            });
          }
        }
      });
      dataSET.datasets = array_data;
    } else {
      let dimFeed = this.getDimensions();

      if (dimFeed.length > 1) {
        if (dimFeed[1] == 2) {
          dataSET.labels = this.getValuesForChart('categoric');
          array_data.push({
            label: "",
            backgroundColor: this.generateRandomColor(dataSET.labels.length),
            data: this.getValuesForChart('numeric')
          });
          dataSET.datasets = array_data;
        }
      }
    }

    console.log(dataSET);
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
      dataLabels = this.state.feed.map(feedItem => {
        return feedItem[indexArray[0]];
      });
    }

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
      seriesLabels = this.getAllColumnsIndexOf(seriesIndex);
    }

    return {
      'series': seriesLabels,
      'index': seriesIndex
    };
  }

}