// Importing dependencies using ES module syntax
import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js'
import getRoutes from './routes/getRoutes.js'
import swaggerUi from 'swagger-ui-express'
import { swaggeroptions } from './swagger-dev-api.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/save", postRoutes);
app.use("/api/get", getRoutes);


app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggeroptions));
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
