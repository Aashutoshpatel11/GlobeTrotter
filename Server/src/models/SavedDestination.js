import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const SavedDestination = sequelize.define('SavedDestination', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    city_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    notes: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'saved_destinations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        { unique: true, fields: ['user_id', 'city_id'] },
    ],
});

export default SavedDestination;
