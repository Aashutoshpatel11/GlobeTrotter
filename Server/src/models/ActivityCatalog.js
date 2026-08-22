import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ActivityCatalog = sequelize.define('ActivityCatalog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    city_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    category: {
        type: DataTypes.ENUM('SIGHTSEEING', 'FOOD_AND_DRINK', 'ADVENTURE', 'CULTURE', 'RELAXATION', 'SHOPPING', 'NIGHTLIFE'),
        allowNull: false,
    },
    estimated_duration_mins: {
        type: DataTypes.INTEGER,
        defaultValue: 60,
    },
    estimated_cost: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    currency: {
        type: DataTypes.STRING(3),
        defaultValue: 'USD',
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true,
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 5.00,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'activities_catalog',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

export default ActivityCatalog;
