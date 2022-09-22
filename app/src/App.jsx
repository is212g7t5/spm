import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Courses from './routes/courses';
import Navbar from './components/Navbar';
import RolesPage from './pages/RolesPage';

// function App() {
//   return (
//     <div className="bg-gray-100">
//     <Router>
//       <Navbar />
//         <Routes>
//             <Route path="/roles" element={<RolesPage />}/>
//         </Routes>
//       </Router>
//     </div>
//   )

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Route exact path="/courses" component={Courses}/>
        <Route exact path="/roles" component={RolesPage}/>
      </div>
    </Router>
  );
}

export default App
