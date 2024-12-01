import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import EditEmployee from './components/EditEmployee';
import AddEmployee from './components/AddEmployee';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/employees" 
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/employee/:id" 
          element={
            <PrivateRoute>
              <EmployeeDetails />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit-employee/:id" 
          element={
            <PrivateRoute>
              <EditEmployee />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-employee" 
          element={
            <PrivateRoute>
              <AddEmployee />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/employees" />} />
      </Routes>
    </Router>
  );
}

export default App;

