import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ItineraryDay = sequelize.define('ItineraryDay', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    trip_stop_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    day_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    daily_budget_min: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    daily_budget_max: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
}, {
    tableName: 'itinerary_days',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        { unique: true, fields: ['trip_stop_id', 'day_number'] },
    ],
});

export default ItineraryDay;
