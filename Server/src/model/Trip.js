import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Auto-generates UUID
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Indexed[cite: 1]
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('TRAVELER', 'ADMIN'),
        defaultValue: 'TRAVELER',
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;