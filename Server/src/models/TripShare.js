import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const TripShare = sequelize.define('TripShare', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    trip_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    share_token: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
    },
    permission: {
        type: DataTypes.ENUM('VIEW', 'EDIT'),
        defaultValue: 'VIEW',
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'trip_shares',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

export default TripShare;
