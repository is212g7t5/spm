import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Courses from './routes/courses';
import Jobs from './routes/jobs';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-gray-100">
        <Route exact path="/courses" component={Courses}/>
        <Route exact path="/jobs" component={Jobs}/>
      </div>
    </Router>
  );
}

export default App
