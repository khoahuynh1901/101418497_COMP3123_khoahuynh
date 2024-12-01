const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');

// Create Employee
router.post('/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search Employees
router.get('/employees/search', async (req, res) => {
    const { department, position } = req.query;
    try {
        const query = {};
        if (department) query.department = department;
        if (position) query.position = position;

        const employees = await Employee.find(query);
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Departments and Positions for Search Filter
router.get('/employees/metadata', async (req, res) => {
    try {
        console.log("Fetching distinct departments and positions...");
        const departments = await Employee.distinct('department');
        const positions = await Employee.distinct('position');
        console.log("Departments:", departments);
        console.log("Positions:", positions);
        res.status(200).json({ departments, positions });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Get Employee by ID
router.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Employee
router.put('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Employee
router.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json({ message: 'Employee deleted', employee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
