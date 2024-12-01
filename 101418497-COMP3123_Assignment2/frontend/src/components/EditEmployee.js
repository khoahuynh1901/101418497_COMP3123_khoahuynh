import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, Container } from '@mui/material';
import { getEmployeeById, updateEmployee } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { validateField, validateForm } from '../utils/validation';

const EditEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        setFormData(response.data);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        alert('Error fetching employee details');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await updateEmployee(id, formData);
      alert('Employee updated successfully');
      navigate('/employees');
    } catch (err) {
      console.error('Error updating employee:', err);
      alert('Error updating employee');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Edit Employee
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField 
            fullWidth 
            label="First Name" 
            name="first_name" 
            value={formData.first_name} 
            onChange={handleChange} 
            margin="normal"
            required
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
          <TextField 
            fullWidth 
            label="Last Name" 
            name="last_name" 
            value={formData.last_name} 
            onChange={handleChange} 
            margin="normal"
            required
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
          <TextField 
            fullWidth 
            label="Email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            margin="normal"
            required
            type="email"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField 
            fullWidth 
            label="Position" 
            name="position" 
            value={formData.position} 
            onChange={handleChange} 
            margin="normal"
            required
            error={!!errors.position}
            helperText={errors.position}
          />
          <TextField 
            fullWidth 
            label="Department" 
            name="department" 
            value={formData.department} 
            onChange={handleChange} 
            margin="normal"
            required
            error={!!errors.department}
            helperText={errors.department}
          />
          <TextField 
            fullWidth 
            label="Salary" 
            name="salary" 
            value={formData.salary} 
            onChange={handleChange} 
            margin="normal"
            required
            type="number"
            error={!!errors.salary}
            helperText={errors.salary}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/employees')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Update Employee
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditEmployee;
