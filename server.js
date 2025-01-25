// Importing dependencies using ES module syntax
import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import getRoutes from './routes/getRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggeroptions } from './swagger-dev-api.js';
import { InitialSetupWizard } from "./models/setupWizard.js";


// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize app
const app = express();

// Database connection
connectDB(process.env.MONGO_URI);

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*', // Use CLIENT_URL from env for better control
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/save", postRoutes);
app.use("/api/get", getRoutes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggeroptions));


app.use("/init", (req, res) => {
    InitialSetupWizard().then(() => {
      res.send("working");
    });
  });

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
