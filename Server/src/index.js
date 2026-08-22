import express from 'express';
import { connectDB, sequelize } from './config/database.js';
import cookieParser from 'cookie-parser';
import { Router } from 'express';
import authRoutes from './routes/auth.route.js';

import './models/User.js';
import './models/Trip.js';
import './models/DestinationCity.js';
import './models/TripStop.js';
import './models/ItineraryDay.js';
import './models/ActivityCatalog.js';
import './models/ItineraryActivityItem.js';
import './models/TripExpense.js';
import './models/SavedDestination.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true });
        console.log('All database models synchronized successfully.');

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize application:', error);
        process.exit(1);
    }
};

startServer();