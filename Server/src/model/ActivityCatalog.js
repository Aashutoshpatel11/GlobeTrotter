import { DataTypes }from 'sequelize';
import { sequelize }from '../config/database';
import DestinationCity from './DestinationCity';

const ActivityCatalog = sequelize.define('ActivityCatalog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
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
    }
}, {
    tableName: 'activities_catalog',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Relationship
DestinationCity.hasMany(ActivityCatalog, { foreignKey: 'city_id', onDelete: 'CASCADE' });
ActivityCatalog.belongsTo(DestinationCity, { foreignKey: 'city_id' });

module.exports = ActivityCatalog;