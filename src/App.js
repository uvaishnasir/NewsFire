import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
export default class App extends Component 
{
  pageSize = 12;
  apiKey= process.env.REACT_APP_NEWS_API;
  render() {
    return (
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News  apiKey = {this.apiKey} key="home" country="in"/>}/>
            <Route exact path="/general" element={<News  apiKey = {this.apiKey} key="general" country="in" pageSize={this.pageSize} category="general" />}/>
            <Route exact path="/sports" element={<News  apiKey = {this.apiKey} key="sports" country="in" pageSize={this.pageSize} category="sports" />}/>
            <Route exact path="/business" element={<News apiKey = {this.apiKey} key="business" country="in" pageSize={this.pageSize} category="business" />}/>
            <Route exact path="/entertainment" element={<News apiKey = {this.apiKey} key="entertainment" country="in" pageSize={this.pageSize} category="entertainment" />}/>
            <Route exact path="/health" element={<News apiKey = {this.apiKey} key="health" country="in" pageSize={this.pageSize} category="health" />}/>
            <Route exact path="/science" element={<News apiKey = {this.apiKey} key="science" country="in" pageSize={this.pageSize} category="science" />}/>
            <Route exact path="/technology" element={<News apiKey = {this.apiKey} key="technology" country="in" pageSize={this.pageSize} category="technology" />}/>
          </Routes>
        </Router>
    );
  }
}
