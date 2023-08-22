import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, desc, url , newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img style={{height:"175px"}} className="card-top" src={url} alt="Card-cap" />
          <div className="card-body">
            <h5 className="card-title"> {title}...</h5>
            <p className="card-text">{desc}...</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
