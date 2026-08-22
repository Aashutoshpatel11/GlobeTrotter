import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const TripExpense = sequelize.define('TripExpense', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    trip_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    trip_stop_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    itinerary_day_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    activity_item_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    category: {
        type: DataTypes.ENUM('TRANSPORT', 'STAY', 'ACTIVITIES', 'MEALS', 'MISC'),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING(3),
        defaultValue: 'USD',
    },
    expense_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    receipt_url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'trip_expenses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

export default TripExpense;
