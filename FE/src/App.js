import React, { useState } from 'react';

// MUI imports
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// React Router imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page imports
import Login from './auth/login';
import ForgotPassword from './auth/forgotpassword';
import AdminDashboard from './Admin/AdminDashboard';
import EmployeeDashboard from './user/UserDashboard';
import ResetPassword from './auth/resetpassword';

// Define a basic theme (you can customize this later)
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#f97316',
    },
    secondary: {
      main: '#22c55e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const punchInTheme = createTheme({
  palette: {
    primary: {
      main: '#b71c1c', // Red for punch-in
    },
    secondary: {
      main: '#b71c1c',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function App() {
  const [isPunchIn, setIsPunchIn] = useState(false);

  // Example punch-in handler (replace with your actual logic)
  const handlePunchIn = () => setIsPunchIn(true);
  const handlePunchOut = () => setIsPunchIn(false);

  return (
    <ThemeProvider theme={isPunchIn ? punchInTheme : customTheme}>
      <CssBaseline />
      <div className={isPunchIn ? 'App punch-in' : 'App'}>
        {/* Example punch-in/out buttons for demonstration */}
       
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login onLoginSuccess={handlePunchIn} />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/Admindashboard" element={<AdminDashboard />} />
            <Route path="/Attendancecard" element={<EmployeeDashboard />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
