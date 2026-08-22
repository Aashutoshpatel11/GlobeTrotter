import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ItineraryActivityItem = sequelize.define('ItineraryActivityItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    itinerary_day_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    activity_catalog_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    custom_title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    custom_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING(50),
        defaultValue: 'SIGHTSEEING',
    },
    start_time: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    end_time: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    currency: {
        type: DataTypes.STRING(3),
        defaultValue: 'USD',
    },
    expense_category: {
        type: DataTypes.ENUM('TRANSPORT', 'STAY', 'ACTIVITIES', 'MEALS', 'MISC'),
        defaultValue: 'ACTIVITIES',
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    item_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'itinerary_activity_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default ItineraryActivityItem;
