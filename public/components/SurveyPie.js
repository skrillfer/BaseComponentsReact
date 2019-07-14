class GenericTable extends ComponentGeneric {
  constructor(props) {
    super(props);
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