import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB, sequelize } from './config/database.js';
import './models/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        console.log('🔄 Initializing GlobeTrotter Backend Services...');
        await connectDB();

        // Synchronize models with database schema
        if (process.env.DB_SYNC === 'true') {
            await sequelize.sync({ alter: true });
            console.log('✅ All database models synchronized successfully.');
        }

        app.listen(PORT, () => {
            console.log(`🚀 GlobeTrotter API server running at http://localhost:${PORT}`);
            console.log(`📡 Health Check: http://localhost:${PORT}/api/v1/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start application:', error);
        process.exit(1);
    }
};

startServer();