import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import ItineraryDay from './ItineraryDay';
import ActivityCatalog from './ActivityCatalog';

const ItineraryActivityItem = sequelize.define('ItineraryActivityItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    custom_title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    expense_category: {
        type: DataTypes.ENUM('TRANSPORT', 'STAY', 'ACTIVITIES', 'MEALS', 'MISC'),
        defaultValue: 'ACTIVITIES',
    },
    item_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'itinerary_activity_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Relationships
ItineraryDay.hasMany(ItineraryActivityItem, { foreignKey: 'itinerary_day_id', onDelete: 'CASCADE' });
ItineraryActivityItem.belongsTo(ItineraryDay, { foreignKey: 'itinerary_day_id' });

ActivityCatalog.hasMany(ItineraryActivityItem, { foreignKey: 'activity_catalog_id', onDelete: 'SET NULL' });
ItineraryActivityItem.belongsTo(ActivityCatalog, { foreignKey: 'activity_catalog_id' });

module.exports = ItineraryActivityItem;