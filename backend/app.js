const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const expectationRoutes = require("./src/routes/expectationRoutes");
const matchRoutes = require("./src/routes/matchRoutes");

const app = express();
app.use(cors());
app.use(express.json({limit:'5mb'}));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=> res.send('Rightfit Api is running'));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/expectation", expectationRoutes);
app.use("/api/match", matchRoutes);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;