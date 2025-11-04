import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FileDetails from "./components/FileDetails";
import SecondOpinionConsultantsPage from './pages/TellyConsultants';
import CaseDetails from './pages/CaseDetails';


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path="/file-details" element={<FileDetails />} />
          <Route path="/create-case" element={<SecondOpinionConsultantsPage />} />
          <Route path="/case-details/:id" element={<CaseDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}



export default App; 
