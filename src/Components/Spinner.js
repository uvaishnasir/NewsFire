import React, { Component } from "react";
import loading from "./Fountain.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="Loading..." />
      </div>
    );
  }
}
