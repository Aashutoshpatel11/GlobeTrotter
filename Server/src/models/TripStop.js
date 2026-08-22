import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const TripStop = sequelize.define('TripStop', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    trip_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    city_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    stop_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    arrival_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    departure_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    allocated_budget: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.00,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'trip_stops',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { unique: true, fields: ['trip_id', 'stop_order'] },
    ],
});

export default TripStop;
