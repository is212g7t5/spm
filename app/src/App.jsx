import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "src/contexts/UserContext";
import { Courses, Jobs, LearningJourneys, createLearningJourney } from "src/routes";
import { ToastContainer } from "react-toastify";

import Layout from "./layout";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { LJCreationContextProvider } from "./contexts/LJCreationContext";

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
              <Route path='/create-learning-journey' component={createLearningJourney} />
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
