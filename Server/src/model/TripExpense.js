import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import Trip from './Trip';
import TripStop from './TripStop';
import ItineraryDay from './ItineraryDay';
import ItineraryActivityItem from './ItineraryActivityItem';

const TripExpense = sequelize.define('TripExpense', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    expense_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    tableName: 'trip_expenses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Relationships[cite: 1]
Trip.hasMany(TripExpense, { foreignKey: 'trip_id', onDelete: 'CASCADE' });
TripExpense.belongsTo(Trip, { foreignKey: 'trip_id' });

// Optional granular relations (can be null)[cite: 1]
TripStop.hasMany(TripExpense, { foreignKey: 'trip_stop_id', onDelete: 'SET NULL' });
TripExpense.belongsTo(TripStop, { foreignKey: 'trip_stop_id' });

ItineraryDay.hasMany(TripExpense, { foreignKey: 'itinerary_day_id', onDelete: 'SET NULL' });
TripExpense.belongsTo(ItineraryDay, { foreignKey: 'itinerary_day_id' });

ItineraryActivityItem.hasMany(TripExpense, { foreignKey: 'activity_item_id', onDelete: 'SET NULL' });
TripExpense.belongsTo(ItineraryActivityItem, { foreignKey: 'activity_item_id' });

module.exports = TripExpense;