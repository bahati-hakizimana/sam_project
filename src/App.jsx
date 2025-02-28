import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./components/form/Login";
import Signup from "./components/form/Signup";
import Layout from "./components/admin/Layout";
import Notification from "./components/admin/pages/Notification";
import BenchMarks from "./components/admin/pages/BenchMarks";
import Report from "./components/admin/pages/Report";
import Employees from "./components/admin/pages/Employees";
import SaveySchedure from "./components/admin/pages/SaveySchedure";
import Tenants from "./components/admin/pages/Tenants";
import Attendance from "./components/admin/pages/Attendance";
import Announcement from "./components/admin/pages/Announcement";
import Users from './components/admin/pages/Users';
import Tenant_Layout from './components/tenant/Tenant_Layout';
import Survey_Questions from './components/admin/pages/Survey_Questions';
import Survey_Answer from './components/admin/pages/Survey_Answer';
import Survey_Choice from './components/admin/pages/Survey_Choice';
import SurveyWork from './components/tenant/pages/SurveyWork';
import EditUser from './components/admin/pages/EditUser';
import Notifications from './components/tenant/pages/Notifications';
import Feed_Back from './components/tenant/pages/Feed_Back';
import Home from './components/admin/pages/Home';
import THome from './components/tenant/pages/THome';
import CreateChoice from './components/admin/pages/CreateChoice';
import ViewAnswersDetails from './components/admin/pages/ViewAnswersDetails';
import StartSurvey from './components/tenant/pages/StartSurvey';
import Application from './components/admin/pages/Application';
import ViewApplicantDetails from './components/admin/pages/ViewApplicantDetails';
import Apply from './components/tenant/pages/Apply';
import EditApplications from './components/admin/pages/EditApplications';
import ViewApplication from './components/tenant/pages/ViewApplication';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route path='/admin' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='users' element={<Users />} />
          <Route path='notifications' element={<Notification />} />
          <Route path='feedbacks' element={<BenchMarks />} />
          <Route path='report' element={<Report />} />
          <Route path='employees' element={<Employees />} />
          <Route path='saveyschedure' element={<SaveySchedure />} />
          <Route path='saveyschedure/questions' element={<Survey_Questions />} />
          <Route path='saveyschedure/answers' element={<Survey_Answer />} />
          <Route path='saveyschedure/choices' element={<Survey_Choice />} />
          <Route path='/admin/updateuser/:id' element={<EditUser />} />
          <Route path='applicant/:id' element={<ViewApplicantDetails />} />
          <Route path='/admin/addchoice' element={<CreateChoice />} />
          <Route path='/admin/answers/:id' element={<ViewAnswersDetails />} />
          <Route path='applications' element={<Application />} />
          <Route path='updateapplicant/:id' element={<EditApplications />} />
          {/* <Route path='saveyschedure/work' element={<SurveyWork />} /> */}
          <Route path='tenants' element={<Tenants />} />
          <Route path='attendance' element={<Attendance />} />
          <Route path='announcements' element={<Announcement />} />
        </Route>

        {/* Tenant Routes */}
        <Route path='/tenant' element={<Tenant_Layout />}>
          <Route index element={<THome />} />
          <Route path='applynow' element={<Apply />} />
          <Route path='tenant/survey/:surveyId' element={<SurveyWork />} />
          <Route path='/tenant/notifications' element={<Notifications />} />
          <Route path='/tenant/feedback' element={<Feed_Back />} />
          <Route path='viewapplications/status' element={<ViewApplication />} />
          <Route path="/tenant/start-survey/:surveyId" element={<StartSurvey />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
