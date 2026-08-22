import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('globetrotter_db', 'sample_user', 'sample_password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};