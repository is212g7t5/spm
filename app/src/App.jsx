import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "src/contexts/UserContext";
import { LJCreationContextProvider } from "src/contexts/LJCreationContext";
import { Courses, Jobs, LearningJourneys, CreateLearningJourneyPage } from "src/routes";

import Layout from "./layout";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <LJCreationContextProvider>
        <UserProvider>
          <Layout>
            <Switch>
              <Route exact path='/' component={LearningJourneys} />
              <Route exact path='/courses' component={Courses} />
              <Route exact path='/jobs' component={Jobs} />
              <Route exact path='/skills' component={Jobs} />
              <Route exact path='/dashboard' component={Jobs} />
              <Route path='/create-learning-journey' component={CreateLearningJourneyPage} />
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
      </LJCreationContextProvider>
    </Router>
  );
}

export default App;
