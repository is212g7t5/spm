import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "src/contexts/UserContext";
import { Courses, Jobs, CreateJob, LearningJourneys, createLearningJourney, Skills } from "src/routes";

import Layout from "./layout";
import "./App.css";

function App() {
  return (
    <Router>
      <UserProvider>
        <Layout>
          <Switch>
            <Route exact path='/' component={LearningJourneys} />
            <Route exact path='/courses' component={Courses} />
            <Route exact path='/jobs' component={Jobs} />
            <Route exact path='/create-job' component={CreateJob} />
            <Route exact path='/skills' component={Skills} />
            <Route exact path='/dashboard' component={Jobs} />
            <Route exact path='/create-learning-journey' component={createLearningJourney} />
          </Switch>
        </Layout>
      </UserProvider>
    </Router>
  );
}

export default App;
