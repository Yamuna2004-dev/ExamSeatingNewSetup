import { Fragment } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';

import Signin from '../Pages/Signin';
import Signup from '../Pages/Signup';
// import StudentSchedule from '../Pages/StudentSchedule';
// import StudentView from '../Pages/StudentView';
import Pages from './routes/Pages';
import Header from './sections/Header';
import HotKeys from './sections/HotKeys';
import Sidebar from './sections/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

function AppRouter() {
  const location = useLocation(); // Get the current location (URL)

  // Check if the current URL is "Signin" or "Signup"
  const isAuthPage =
    location.pathname.toLowerCase() === '/signin' || location.pathname.toLowerCase() === '/signup';

  return (
    <Fragment>
      {/* Conditionally render routing logic */}
      {isAuthPage ? (
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/studentschedule" element={< StudentSchedule/>} />
          <Route path="/studentview" element={<StudentView/>} /> */}
        </Routes>
      ) : (
        <>
          <CssBaseline />
          <HotKeys />
          <Header />
          <Sidebar />
          <Pages />
        </>
      )}
    </Fragment>
  );
}

const AppWithErrorHandler = withErrorHandler(App, AppErrorBoundaryFallback);
export default AppWithErrorHandler;
