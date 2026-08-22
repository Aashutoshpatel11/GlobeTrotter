import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const TripLikeBookmark = sequelize.define('TripLikeBookmark', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    trip_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    is_liked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_bookmarked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'trip_likes_bookmarks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        { unique: true, fields: ['user_id', 'trip_id'] },
    ],
});

export default TripLikeBookmark;
