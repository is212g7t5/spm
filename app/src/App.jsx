import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "src/App.css";
import Courses from "src/routes/courses";
import Jobs from "src/routes/jobs";
import Navbar from "src/components/Navbar";
import LearningJourneys from "src/routes/learningJourneys";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={LearningJourneys} />
        <Route path='/courses' component={Courses} />
        <Route path='/jobs' component={Jobs} />
        <Route path='/skills' component={Jobs} />
        <Route path='/dashboard' component={Jobs} />
      </Switch>
    </Router>
  );
}

export default App;
