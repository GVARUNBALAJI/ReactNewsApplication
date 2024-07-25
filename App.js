import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


const App =()=> {
  const apikey=process.env.REACT_APP_FAKE_NEWS_API
  const [progress, setprogress] = useState(0)
  const setProgress=(progress)=>{
    setprogress(progress)
  }
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
        {/* <Switch>
          <Route exact path="/"><News setProgress={setProgress} apikey={apikey} key="general" pageSize={5} country="in" category="general"/></Route>
          <Route exact path="/business"><News setProgress={setProgress} apikey={apikey} key="business" pageSize={5} country="in" category="business"/></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={5} country="in" category="entertainment"/></Route>
          <Route exact path="/general"><News setProgress={setProgress} apikey={apikey} key="general" pageSize={5} country="in" category="general"/></Route>
          <Route exact path="/health"><News setProgress={setProgress} apikey={apikey} key="health" pageSize={5} country="in" category="health"/></Route>
          <Route exact path="/science"><News setProgress={setProgress} apikey={apikey} key="science" pageSize={5} country="in" category="science"/></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apikey={apikey} key="sports" pageSize={5} country="in" category="sports"/></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apikey={apikey} key="technology" pageSize={5} country="in" category="technology"/></Route>
    </Switch>  */}
    <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={5} country="in" category="general"/>} />
        <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey} key="different" pageSize={5} country="in" category="general"/>} />
        <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={5} country="in" category="sports"/>} />
        <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={5} country="in" category="science"/>} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={5} country="in" category="entertainment"/>} />
        <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={5} country="in" category="business"/>}/>
        <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={5} country="in" category="technology"/>} />
        <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" country="in" pageSize={5} category="health"/>} />
</Routes>
        </Router>
      </div>
    )
}
export default App
