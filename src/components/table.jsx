import React, { Component } from "react";
import PubSub from "pubsub-js";
import { ContextHoc } from "../context/ContextHoc";
import Search from "./search";
import Tr from "./tr";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      filtered: false,
      order: "ASC",
      columns: []
    };

    this.columns = ["title", "localisation", "year", "program", "type", "patrimoine"];
    this._sortBy = this._sortBy.bind(this);
    this._toggleSelection = this._toggleSelection.bind(this);
    this._toggle = this._toggle.bind(this);
  }

  componentWillMount() {
    this.props.data.forEach(element => {
      element.visible = true;
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe("SEARCH", this._handleSearch.bind(this));
    PubSub.unsubscribe("SEARCH.RESET", this._reset.bind(this));
  }

  componentDidMount() {
    PubSub.subscribe("SEARCH", this._handleSearch.bind(this));
    PubSub.subscribe("SEARCH.RESET", this._reset.bind(this));
  }

  _filterBy(key) {
    const { data, order } = this.state;
    var arrayCopy = [...data];
    //console.log(arrayCopy)
    if (order == "ASC") {
      arrayCopy = arrayCopy.filter(item => {
        //console.log(item[key])
        if (item[key]) item.visible = true;
        else item.visible = false;
        return true;
      });

      //console.log(arrayCopy)
    } else {
      arrayCopy = arrayCopy.filter(item => {
        item.visible = true;
        return true;
      });
    }
    this.setState({
      data: arrayCopy,
      filtered: true,
      order: order == "ASC" ? "DESC" : "ASC"
    });
  }

  _sortBy(key) {
    console.log(key);
    let arrayCopy = [...this.props.data];
    arrayCopy.sort(this._compareBy(key));
    console.table(arrayCopy[0].title.text);

    this.setState({
      data: arrayCopy,
      filtered: true,
      order: this.state.order == "ASC" ? "DESC" : "ASC"
    });
  }

  _compareBy(key) {
    //console.log(this.state.order)
    if (this.state.order == "ASC") {
      return function(a, b) {
        //console.log(a[key], b[key])
        if (typeof a[key] === "object") {
          if (
            a[key].text.toLowerCase() <
            b[key].text.toLowerCase()
          )
            return -1;
          if (
            a[key].text.toLowerCase() >
            b[key].text.toLowerCase()
          )
            return 1;
          return 0;
        } else {
          if (a[key].toLowerCase() < b[key].toLowerCase())
            return -1;
          if (a[key].toLowerCase() > b[key].toLowerCase())
            return 1;
          return 0;
        }
      };
    } else {
      return function(a, b) {
        if (typeof a[key] === "object") {
          if (
            a[key].text.toLowerCase() <
            b[key].text.toLowerCase()
          )
            return 1;
          if (
            a[key].text.toLowerCase() >
            b[key].text.toLowerCase()
          )
            return -1;
          return 0;
        } else {
          if (a[key].toLowerCase() < b[key].toLowerCase())
            return 1;
          if (a[key].toLowerCase() > b[key].toLowerCase())
            return -1;
          return 0;
        }
      };
    }
  }

  _handleSearch(e, searchTerm) {
    console.log(searchTerm);
    let columns = this.columns;
    let arrayCopy = [...this.props.data];
    //console.log(arrayCopy)
    var _data = [];
    for (var i in arrayCopy) {
      const row = arrayCopy[i];
      const rowData = row;
      rowData.visible = false;
      for (var j in columns) {
        if (rowData[columns[j]]) {
          //console.log(row[columns[j]]);
          if (typeof rowData[columns[j]] === "string") {
            var match = rowData[columns[j]].toLowerCase().match(searchTerm);
            if (match) {
              rowData.visible = true;
            }
          }
          if (typeof rowData[columns[j]] === "object") {
            //console.log(row[columns[j]])
            var match = rowData[columns[j]].text
              .toLowerCase()
              .match(searchTerm);
            if (match) {
              rowData.visible = true;
            }
          }
        }
      }
      _data.push(row);
    }
    //console.log(_data)
    this.setState({
      filtered: true,
      data: _data
    });

    // PubSub.publish("UPDATE", {
    //   export: _data
    // });
  }

  _reset() {
    let arrayCopy = [...this.props.data];
    for (var i in arrayCopy) {
      const row = arrayCopy[i];
      row.visible = true;
    }
    this.setState({
      filtered: true,
      data: arrayCopy
    });
  }

  _toggleSelection(e){

    e.target.classList.toggle("active")
    if(e.target.classList.contains("active")){
      console.log("toggle")
      let arrayCopy = [...this.props.data];
      for (var i in arrayCopy) {
        const row = arrayCopy[i];
        if(row.selection === "true")
          row.visible = true;
        else
          row.visible = false;
      }
      this.setState({
        filtered: true,
        data: arrayCopy
      });
    }else{
      this._reset()
    }
    
  }
  _toggle(){

  }

  render() {
    const { filtered, order } = this.state;
    const { data } = filtered ? this.state : this.props;
    const orderClass = order.toLowerCase();
    //console.log(data);
    //console.log(data);
    const { i18n, locale } = this.props.context;
    const translate = i18n[locale];
    //console.log(this.props);
    return (
      <div className={"table " + orderClass}>
        <div className="table-header">
          
          <div className="_row b-b">
            <div className="row">
              <div className="col-md-6">
                <div className="row between-xs">
                  <div className="_td col-xs-8">
                    <ul className="table-actions">
                      <li>
                        <div onClick={this._toggleSelection}>{translate["selection"]}</div>
                      </li>
                      <li>
                        <div onClick={this._toggle}>{translate["openAll"]}</div>
                      </li>
                      <li>
                        <div >{translate["downloadAll"]}</div>
                      </li>
                    </ul>
                    
                  </div>
                  <div className="_td col-xs-4">
                    <div
                      className="_sort"
                      onClick={() => this._sortBy("localisation")}
                    >
                      {translate["localisation"]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row between-xs">
                  <div className="_td col-xs">
                    <div className="_sort" onClick={() => this._sortBy("year")}>
                      {translate["year"]}
                    </div>
                  </div>
                  <div className="_td col-xs">
                    <div
                      className="_sort"
                      onClick={() => this._sortBy("program")}
                    >
                      {translate["program"]}
                    </div>
                  </div>
                  <div className="_td col-xs">
                    <div className="_sort" onClick={() => this._sortBy("type")}>
                      {translate["type"]}
                    </div>
                  </div>
                  <div className="_td col-xs">
                    <div className="_sort" onClick={() => this._sortBy("patrimoine")}>
                      {translate["patrimoine"]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="_row b-b">
            <Search />
          </div>
          <div className="table-content">
            {data.map((tr, i) => (
              <Tr key={i} data={tr} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ContextHoc(Table);
