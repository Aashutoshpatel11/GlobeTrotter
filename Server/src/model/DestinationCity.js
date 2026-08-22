import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

const DestinationCity = sequelize.define('DestinationCity', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
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
    cover_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'destinations_cities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false // Schema only specifies created_at
});

module.exports = DestinationCity;