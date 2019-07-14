class GenericTable extends ComponentGeneric {
  constructor(props) {
    super(props);
  }

  sortByCol(colIndex) {
    var feedSort = this.state.feed.sort((a, b) => {
      a = a[colIndex];
      b = b[colIndex];
      return isNaN(a - b) ? a === b ? 0 : a < b ? -1 : 1 : a - b;
    });
    this.setState({
      feed: feedSort
    });
  }

  renderTableHeaders() {
    const {
      labels
    } = this.state;
    return React.createElement("tr", null, labels.map((element, index) => {
      return React.createElement("th", {
        key: index
      }, " ", React.createElement("a", {
        className: "btn btn-info btn-sm",
        onClick: () => this.sortByCol(index)
      }, React.createElement("i", {
        className: "fa fa-edit fa-fw"
      })), " ", element.tag);
    }));
  }

  renderTableData() {
    const {
      feed
    } = this.state;
    return feed.map((dimension, ky) => {
      return React.createElement("tr", {
        key: ky
      }, dimension.map((element, index) => {
        return React.createElement("td", {
          key: index
        }, element);
      }));
    });
  }

  render() {
    return React.createElement("div", {
      className: "card",
      style: {
        "maxWidth": "20rem"
      }
    }, React.createElement("h4", {
      className: "card-title"
    }, this.state.title), React.createElement("div", {
      className: "card-header"
    }, React.createElement("div", {
      className: "md-form mt-0"
    }, React.createElement("input", {
      className: "form-control",
      type: "text",
      placeholder: "Search",
      "aria-label": "Search"
    }))), React.createElement("div", {
      className: "card-body"
    }, React.createElement("table", {
      className: "table table-condensed",
      id: "students"
    }, React.createElement("thead", null, this.renderTableHeaders()), React.createElement("tbody", null, this.renderTableData()))));
  }

}