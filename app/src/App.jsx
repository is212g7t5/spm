import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Courses from "./routes/courses";
import Jobs from "./routes/jobs";
import Navbar from "./components/Navbar";
import { UserProvider } from "./components/user/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path='/'>
            Nothing to see here
          </Route>
          <Route path='/courses' component={Courses} />
          <Route path='/jobs' component={Jobs} />
          <Route path='/skills' component={Jobs} />
          <Route path='/dashboard' component={Jobs} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
