import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, desc, url , newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img style={{height:"175px"}} className="card-top" src={url} alt="Card-cap" />
          <div className="card-body">
            <h5 className="card-title">{title.slice(0,35)}...<span class="badge bg-secondary">New</span></h5>
            <p className="card-text">{desc.slice(0,55)}...</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            <p class="card-text"><small class="text-muted">BY {author!==null?author:"Unknown"} UPDATED: {new Date(date).toUTCString()}</small></p>
            <span style={{left:"90%", zIndex:"1"}} class="position-absolute top-0 translate-middle badge rounded-pill bg-danger">{source}</span>
          </div>
        </div>
      </div>
    );
  }
}
