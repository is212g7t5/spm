import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Courses from './routes/courses';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/courses" component={Courses}/>
      </div>
    </Router>
  );
}

export default App;
