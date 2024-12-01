import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById } from '../services/api';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data } = await getEmployeeById(id);
      setEmployee(data);
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">Employee Details</Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/edit-employee/${id}`)}
          >
            Edit
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5">{employee.first_name} {employee.last_name}</Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Typography variant="body1"><strong>Position:</strong> {employee.position}</Typography>
          <Typography variant="body1"><strong>Department:</strong> {employee.department}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
          <Typography variant="body1"><strong>Salary:</strong> ${employee.salary}</Typography>
          <Typography variant="body1"><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/employees')}
          >
            Back to Employee List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmployeeDetails;

