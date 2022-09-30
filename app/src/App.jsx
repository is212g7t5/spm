import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Courses from "./routes/courses";
import Jobs from "./routes/jobs";
import Navbar from "./components/Navbar";
import { UserProvider } from "./state/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className='bg-gray-100'>
          <Switch>
            <Route exact path='/'>
              Nothing to see here
            </Route>
            <Route path='/courses' component={Courses} />
            <Route path='/jobs' component={Jobs} />
            <Route path='/skills' component={Jobs} />
            <Route path='/dashboard' component={Jobs} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;