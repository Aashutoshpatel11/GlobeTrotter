import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CommunityHub from './pages/CommunityHub';
import TripDetails from './pages/TripDetails';
import CalendarView from './pages/CalendarView';
import CreateTrip from './pages/CreateTrip';
import BudgetBreakdown from './pages/BudgetBreakdown';
import ExploreActivities from './pages/ExploreActivities';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/trips" element={<TripDetails />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/budget" element={<BudgetBreakdown />} />
        <Route path="/explore" element={<ExploreActivities />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
