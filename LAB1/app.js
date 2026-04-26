const express = require('express');
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Alaa", age: 21 },
    { id: 2, name: "Salma", age: 23 }
];

app.get('/students', (req, res) => {
    const response = {
        students: students,
        links: [
            { rel: "create_student", method: "POST", href: "http://localhost:3000/students" }
        ]
    };
    res.status(200).json(response);
});

// Create a new student
app.post('/students', (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ message: "Name and Age are required" });
    }

    const newStudent = {
        id: students.length + 1,
        name: name,
        age: age
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// Update a student by ID
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ message: "Name and Age are required" });
    }

    student.name = name;
    student.age = age;

    res.status(200).json(student);
});

// Partial update a student by ID
app.patch('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, age } = req.body;

    if (!name && !age) {
        return res.status(400).json({ message: "At least one field (name or age) is required" });
    }

    if (name) student.name = name;
    if (age) student.age = age;

    res.status(200).json(student);
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(studentIndex, 1);

    res.status(200).json({ message: "Student deleted successfully" });
});

// Retrieve a single student by ID with HATEOAS 
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const response = {
        student: student,
        links: [
            { rel: "self", method: "GET", href: `http://localhost:3000/students/${student.id}` },
            { rel: "update", method: "PUT", href: `http://localhost:3000/students/${student.id}` },
            { rel: "partial_update", method: "PATCH", href: `http://localhost:3000/students/${student.id}` },
            { rel: "delete", method: "DELETE", href: `http://localhost:3000/students/${student.id}` },
            { rel: "all_students", method: "GET", href: "http://localhost:3000/students" }
        ]
    };

    res.status(200).json(response);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});