import Navbar from './components/Navbar'
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import AlertState from './context/alert/AlertState';


const App = () => {
  return (
    <>
        <AlertState>
      <NoteState>
          <Router>
            <Navbar />
            <Alert />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path='/signup' element={<SignUp />}></Route>
            </Routes>
          </Router>
      </NoteState>
        </AlertState>
    </>
  )
}

export default App
