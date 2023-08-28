import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
export default class App extends Component {
  render() {
    return (
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key="home" country="in"/>}/>
            <Route exact path="/general" element={<News key="general" country="in" pageSize={12} category="general" />}/>
            <Route exact path="/sports" element={<News key="sports" country="in" pageSize={12} category="sports" />}/>
            <Route exact path="/business" element={<News key="business" country="in" pageSize={12} category="business" />}/>
            <Route exact path="/entertainment" element={<News key="entertainment" country="in" pageSize={12} category="entertainment" />}/>
            <Route exact path="/health" element={<News key="health" country="in" pageSize={12} category="health" />}/>
            <Route exact path="/science" element={<News key="science" country="in" pageSize={12} category="science" />}/>
            <Route exact path="/technology" element={<News key="technology" country="in" pageSize={12} category="technology" />}/>
          </Routes>
        </Router>
    );
  }
}
