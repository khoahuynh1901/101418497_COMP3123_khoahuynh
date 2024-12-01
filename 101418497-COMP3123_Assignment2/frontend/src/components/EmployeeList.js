import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getEmployees, deleteEmployee, searchEmployees, getDepartmentsAndPositions } from '../services/api'; 
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    fetchDepartmentsAndPositions();
  }, []);

  const fetchEmployees = async (searchParams = {}) => {
    try {
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchEmployees(searchParams);
      } else {
        response = await getEmployees();
      }
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDepartmentsAndPositions = async () => {
    try {
      const response = await getDepartmentsAndPositions();
      setDepartments(response.departments);
      setPositions(response.positions);
    } catch (error) {
      console.error('Error fetching departments and positions:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleView = (id) => {
    navigate(`/employee/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleSearch = () => {
    const searchParams = {};
    if (department) searchParams.department = department;
    if (position) searchParams.position = position;
    fetchEmployees(searchParams);
  };

  return (
    <Box sx={{ mt: 4, mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Employee List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate('/add-employee')}
        >
          Add Employee
        </Button>
      </Box>
      <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            label="Department"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {departments.map((dept, index) => (
              <MenuItem key={index} value={dept}>{dept}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Position</InputLabel>
          <Select
            value={position}
            label="Position"
            onChange={(e) => setPosition(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {positions.map((pos, index) => (
              <MenuItem key={index} value={pos}>{pos}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{ whiteSpace: 'nowrap', height: 'fit-content' }}
        >
          Search
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Date of Joining</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>${employee.salary.toLocaleString()}</TableCell>
                <TableCell>{new Date(employee.date_of_joining).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleView(employee._id)}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(employee._id)}
                    color="secondary"
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(employee._id)}
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeList;
