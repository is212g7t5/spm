import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Courses from "./routes/courses";
import Jobs from "./routes/jobs";
import Navbar from "./components/Navbar";
import LearningJourneys from "./routes/learningJourneys";

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
