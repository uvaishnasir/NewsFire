import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from 'react-top-loading-bar'
import {Routes, Route, HashRouter} from "react-router-dom";
const App = ()=>{
  let pageSize = 8;
  let apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  return (
      <HashRouter basename="/">
        <Navbar />
        <LoadingBar color='#f11946' height={3} progress={progress}/>
        <Routes>
          <Route exact path="/" element={<News setProgress = {setProgress} apiKey = {apiKey} key="home" country="in" pageSize={pageSize} category="general"/>}/>
          <Route exact path="/general" element={<News setProgress = {setProgress} apiKey = {apiKey} key="general" country="in" pageSize={pageSize} category="general" />}/>
          <Route exact path="/sports" element={<News setProgress = {setProgress} apiKey = {apiKey} key="sports" country="in" pageSize={pageSize} category="sports" />}/>
          <Route exact path="/business" element={<News setProgress = {setProgress}apiKey = {apiKey} key="business" country="in" pageSize={pageSize} category="business" />}/>
          <Route exact path="/entertainment" element={<News setProgress = {setProgress}apiKey = {apiKey} key="entertainment" country="in" pageSize={pageSize} category="entertainment" />}/>
          <Route exact path="/health" element={<News setProgress = {setProgress}apiKey = {apiKey} key="health" country="in" pageSize={pageSize} category="health" />}/>
          <Route exact path="/science" element={<News setProgress = {setProgress}apiKey = {apiKey} key="science" country="in" pageSize={pageSize} category="science" />}/>
          <Route exact path="/technology" element={<News setProgress = {setProgress}apiKey = {apiKey} key="technology" country="in" pageSize={pageSize} category="technology" />}/>
        </Routes>
        </HashRouter>
  );
}
export default App;
