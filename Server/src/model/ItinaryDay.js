import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import TripStop from './TripStop';

const ItineraryDay = sequelize.define('ItineraryDay', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    day_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    daily_budget_min: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    daily_budget_max: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    }
}, {
    tableName: 'itinerary_days',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        { unique: true, fields: ['trip_stop_id', 'day_number'] }
    ]
});

TripStop.hasMany(ItineraryDay, { foreignKey: 'trip_stop_id', onDelete: 'CASCADE' });
ItineraryDay.belongsTo(TripStop, { foreignKey: 'trip_stop_id' });

module.exports = ItineraryDay;