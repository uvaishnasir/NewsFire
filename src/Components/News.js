import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    page: 1,
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    page: PropTypes.number,
  };

  constructor(props) {
    super(props);
    console.log("I'm constructor of news");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsFire`;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3f7c08c160942f88e1bf11ac589e21d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }
  capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center my-2">
          News Fire! - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((e) => {
              return (
                <div key={e.url} className="col-md-3">
                  <NewsItem
                    title={e.title === null ? "" : e.title}
                    desc={e.description === null ? "" : e.description}
                    url={
                      !e.urlToImage
                        ? "https://source.unsplash.com/user/c_v_r/1900x800"
                        : e.urlToImage
                    }
                    newsUrl={e.url}
                    author={e.author}
                    date={e.publishedAt}
                    source={e.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={
              (this.previousPage = () => {
                this.setState({ page: this.state.page - 1 });
                this.updateNews();
              })
            }
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            onClick={
              (this.nextPage = () => {
                this.setState({ page: this.state.page + 1 });
                this.updateNews();
              })
            }
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
