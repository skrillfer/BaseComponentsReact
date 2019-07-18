class SurveyTable extends ComponentGeneric {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var self = this;

    try {
      $(document).ready(function () {
        $('#table_' + self.state.key).DataTable({
          "pageLength": self.props.pageSize,
          "bPaginate": true,
          "bLengthChange": false,
          "bFilter": true,
          "bInfo": false,
          "bAutoWidth": false,
          "scrollX": true
        });
      });
    } catch (error) {}
  }

  renderTableHeaders() {
    const {
      labels
    } = this.state;
    return React.createElement("tr", null, labels.map((element, index) => {
      return React.createElement("th", {
        key: index
      }, " ", element.tag);
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
        "display": "display: inline-block"
      }
    }, React.createElement("div", {
      className: "card-header"
    }, React.createElement("button", {
      type: "button",
      className: "btn btn-link"
    }, React.createElement("small", null, "Descargar CSV"))), React.createElement("div", {
      className: "card-body"
    }, React.createElement("table", {
      className: "table table-condensed",
      id: 'table_' + this.state.key
    }, React.createElement("thead", null, this.renderTableHeaders()), React.createElement("tbody", null, this.renderTableData()))));
  }

}