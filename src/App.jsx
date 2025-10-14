import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FileDetails from "./components/FileDetails";
import TellyConsultantsPage from './pages/TellyConsultants';


function App() {
  return (
 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path="/file-details" element={<FileDetails />} />
          <Route path="/create-case" element={<TellyConsultantsPage />} />
        </Routes>
      </BrowserRouter>
     
  )
}



export default App; 
