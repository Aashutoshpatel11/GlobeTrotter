import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const DestinationCity = sequelize.define('DestinationCity', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    state_region: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    country_code: {
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false,
    },
    cost_index: {
        type: DataTypes.ENUM('BUDGET', 'MODERATE', 'LUXURY'),
        defaultValue: 'MODERATE',
    },
    popularity_score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    cover_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'destinations_cities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

export default DestinationCity;
