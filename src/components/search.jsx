"use strict";

import React from "react";
import PubSub from "pubsub-js";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      s: ""
    };

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(e) {
    if (e.target.value.length < 3) {
      if (e.target.value.length == 0) PubSub.publish("SEARCH.RESET");
      return;
    }

    this.setState({
      s: e.target.value.toLowerCase()
    });

    PubSub.publish("SEARCH", e.target.value.toLowerCase());
  }

  render() {
    return (
      <div className="search">
        <input
          type="text"
          name="s"
          placeholder="Search..."
          autoComplete="off"
          onChange={this._handleChange}
        />
      </div>
    );
  }
}

Search.displayName = "Search";

// Uncomment properties you need
// Search.propTypes = {};
// Search.defaultProps = {};

export default Search;
