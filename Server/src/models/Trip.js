import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Trip = sequelize.define('Trip', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
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
    cover_image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    total_budget: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.00,
    },
    currency: {
        type: DataTypes.STRING(3),
        defaultValue: 'USD',
    },
    status: {
        type: DataTypes.ENUM('PLANNING', 'ONGOING', 'COMPLETED', 'CANCELLED'),
        defaultValue: 'PLANNING',
    },
    visibility: {
        type: DataTypes.ENUM('PRIVATE', 'PUBLIC', 'SHARED_LINK'),
        defaultValue: 'PRIVATE',
    },
    copied_from_trip_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    clone_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'trips',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Trip;
