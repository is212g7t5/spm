import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Courses from "./routes/courses";
import Jobs from "./routes/jobs";
import Navbar from "./components/Navbar";
import { UserContext, users } from "./state/UserContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: users.none,
      toggleUser: (value) => this.setState(state => ({
        user: users[value]
      })),
    };
  }

  render() {

    return (
      <Router>
        <UserContext.Provider value={this.state}>
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
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
