import React, { useState } from 'react'
import { Navigate } from 'react-router'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { StoreProvider } from './hooks/store'
import { ItabBarStudent } from './libs/model'
import Login from './pages/Login'
import ManagerHome from './pages/ManagerHome'
import StudentHome from './pages/StudentHome'
import DeviceManager from './pages/StudentMain/DeviceManager'
import GroupManage from './pages/StudentMain/GroupManage'
import LeaveRequest from './pages/StudentMain/LeaveRequest'
import PersonInfo from './pages/StudentMain/PersonInfo'
import Reimbursement from './pages/StudentMain/Reimbursement'
import WeekReport from './pages/StudentMain/WeekReport'
import TeacherHome from './pages/TeacherHome'

function App () {
  const [tabBarList, setTabBarList] = useState<ItabBarStudent[]>([])
  return (
    <StoreProvider value={{
      tabBarList,
      setTabBarList
    }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='student' element={<StudentHome/>}>
            <Route path='personInfo' element={<PersonInfo/>}></Route>
            <Route path='deviceManager' element={<DeviceManager/>}></Route>
            <Route path='groupManage' element={<GroupManage/>}></Route>
            <Route path='weekReport' element={<WeekReport/>}></Route>
            <Route path='reimbursement' element={<Reimbursement/>}></Route>
            <Route path='leaveRequest' element={<LeaveRequest/>}></Route>
          </Route>
          <Route path='teacher' element={<TeacherHome/>}></Route>
          <Route path='manager' element={<ManagerHome/>}></Route>
          <Route path='/student/' element={<Navigate to='/student/personInfo' />}></Route>
          <Route path='/student/*' element={<Navigate to='/student/personInfo' />}></Route>
          <Route path='*' element={<Navigate to='/student' />}></Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
