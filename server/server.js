const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const cors = require('cors');
const { Admin } = require('./models/user')
const uri = process.env.DATABASE;
const PORT = 8000
const authRoutes = require('./routes/authRoutes');
const bcrypt = require('bcrypt');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("MongoDB Connected successfully")).catch((err) => console.error("Error connecting mongodb", err))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    Credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOption));

app.use('/auth', authRoutes);

//register admin
app.get('/registerAdmin', async (req, res) => {
    try {
        const username = "admin";
        const password = "admin@123"
        const role = "admin";

        if (!username || !password || !role) {
            return res.status(400).json({ message: 'Username, password, and role are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Admin({
            username,
            password: hashedPassword,
            role,
        });

        await user.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})