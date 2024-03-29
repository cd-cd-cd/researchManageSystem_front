import React, { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { Navigate } from 'react-router'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './hooks/store'
import { IPart, ITabBarCommon } from './libs/model'
import Login from './pages/Login'
import DeviceManager from './pages/StudentMain/DeviceManager'
import GroupManage from './pages/StudentMain/GroupManage'
import LeaveRequest from './pages/StudentMain/LeaveRequest'
import PersonInfo from './pages/StudentMain/PersonInfo'
import Reimbursement from './pages/StudentMain/Reimbursement'
import WeekReport from './pages/StudentMain/WeekReport'
import Home from './pages/Home'
import TeamManager from './pages/TeacherMain/TeamManager'
import TDeviceManager from './pages/TeacherMain/TDeviceManager'
import TWeekReport from './pages/TeacherMain/TWeekReport'
import TReimbursement from './pages/TeacherMain/TReimbursement'
import TLeaveRequest from './pages/TeacherMain/TLeaveRequest'
import MInfo from './pages/ManagerMain/MInfo'
import UserControl from './pages/ManagerMain/UserControl'
import TeammateInfo from './pages/TeacherMain/TeammateInfo'
import MReimbursement from './pages/ManagerMain/MReimbursement'
import TDataManage from './pages/TeacherMain/TDataManage'
import MDataManage from './pages/ManagerMain/MDataManage'
import Production from './pages/StudentMain/Production'
import Project from './pages/StudentMain/Project'
import TProduction from './pages/TeacherMain/TProduction'
import TProject from './pages/TeacherMain/TProject'

function App () {
  const [tabBarList, setTabBarList] = useState<ITabBarCommon[]>([])
  const [tabBarId, setTabBarId] = useState(-1)
  const [report, setReport] = useState<IPart[]>([
    {
      type: 'progress',
      id: uuidv4(),
      title: '',
      point: [
        {
          id: uuidv4(),
          title: '进展简介',
          text: [
            {
              id: uuidv4(),
              content: ''
            }
          ]
        },
        {
          id: uuidv4(),
          title: '量化结果',
          text: [
            {
              id: uuidv4(),
              content: ''
            }
          ]
        }
      ]
    },
    {
      type: 'plan',
      id: uuidv4(),
      title: '',
      point: [
        {
          id: uuidv4(),
          title: '任务设想',
          text: [
            {
              id: uuidv4(),
              content: ''
            }
          ]
        },
        {
          id: uuidv4(),
          title: '预期量化结果',
          text: [
            {
              id: uuidv4(),
              content: ''
            }
          ]
        }
      ]
    }
  ])
  return (
    <StoreProvider value={{
      tabBarList,
      setTabBarList,
      tabBarId,
      setTabBarId,
      report,
      setReport
    }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='student' element={<Home />}>
            <Route path='personInfo' element={<PersonInfo />}></Route>
            <Route path='deviceManager' element={<DeviceManager />}></Route>
            <Route path='groupManage' element={<GroupManage />}></Route>
            <Route path='weekReport' element={<WeekReport />}></Route>
            <Route path='reimbursement' element={<Reimbursement />}></Route>
            <Route path='leaveRequest' element={<LeaveRequest />}></Route>
            <Route path='production' element={<Production/>}></Route>
            <Route path='project' element={<Project/>}></Route>
          </Route>
          <Route path='teacher' element={<Home />}>
            <Route path='teammateInfo/:id' element={<TeammateInfo/>}></Route>
            <Route path='personInfo' element={<PersonInfo />}></Route>
            <Route path='teamManager' element={<TeamManager />}></Route>
            <Route path='TDeviceManager' element={<TDeviceManager />}></Route>
            <Route path='groupManage' element={<GroupManage />}></Route>
            <Route path='TWeekReport' element={<TWeekReport />}></Route>
            <Route path='TReimbursement' element={<TReimbursement />}></Route>
            <Route path='TLeaveRequest' element={<TLeaveRequest />}></Route>
            <Route path='TProduction' element={<TProduction/>}></Route>
            <Route path='TProject' element={<TProject/>}></Route>
            <Route path='TDataManage' element={<TDataManage/>}></Route>
          </Route>
          <Route path='manager' element={<Home />}>
            <Route path='MInfo' element={<MInfo />}></Route>
            <Route path='userControl' element={<UserControl />}></Route>
            <Route path='MReimbursement' element={<MReimbursement/>}></Route>
            <Route path='MDataManage' element={<MDataManage/>}></Route>
          </Route>
          <Route path='*' element={<Navigate to='/login' />}></Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
