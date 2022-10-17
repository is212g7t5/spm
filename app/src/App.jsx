import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "src/contexts/UserContext";
import { LJCreationContextProvider } from "src/contexts/LJCreationContext";
import { UpdateJobContextProvider } from "src/contexts/UpdateJobContext";
import {
  Courses,
  Jobs,
  CreateJob,
  UpdateJob,
  LearningJourneys,
  CreateLearningJourneyPage,
  Skills,
  CreateSkill,
} from "src/routes";

import Layout from "./layout";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <LJCreationContextProvider>
        <UpdateJobContextProvider>
          <UserProvider>
            <Layout>
              <Switch>
                <Route exact path='/' component={LearningJourneys} />
                <Route path='/learning-journeys' component={LearningJourneys} />
                <Route exact path='/create-learning-journey' component={CreateLearningJourneyPage} />
                <Route exact path='/courses' component={Courses} />
                <Route exact path='/skills' component={Skills} />
                <Route exact path='/create-skill' component={CreateSkill} />
                <Route exact path='/jobs' component={Jobs} />
                <Route exact path='/create-job' component={CreateJob} />
                <Route exact path='/update-job' component={UpdateJob} />
              </Switch>
            </Layout>
            <ToastContainer
              position='bottom-right'
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme='colored'
            />
          </UserProvider>
        </UpdateJobContextProvider>
      </LJCreationContextProvider>
    </Router>
  );
}

export default App;
