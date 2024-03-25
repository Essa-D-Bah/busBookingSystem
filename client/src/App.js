import './App.css';
import SignInPage from './pages/SignInPage';
import { Box, Typography } from '@mui/material';
import RequireAuth from './Auth/RequireAuth';
import {Routes, Route} from "react-router-dom"
import Tickets from './pages/Tickets';
import CompanyPage from './pages/CompanyPage';
import BusesPages from './pages/BusesPages';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignInPage/>}/>
      <Route path='/' element={<RequireAuth>
         <Home/>
        </RequireAuth>}/>
        <Route path='/companies' element={<RequireAuth>
         <CompanyPage/>
        </RequireAuth>}/>
        <Route path='/tickets' element={<RequireAuth>
         <Tickets/>
        </RequireAuth>}/>
        <Route path='/buses' element={<RequireAuth>
         <BusesPages/>
        </RequireAuth>}/>
    </Routes>
  );
}

export default App;
