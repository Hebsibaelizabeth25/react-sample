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
import Tlogin from './Pages/TeacherLogin/teacherLogin';
import AdminDashboard from './Pages/Adminpage/adminpage';
import TeacherDetailsPage from './Pages/TeacherDetails/teacherdetails';
import RegisterForm from './Pages/AddformTeacher/AddformTeacher';
import Studentform from './Pages/studentForm/studentform';
import TeacherLgPage from './Pages/loginedteacherdetails/lgteacherdetails';
import LeaveRequestPage from './Pages/LeaveRequest/leaverequest';
import Adminlogin from './Pages/adminLogin/adminlogin';
import StudentLogin from './Pages/studentlogin/studentlogin';
import StudentPage from './Pages/studentdetails/studentdetails';
import EditTeacherPage from './Pages/EditpageadminTeacher/editpageadminT';
import StudentViewPage from './Pages/Adminstudentdetails/adminstudentdetails';
import StudentEditPage from './Pages/EditStudentPage/editstudentadmin';

function App() {
  return <>  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/teacherlogin' element={< Tlogin />}></Route>
      <Route path='/studentlogin' element={< StudentLogin />}></Route>

      <Route path='/adminpage' element={<Adminlogin/>}></Route>
      <Route path="/teachers/:teacherId" element={<TeacherDetailsPage />} />
      <Route path="/add-teacher" element={<RegisterForm/>} />
      <Route path="/add-student" element={<Studentform/>} />
      <Route path="/teacher/:email" element={<TeacherLgPage />} />
      <Route path="/student/:id" element={<StudentPage />} />
      <Route path="/teacheredit/:id" element={<EditTeacherPage />} />
      <Route path="/student-edit/:studentId" element={<StudentEditPage />} />

      <Route path="/detailsstudent/:studentId" element={<StudentViewPage />} />

      <Route path="/admin/:name" element={<AdminDashboard />} />
      
      <Route path="/leave-request" element={<LeaveRequestPage/>} />

    </Routes></BrowserRouter>

  </>
}

export default App
