import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import AdminDashboard from './components/admin/admindashboard';
import Home from './components/home';
import AdminLogin from './components/admin/adminLogin';
import SubAdminRegister from './components/subadmin/subadminRegister';
import AdminHome from './components/admin/adminhome';
import SubAdminLogin from './components/subadmin/subAdminLogin';
import SubAdminDashboard from './components/subadmin/subadminDashboard';
import UserRegister from './components/user/userRegister';
import UserDashboard from './components/user/User';
import VoluntierDashboard from './components/user/User';
import VoluntierLogin from './components/user/userLogin';
import VoluntierNavbar from './components/user/navbarvoluntier';
import Createevent from './components/subadmin/addevent';
import UpdateEventList from './components/subadmin/updateevent';
import ImageUpload from './components/subadmin/addimage';
import VolunteerList from './components/subadmin/userdetails';
import SubAdminList from './components/admin/getsubadminlist';
import VolunteerLists from './components/admin/voluntierlist';
import Profile from './components/user/profile';
import ViewEvents from './components/user/viewevents';
import IssueForm from './components/user/issue';
import IssueList from './components/subadmin/issuelst';
import SchemeList from './components/user/SchemeList';
import AboutVillage from './components/user/aboutvillage';
import PdfViewer from './components/user/aboutvillage';
import AddDataForm from './components/subadmin/addpeople';
import AgricultureDetailsPage from './components/user/agriculture';




axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/adminhome" element={<AdminHome/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/subadminRegister" element={<SubAdminRegister/>}/>
        <Route path='/subadminLogin' element={<SubAdminLogin/>}/>
        <Route path='/subadminDashboard' element={<SubAdminDashboard/>}/>
        <Route path='/VoluntierRegister' element={<UserRegister/>}/>
        <Route path='/voluntierlogin' element={<VoluntierLogin/>}/>
        <Route path='/VoluntierDashboard' element={<VoluntierDashboard/>}/>
        <Route path='/VoluntierDashboard' element={<VoluntierNavbar/>}/>
        <Route path='/createevent' element={<Createevent/>}/>
        <Route path='/updateevent' element={<UpdateEventList/>}/>
        <Route path='/addimage' element={<ImageUpload/>}/>
        <Route path='/voluntierlist' element={<VolunteerList/>}/>
        <Route path='/subadminlist' element={<SubAdminList/>}/>
        <Route path='/userslist' element={<VolunteerLists/>}/>
        <Route path='/userprofile' element={<Profile/>}/>
        <Route path='/viewevents' element={<ViewEvents/>}/>
        <Route path='/issue' element={<IssueForm/>}/>
        <Route path='/issuelist' element={<IssueList/>}/>
        <Route path='/schemelist' element={<SchemeList/>}/>
        <Route path='/aboutvillage' element={< PdfViewer/>}/>
        <Route path='/addpeople' element={< AddDataForm/>}/>
        <Route path='/agriculture' element={< AgricultureDetailsPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
