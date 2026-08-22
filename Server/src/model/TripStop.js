import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import Trip from './Trip';
import DestinationCity from './DestinationCity';

const TripStop = sequelize.define('TripStop', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    }
}, {
    tableName: 'trip_stops',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { unique: true, fields: ['trip_id', 'stop_order'] } // Composite constraint[cite: 1]
    ]
});

// Relationships[cite: 1]
Trip.hasMany(TripStop, { foreignKey: 'trip_id', onDelete: 'CASCADE' });
TripStop.belongsTo(Trip, { foreignKey: 'trip_id' });

DestinationCity.hasMany(TripStop, { foreignKey: 'city_id', onDelete: 'RESTRICT' });
TripStop.belongsTo(DestinationCity, { foreignKey: 'city_id' });

module.exports = TripStop;