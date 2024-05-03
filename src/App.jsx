import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'primereact/resources/themes/saga-blue/theme.css'; // theme css
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/home'
import CheckmarkDemo from './Pages/Contact/contact'
import About from './Pages/About/about'
import Contact from './Pages/Contact/contact'
import Navbar from './Pages/Navbar/navbar';
import DynamicDemo from './Pages/Provide/provide';
import Tlogin from './Pages/TeacherLogin/teacherLogin';
import AdminDashboard from './Pages/Adminpage/adminpage';
import TeacherDetailsPage from './Pages/TeacherDetails/teacherdetails';
import RegisterForm from './Pages/AddformTeacher/AddformTeacher';
import AddStudentForm from './Pages/AddStudentform/addformStudent';
import Studentform from './Pages/studentForm/studentform';
import Rstudentform from './Pages/AddStudentform/addformStudent';
// import BasicDemo from './Pages/Achievement/achievement'

function App() {
  return <>  <BrowserRouter>
    <Navbar />
    <Routes>

      <Route path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/teacherlogin' element={< Tlogin />}></Route>
      <Route path='/adminpage' element={<AdminDashboard/>}></Route>
      <Route path="/teachers/:teacherId" element={<TeacherDetailsPage />} />
      <Route path="/add-teacher" element={<RegisterForm/>} />
      <Route path="/add-student" element={<Rstudentform/>} />

    </Routes></BrowserRouter>
    <DynamicDemo />

  </>
}

export default App
