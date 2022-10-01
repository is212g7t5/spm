import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Courses from "./routes/courses";
import Jobs from "./routes/jobs";
import Navbar from "./components/Navbar";
import LearningJourneys from "./routes/learningJourneys";
import { UserProvider } from "./components/user/UserContext";

// TODO: DELETE
import CourseContainer from "./components/learningJourney/CourseContainer";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={LearningJourneys} />
          <Route path='/courses' component={Courses} />
          <Route path='/jobs' component={Jobs} />
          <Route path='/skills' component={Jobs} />
          <Route path='/dashboard' component={Jobs} />
          {/* TODO: DELETE */}
          <Route path='/courseContainer' component={CourseContainer}/>
          
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
