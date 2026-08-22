import { sequelize } from '../config/database.js';
import User from './User.js';
import Trip from './Trip.js';
import DestinationCity from './DestinationCity.js';
import TripStop from './TripStop.js';
import ItineraryDay from './ItineraryDay.js';
import ActivityCatalog from './ActivityCatalog.js';
import ItineraryActivityItem from './ItineraryActivityItem.js';
import TripExpense from './TripExpense.js';
import SavedDestination from './SavedDestination.js';
import TripShare from './TripShare.js';
import TripLikeBookmark from './TripLikeBookmark.js';

// ==========================================
// Model Associations & Relationships
// ==========================================

// 1. User <-> Trips (1:N)
User.hasMany(Trip, { foreignKey: 'user_id', as: 'trips', onDelete: 'CASCADE' });
Trip.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 2. User <-> SavedDestination <-> DestinationCity (N:M)
User.hasMany(SavedDestination, { foreignKey: 'user_id', as: 'savedDestinations', onDelete: 'CASCADE' });
SavedDestination.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

DestinationCity.hasMany(SavedDestination, { foreignKey: 'city_id', as: 'savedByUsers', onDelete: 'CASCADE' });
SavedDestination.belongsTo(DestinationCity, { foreignKey: 'city_id', as: 'city' });

// 3. User <-> TripLikeBookmark <-> Trip
User.hasMany(TripLikeBookmark, { foreignKey: 'user_id', as: 'likesBookmarks', onDelete: 'CASCADE' });
TripLikeBookmark.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Trip.hasMany(TripLikeBookmark, { foreignKey: 'trip_id', as: 'likesBookmarks', onDelete: 'CASCADE' });
TripLikeBookmark.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

// 4. Trip <-> Trip (Cloning Self-reference)
Trip.belongsTo(Trip, { foreignKey: 'copied_from_trip_id', as: 'originalTrip', onDelete: 'SET NULL' });
Trip.hasMany(Trip, { foreignKey: 'copied_from_trip_id', as: 'clonedTrips' });

// 5. Trip <-> TripStops (1:N)
Trip.hasMany(TripStop, { foreignKey: 'trip_id', as: 'stops', onDelete: 'CASCADE' });
TripStop.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

// 6. DestinationCity <-> TripStops (1:N)
DestinationCity.hasMany(TripStop, { foreignKey: 'city_id', as: 'tripStops', onDelete: 'RESTRICT' });
TripStop.belongsTo(DestinationCity, { foreignKey: 'city_id', as: 'city' });

// 7. DestinationCity <-> ActivityCatalog (1:N)
DestinationCity.hasMany(ActivityCatalog, { foreignKey: 'city_id', as: 'activities', onDelete: 'CASCADE' });
ActivityCatalog.belongsTo(DestinationCity, { foreignKey: 'city_id', as: 'city' });

// 8. TripStop <-> ItineraryDays (1:N)
TripStop.hasMany(ItineraryDay, { foreignKey: 'trip_stop_id', as: 'itineraryDays', onDelete: 'CASCADE' });
ItineraryDay.belongsTo(TripStop, { foreignKey: 'trip_stop_id', as: 'tripStop' });

// 9. ItineraryDay <-> ItineraryActivityItems (1:N)
ItineraryDay.hasMany(ItineraryActivityItem, { foreignKey: 'itinerary_day_id', as: 'activityItems', onDelete: 'CASCADE' });
ItineraryActivityItem.belongsTo(ItineraryDay, { foreignKey: 'itinerary_day_id', as: 'day' });

// 10. ActivityCatalog <-> ItineraryActivityItems (1:N nullable)
ActivityCatalog.hasMany(ItineraryActivityItem, { foreignKey: 'activity_catalog_id', as: 'scheduledItems', onDelete: 'SET NULL' });
ItineraryActivityItem.belongsTo(ActivityCatalog, { foreignKey: 'activity_catalog_id', as: 'activityCatalog' });

// 11. Trip <-> TripExpenses (1:N)
Trip.hasMany(TripExpense, { foreignKey: 'trip_id', as: 'expenses', onDelete: 'CASCADE' });
TripExpense.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

User.hasMany(TripExpense, { foreignKey: 'user_id', as: 'expenses', onDelete: 'CASCADE' });
TripExpense.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

TripStop.hasMany(TripExpense, { foreignKey: 'trip_stop_id', as: 'expenses', onDelete: 'SET NULL' });
TripExpense.belongsTo(TripStop, { foreignKey: 'trip_stop_id', as: 'tripStop' });

ItineraryDay.hasMany(TripExpense, { foreignKey: 'itinerary_day_id', as: 'expenses', onDelete: 'SET NULL' });
TripExpense.belongsTo(ItineraryDay, { foreignKey: 'itinerary_day_id', as: 'day' });

ItineraryActivityItem.hasMany(TripExpense, { foreignKey: 'activity_item_id', as: 'expenses', onDelete: 'SET NULL' });
TripExpense.belongsTo(ItineraryActivityItem, { foreignKey: 'activity_item_id', as: 'activityItem' });

// 12. Trip <-> TripShares (1:N)
Trip.hasMany(TripShare, { foreignKey: 'trip_id', as: 'shares', onDelete: 'CASCADE' });
TripShare.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

export {
    sequelize,
    User,
    Trip,
    DestinationCity,
    TripStop,
    ItineraryDay,
    ActivityCatalog,
    ItineraryActivityItem,
    TripExpense,
    SavedDestination,
    TripShare,
    TripLikeBookmark,
};
