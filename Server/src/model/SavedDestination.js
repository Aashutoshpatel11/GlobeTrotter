import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database'
import User from './User'
import DestinationCity from './DestinationCity'

const SavedDestination = sequelize.define('SavedDestination', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    notes: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'saved_destinations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        { unique: true, fields: ['user_id', 'city_id'] } // Unique constraint[cite: 1]
    ]
});

// Relationships[cite: 1]
User.hasMany(SavedDestination, { foreignKey: 'user_id', onDelete: 'CASCADE' });
SavedDestination.belongsTo(User, { foreignKey: 'user_id' });

DestinationCity.hasMany(SavedDestination, { foreignKey: 'city_id', onDelete: 'CASCADE' });
SavedDestination.belongsTo(DestinationCity, { foreignKey: 'city_id' });

module.exports = SavedDestination;